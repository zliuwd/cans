import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CloseableAlert, alertType } from '../common/CloseableAlert'
import { clone } from '../../util/common'
import PageModal from '../common/PageModal'
import ConfidentialityWarning from '../common/ConfidentialityWarning'
import {
  Assessment,
  AssessmentFormHeader,
  AssessmentFormFooter,
  AssessmentService,
  I18nService,
  SecurityService,
} from './'
import AssessmentSummaryCard from './AssessmentSummary/AssessmentSummaryCard'
import Typography from '@material-ui/core/Typography'
import { LoadingState, isReadyForAction } from '../../util/loadingHelper'
import { PrintAssessment } from '../Print'
import {
  AssessmentStatus,
  AssessmentType,
  validateAssessmentForSubmit,
  defaultEmptyAssessment,
} from './AssessmentHelper'
import { globalAlertService } from '../../util/GlobalAlertService'
import { buildSaveAssessmentButton } from '../Header/PageHeaderButtonsBuilder'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import './style.sass'
import { getCurrentIsoDate } from '../../util/dateHelper'
import moment from 'moment'
import { logPageAction } from '../../util/analytics'

class AssessmentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessment: defaultEmptyAssessment,
      assessmentServiceStatus: LoadingState.idle,
      i18n: {},
      isValidForSubmit: false,
      shouldRedirectToClientProfile: false,
      isEditable: false,
      isValidDate: true,
      isCaregiverWarningShown: false,
      isSubmitWarningShown: false,
      isSaveButtonEnabled: false,
      focusedCaregiverId: '',
    }
  }

  async componentDidMount() {
    const assessmentId = this.props.match.params.id
    await this.updateIsEditableState(assessmentId)
    assessmentId ? this.fetchAssessment(assessmentId) : this.fetchNewAssessment()
  }

  componentDidUpdate() {
    this.updateSaveButtonStatusIfNeeded()
  }

  componentWillUnmount() {
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
  }

  async updateIsEditableState(assessmentId) {
    const isEditable =
      assessmentId === undefined || (await SecurityService.checkPermission(`assessment:write:${assessmentId}`))
    this.setState({ isEditable })
  }

  initHeaderButtons(isSaveButtonEnabled) {
    const { assessment, i18n } = this.state
    const node = <PrintAssessment assessment={assessment} i18n={i18n} />
    const leftButton = buildSaveAssessmentButton(this.handleSaveAssessment, isSaveButtonEnabled)
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
    const { assessment, assessmentServiceStatus, isEditable, isValidDate } = this.state
    return (
      isValidDate &&
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

  handleWarningShow = (switcher, caregiverIndex) => {
    caregiverIndex = caregiverIndex || null
    this.setState({
      isCaregiverWarningShown: switcher,
      focusedCaregiverId: caregiverIndex,
    })
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
    const isValidForSubmit = validateAssessmentForSubmit(assessment)
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
      isValidForSubmit,
    })
  }

  getCaregiverDomainsNumber = () => {
    return this.state.assessment.state.domains.filter(domain => {
      return domain.is_caregiver_domain === true
    }).length
  }

  handleCaregiverRemoveAll = (name, value) => {
    const tempAssessment = clone(this.state.assessment)
    tempAssessment[name] = value
    this.updateAssessment(tempAssessment)
  }

  handleCaregiverRemove = caregiverIndex => {
    const tempAssessment = clone(this.state.assessment)
    const captureCaregiverDomains = this.getCaregiverDomainsNumber()
    if (!caregiverIndex || captureCaregiverDomains <= 1) {
      this.handleCaregiverRemoveAll('has_caregiver', false)
    } else {
      const domains = tempAssessment.state.domains
      tempAssessment.state.domains = domains.filter(domain => domain.caregiver_index !== caregiverIndex)
      this.updateAssessment(tempAssessment)
    }
  }

  postSuccessMessage() {
    const { client } = this.props
    const message = (
      <Fragment>
        Success! CANS assessment has been saved. <Link to={`/clients/${client.identifier}`}>Click here</Link> to return
        to Child/Youth profile.
      </Fragment>
    )
    globalAlertService.postSuccess({ message })
  }

  initialSave(assessment) {
    this.postSuccessMessage()
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    })
    this.updateUrlWithAssessment(assessment)
  }

  updateUrlWithAssessment(assessment) {
    this.props.history.push(`/clients/${this.props.client.identifier}/assessments/${assessment.id}`)
  }

  handleSaveAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating })
    const assessment = this.state.assessment
    assessment.person = this.props.client
    if (assessment.id) {
      try {
        const updatedAssessment = await AssessmentService.update(assessment.id, assessment)
        this.postSuccessMessage()
        this.setState({
          assessment: updatedAssessment,
          assessmentServiceStatus: LoadingState.ready,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    } else {
      try {
        const updatedAssessment = await AssessmentService.postAssessment(assessment)
        this.initialSave(updatedAssessment)
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }
    if (this.state.assessment.id) {
      // Capture New Relic data after the assessment has been successfully saved
      logPageAction('assessmentSave', {
        assessment_id: this.state.assessment.id,
        assessment_county: this.state.assessment.county.name,
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
        await AssessmentService.update(assessment.id, assessment)
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
        this.updateUrlWithAssessment(submittedAssessment)
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          assessment: submittedAssessment,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }
    if (this.state.assessment.id) {
      // Capture New Relic data after the assessment has been successfully submitted
      logPageAction('assessmentSubmit', {
        assessment_id: this.state.assessment.id,
        assessment_county: this.state.assessment.county.name,
      })
    }
  }

  handleCancelClick = () => this.setState({ shouldRedirectToClientProfile: true })

  validateDate(date) {
    return moment(date, 'MM/DD/YYYY', true).isValid()
  }

  handleKeyUp = date => {
    const dateValue = date.target.value
    this.setState({ isValidDate: this.validateDate(dateValue) })
  }

  renderWarning = () => {
    const caregiverWarning = (
      <div>
        You are about to remove the <strong className="cargiver-text-block">caregiver</strong> from this Assessment.
      </div>
    )
    return this.state.isCaregiverWarningShown ? (
      <PageModal
        isOpen={true}
        title={'Warning'}
        warningDescription={caregiverWarning}
        description={'This may effect some of your entries.'}
        removeButtonLabel={'Remove'}
        cancelButtonLabel={'Cancel'}
        onCancel={() => this.handleWarningShow(false)}
        onRemove={() => {
          this.handleWarningShow(false)
          this.handleCaregiverRemove(this.state.focusedCaregiverId)
        }}
      />
    ) : null
  }

  render() {
    const { client } = this.props
    const {
      shouldRedirectToClientProfile,
      isValidForSubmit,
      assessment,
      i18n,
      assessmentServiceStatus,
      isEditable,
    } = this.state
    if (shouldRedirectToClientProfile) {
      return <Redirect push to={{ pathname: `/clients/${client.identifier}` }} />
    }
    const canPerformUpdates = isReadyForAction(assessmentServiceStatus)
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    assessment.person = client
    return (
      <Fragment>
        {this.renderWarning()}
        {this.state.isSubmitWarningShown ? (
          <ConfidentialityWarning
            onCancel={() => this.handleSubmitWarning()}
            onRemove={() => {
              this.handleSubmitWarning()
              this.handleSubmitAssessment()
            }}
          />
        ) : null}
        <AssessmentFormHeader
          client={client}
          assessment={assessment}
          onAssessmentUpdate={this.updateAssessment}
          onKeyUp={this.handleKeyUp}
          handleWarningShow={this.handleWarningShow}
          isCaregiverWarningShown={this.state.isCaregiverWarningShown}
        />
        <AssessmentSummaryCard
          assessmentStatus={assessment.status}
          domains={assessment && assessment.state && assessment.state.domains}
          i18n={i18n}
          isUnderSix={Boolean(isUnderSix)}
        />
        <Assessment
          assessment={assessment}
          i18n={i18n}
          onAssessmentUpdate={this.updateAssessment}
          handleWarningShow={this.handleWarningShow}
        />
        {LoadingState.ready === assessmentServiceStatus &&
          isEditable &&
          !(isUnderSix === null || isUnderSix === undefined) && (
            <Typography variant="headline" className={'submit-validation-message'}>
              The Assessment Date and all assessment ratings must be completed before the Complete button becomes
              active.
            </Typography>
          )}
        {LoadingState.ready === assessmentServiceStatus &&
          !isEditable && (
            <div className={'permission-warning-alert'}>
              <CloseableAlert
                type={alertType.WARNING}
                message="This assessment was initiated in a county that is different than the User’s County. Saving and
              Submitting are disabled"
                isCloseable={false}
                isAutoCloseable={false}
              />
            </div>
          )}
        {isUnderSix !== undefined && (
          <AssessmentFormFooter
            assessment={assessment}
            onCancelClick={this.handleCancelClick}
            isSubmitButtonEnabled={isEditable && canPerformUpdates && isValidForSubmit}
            onSubmitAssessment={
              this.state.assessment.can_release_confidential_info === true
                ? this.handleSubmitAssessment
                : this.handleSubmitWarning
            }
          />
        )}
      </Fragment>
    )
  }
}

AssessmentContainer.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentContainer.defaultProps = {
  match: {
    params: {},
  },
  history: {},
}

export default AssessmentContainer
