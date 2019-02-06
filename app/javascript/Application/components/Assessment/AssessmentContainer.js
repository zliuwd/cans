import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { clone } from '../../util/common'
import { completeAutoScroll } from '../../util/assessmentAutoScroll'
import { AssessmentService, I18nService } from './'
import { LoadingState, isReadyForAction } from '../../util/loadingHelper'
import AssessmentContainerInner from './AssessmentContainerInner'
import { PrintAssessment } from '../Print'
import {
  AssessmentStatus,
  AssessmentType,
  validateAssessmentForSubmit,
  validateAssessmentEventDate,
  defaultEmptyAssessment,
  postSuccessMessage,
  trimUrlForClientProfile,
  successMsgFrom,
  postInfoMessage,
  postCloseMessage,
  alertMessage,
  getCaregiverDomainsNumber,
  handleCountyName,
  updateUrlWithAssessment,
} from './AssessmentHelper'
import { buildSaveAssessmentButton } from '../Header/PageHeaderButtonsBuilder'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import './style.sass'
import { getCurrentIsoDate, isValidLocalDate, localToIsoDate } from '../../util/dateHelper'
import { logPageAction } from '../../util/analytics'
import { isAuthorized } from '../common/AuthHelper'

const SCROLL_POSITION_ADJUST = -25 // for manually adjust scroll destination -25 means go up 25px more
const readOnlyMessageId = 'readonlyMessage'

export default class AssessmentContainer extends Component {
  constructor(props) {
    super(props)
    this.assessmentHeader = React.createRef()
    this.state = {
      assessment: defaultEmptyAssessment,
      assessmentServiceStatus: LoadingState.idle,
      i18n: {},
      isValidForSubmit: false,
      shouldRedirectToClientProfile: false,
      isEditable: !props.disabled,
      isValidDate: true,
      isEventDateBeforeDob: false,
      isSubmitWarningShown: false,
      isSaveButtonEnabled: false,
      completeScrollTarget: 0,
    }
  }

  async componentDidMount() {
    this.handleCompleteScrollTarget()
    const assessmentId = this.props.match.params.id
    return (assessmentId ? this.fetchAssessment(assessmentId) : this.fetchNewAssessment()).then(() => {
      this.updateIsEditableState()
    })
  }

  componentDidUpdate() {
    this.updateSaveButtonStatusIfNeeded()
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', alertMessage)
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
    postCloseMessage(readOnlyMessageId)
  }

  updateIsEditableState() {
    const assessment = this.state.assessment
    const isEditable = Boolean(!assessment || !assessment.id || isAuthorized(assessment, 'update'))
    this.setState({ isEditable })
    isEditable
      ? window.addEventListener('beforeunload', alertMessage)
      : window.removeEventListener('beforeunload', alertMessage)
    this.postReadOnlyMessageIfNeeded()
  }

  postReadOnlyMessageIfNeeded() {
    if (!this.state.isEditable) {
      this.postReadOnlyMessage()
    }
  }

  postReadOnlyMessage() {
    const message = { messageId: readOnlyMessageId }
    if (this.state.assessment.status === AssessmentStatus.completed) {
      postInfoMessage({ ...message, message: 'This assessment was completed and is available for view only.' })
    } else if (this.state.assessment.status === AssessmentStatus.inProgress) {
      postInfoMessage({
        ...message,
        message: 'This CANS is under the jurisdiction of another county. Available for view only.',
      })
    }
  }

  initHeaderButtons(isSaveButtonEnabled) {
    const { assessment, i18n, isEditable } = this.state
    const node = <PrintAssessment assessment={assessment} i18n={i18n} />
    const leftButton = isEditable ? buildSaveAssessmentButton(this.handleSaveAssessment, isSaveButtonEnabled) : null
    const rightButton = <PrintButton node={node} isEnabled={true} />
    this.props.pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  updateSaveButtonStatusIfNeeded() {
    const newSaveButtonStatus = this.shouldSaveButtonBeEnabled()
    if (this.state.isSaveButtonEnabled !== newSaveButtonStatus) {
      this.initHeaderButtons(newSaveButtonStatus)
      this.setState({ isSaveButtonEnabled: newSaveButtonStatus })
    }
  }

  shouldSaveButtonBeEnabled() {
    const { assessment, assessmentServiceStatus, isEditable, isValidDate, isEventDateBeforeDob } = this.state
    return (
      isValidDate &&
      !isEventDateBeforeDob &&
      isEditable &&
      assessment.state.under_six !== undefined &&
      Boolean(assessment.event_date) &&
      isReadyForAction(assessmentServiceStatus)
    )
  }

  handleSubmitWarning = switcher => {
    if (this.state.assessment.can_release_confidential_info === false) {
      this.setState({ isSubmitWarningShown: switcher })
    }
    return null
  }
  async fetchNewAssessment() {
    this.setState({ assessmentServiceStatus: LoadingState.waiting })
    try {
      const instrument = await AssessmentService.fetchNewAssessment()
      return this.onFetchNewAssessmentSuccess(instrument)
    } catch (e) {
      return this.setState({ assessmentServiceStatus: LoadingState.error })
    }
  }

  onFetchNewAssessmentSuccess(instrument) {
    const client = this.props.client
    const assessment = {
      instrument_id: instrument.id,
      person: client,
      service_source: client.service_source,
      service_source_id: client.service_source_id,
      service_source_ui_id: client.service_source_ui_id,
      county: client.county,
      assessment_type: AssessmentType.initial,
      status: AssessmentStatus.inProgress,
      state: instrument.prototype,
      event_date: getCurrentIsoDate(),
      has_caregiver: true,
      completed_as: 'COMMUNIMETRIC',
      can_release_confidential_info: false,
    }
    this.setState({
      assessment,
      isEventDateBeforeDob: !validateAssessmentEventDate(client.dob, assessment.event_date),
      assessmentServiceStatus: LoadingState.ready,
    })
    this.fetchI18n(assessment.instrument_id)
  }

  async fetchAssessment(id) {
    this.setState({ assessmentServiceStatus: LoadingState.waiting })
    try {
      const assessment = await AssessmentService.fetch(id)
      return this.onFetchAssessmentSuccess(assessment)
    } catch (e) {
      return this.setState({ assessmentServiceStatus: LoadingState.error })
    }
  }

  onFetchAssessmentSuccess(assessment) {
    this.updateAssessment(assessment)
    this.fetchI18n(assessment.instrument_id)
  }

  async fetchI18n(instrumentId) {
    try {
      const i18n = await I18nService.fetchByInstrumentId(instrumentId)
      this.onFetchI18nSuccess(i18n)
    } catch (e) {
      this.setState({ i18n: {} })
    }
  }

  async onFetchI18nSuccess(i18n) {
    await this.setState({
      i18n: i18n,
    })
    this.initHeaderButtons(this.state.isSaveButtonEnabled)
  }

  updateAssessment = assessment => {
    assessment.person = this.props.client
    const isValidForSubmit = validateAssessmentForSubmit(assessment)
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
      isValidForSubmit,
    })
  }

  handleCaregiverRemoveAll = (name, value) => {
    const tempAssessment = clone(this.state.assessment)
    tempAssessment[name] = value
    this.updateAssessment(tempAssessment)
  }

  handleCaregiverRemove = caregiverIndex => {
    const tempAssessment = clone(this.state.assessment)
    const captureCaregiverDomains = getCaregiverDomainsNumber(this.state.assessment)
    if (!caregiverIndex || captureCaregiverDomains <= 1) {
      this.handleCaregiverRemoveAll('has_caregiver', false)
    } else {
      const domains = tempAssessment.state.domains
      tempAssessment.state.domains = domains.filter(domain => domain.caregiver_index !== caregiverIndex)
      this.updateAssessment(tempAssessment)
    }
  }

  initialSave(assessment) {
    postSuccessMessage(this.props.match.url, successMsgFrom.SAVE)
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    })
    updateUrlWithAssessment(this.props.history, this.props.match, assessment)
  }

  handleSaveAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating })
    const assessment = this.state.assessment
    assessment.person = this.props.client
    let updatedAssessment
    if (assessment.id) {
      try {
        updatedAssessment = await AssessmentService.update(assessment.id, assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.SAVE)
        this.setState({
          assessment: updatedAssessment,
          assessmentServiceStatus: LoadingState.ready,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    } else {
      try {
        updatedAssessment = await AssessmentService.postAssessment(assessment)
        this.initialSave(updatedAssessment)
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }

    if (this.state.assessment.id) {
      this.updateIsEditableState()
      const canDisplaySummaryOnSave =
        this.state.assessment.status === AssessmentStatus.inProgress &&
        this.state.isEditable &&
        this.state.isValidForSubmit
      this.setState({ canDisplaySummaryOnSave })
      if (canDisplaySummaryOnSave) {
        // scroll the page upwards when assessment summary can display on save
        completeAutoScroll(this.state.completeScrollTarget, SCROLL_POSITION_ADJUST)
      }
      // Capture New Relic data after the assessment has been successfully saved
      const countyName = handleCountyName(this.state.assessment)
      logPageAction('assessmentSave', {
        assessment_id: this.state.assessment.id,
        assessment_county: countyName,
      })
    }
  }

  handleCompleteScrollTarget = () => {
    const element = this.assessmentHeader
    if (this.state.completeScrollTarget === 0 && element.current) {
      this.setState({
        completeScrollTarget: element.current.getBoundingClientRect().bottom,
      })
    }
  }

  handleSubmitAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating })
    const assessment = Object.assign({}, this.state.assessment)
    assessment.status = AssessmentStatus.completed
    assessment.person = this.props.client
    if (assessment.id) {
      try {
        const submittedAssessment = await AssessmentService.update(assessment.id, assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.COMPLETE)
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          assessment: submittedAssessment,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    } else {
      try {
        const submittedAssessment = await AssessmentService.postAssessment(assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.COMPLETE)
        updateUrlWithAssessment(this.props.history, this.props.match, submittedAssessment)
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          assessment: submittedAssessment,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }
    completeAutoScroll(this.state.completeScrollTarget, SCROLL_POSITION_ADJUST)
    if (this.state.assessment.id) {
      this.updateIsEditableState()
      // Capture New Relic data after the assessment has been successfully submitted
      const countyName = handleCountyName(this.state.assessment)
      logPageAction('assessmentSubmit', {
        assessment_id: this.state.assessment.id,
        assessment_county: countyName,
      })
    }
  }

  handleCancelClick = () => this.setState({ shouldRedirectToClientProfile: true })

  handleEventDateFieldKeyUp = date => {
    const dateValue = date.target.value
    const isValidDate = isValidLocalDate(dateValue, true)
    const dob = this.props.client.dob
    const isEventDateBeforeDob = isValidDate && !validateAssessmentEventDate(dob, localToIsoDate(dateValue))
    this.setState({
      isValidDate,
      isEventDateBeforeDob,
    })
  }
  render() {
    const { client } = this.props
    const {
      shouldRedirectToClientProfile,
      isValidForSubmit,
      assessment,
      isSubmitWarningShown,
      i18n,
      assessmentServiceStatus,
      isEditable,
      canDisplaySummaryOnSave,
    } = this.state
    if (shouldRedirectToClientProfile) {
      return <Redirect push to={{ pathname: trimUrlForClientProfile(this.props.match.url) }} />
    }
    return (
      <Fragment>
        <div ref={this.assessmentHeader}>
          <AssessmentContainerInner
            client={client}
            onEventDateFieldKeyUp={this.handleEventDateFieldKeyUp}
            assessment={assessment}
            i18n={i18n}
            onAssessmentUpdate={this.updateAssessment}
            assessmentServiceStatus={assessmentServiceStatus}
            isSubmitWarningShown={isSubmitWarningShown}
            isEditable={isEditable}
            onCancelClick={this.handleCancelClick}
            handleSubmitWarning={this.handleSubmitWarning}
            handleSubmitAssessment={this.handleSubmitAssessment}
            handleCaregiverRemove={this.handleCaregiverRemove}
            isValidForSubmit={isValidForSubmit}
            canDisplaySummaryOnSave={canDisplaySummaryOnSave}
            isEventDateBeforeDob={this.state.isValidDate && this.state.isEventDateBeforeDob}
          />
        </div>
      </Fragment>
    )
  }
}

AssessmentContainer.propTypes = {
  client: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentContainer.defaultProps = {
  disabled: false,
  match: {
    params: {},
  },
  history: {},
}
