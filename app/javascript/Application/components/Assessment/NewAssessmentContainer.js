import React from 'react'
import PropTypes from 'prop-types'
import { isValidLocalDate, localToIsoDate } from '../../util/dateHelper'
import { LoadingState } from '../../util/loadingHelper'
import AssessmentContainerInner from './AssessmentContainerInner'
import {
  AssessmentStatus,
  defaultEmptyAssessment,
  getCaregiverDomainsNumber,
  validateAssessmentEventDate,
  validateAssessmentForSubmit,
} from './AssessmentHelper'
import AssessmentPageHeader from './AssessmentPageHeader'
import AssessmentStatusMessages from './AssessmentStatusMessages'
import { isAuthorized } from '../common/AuthHelper'

class NewAssessmentContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isEventDateBeforeDob: false,
      isValidDate: true,
    }
  }

  handleSubmitAssessment = () => {
    this.save({
      ...this.props.assessment,
      status: AssessmentStatus.completed,
    })
  }

  handleSaveAssessment = () => {
    this.save(this.props.assessment)
  }

  save = assessment => {
    const newAssessment = {
      ...assessment,
      person: this.props.client,
    }
    this.props.onSaveAssessment(newAssessment)
  }

  handleCaregiverRemove = caregiverIndex => {
    const captureCaregiverDomains = getCaregiverDomainsNumber(this.props.assessment)

    let filter
    if (!caregiverIndex || captureCaregiverDomains <= 1) {
      filter = domain => !domain.is_caregiver_domain
    } else {
      filter = domain => domain.caregiver_index !== caregiverIndex
    }

    const newDomains = this.props.assessment.state.domains.filter(filter)

    this.props.onSetAssessment({
      ...this.props.assessment,
      state: {
        ...this.props.assessment.state,
        domains: newDomains,
      },
      has_caregiver: newDomains.some(domain => domain.is_caregiver_domain),
    })
  }

  handleUpdateAssessment = assessment => {
    const newAssessment = {
      ...assessment,
      person: this.props.client,
    }

    this.props.onSetAssessment(newAssessment)
  }

  handleEventDateFieldKeyUp = ({ target: { value: dateValue } }) => {
    const isValidDate = isValidLocalDate(dateValue, true)
    const dob = this.props.client.dob
    const isEventDateBeforeDob = isValidDate && !validateAssessmentEventDate(dob, localToIsoDate(dateValue))
    this.setState({
      isValidDate,
      isEventDateBeforeDob,
    })
  }

  render() {
    const { assessment, client, i18n, loadingState, pageHeaderButtonsController, url } = this.props
    const { isEventDateBeforeDob, isValidDate } = this.state

    if (assessment === null) {
      return null
    }

    const isCompleted = assessment.status === AssessmentStatus.completed
    const isEditable = Boolean(!assessment || !assessment.id || isAuthorized(assessment, 'update'))
    const isValidForSubmit = validateAssessmentForSubmit(assessment)

    return (
      <React.Fragment>
        <AssessmentStatusMessages
          isCompleted={isCompleted}
          isEditable={isEditable}
          loadingState={loadingState}
          url={url}
        />
        <AssessmentPageHeader
          assessment={assessment}
          i18n={i18n}
          isEditable={isEditable}
          isEventDateBeforeDob={isEventDateBeforeDob}
          isValidDate={isValidDate}
          loadingState={loadingState}
          onSaveAssessment={this.handleSaveAssessment}
          pageHeaderButtonsController={pageHeaderButtonsController}
        />
        <AssessmentContainerInner
          assessment={assessment || defaultEmptyAssessment}
          assessmentServiceStatus={loadingState}
          client={client}
          i18n={i18n}
          isEditable={isEditable}
          // TODO: Do we need these props?
          handleCaregiverRemove={this.handleCaregiverRemove}
          handleSubmitAssessment={this.handleSubmitAssessment}
          isEventDateBeforeDob={isValidDate && isEventDateBeforeDob}
          isValidForSubmit={isValidForSubmit}
          onAssessmentUpdate={this.handleUpdateAssessment}
          onCancelClick={() => {}}
          onEventDateFieldKeyUp={this.handleEventDateFieldKeyUp}
        />
      </React.Fragment>
    )
  }
}

NewAssessmentContainer.propTypes = {
  assessment: PropTypes.shape({
    person: PropTypes.shape({
      dob: PropTypes.string.isRequired,
    }).isRequired,
    state: PropTypes.shape({
      domains: PropTypes.arrayOf(
        PropTypes.shape({
          is_caregiver_domain: PropTypes.bool,
          caregiver_index: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    has_caregiver: PropTypes.bool.isRequired,
  }),
  client: PropTypes.shape({
    dob: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.any,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  onResetAssessment: PropTypes.func,
  onSaveAssessment: PropTypes.func,
  onSetAssessment: PropTypes.func,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
}
NewAssessmentContainer.defaultProps = {
  assessment: null,
  i18n: null,
  loadingState: LoadingState.waiting,
  onResetAssessment: () => {},
  onSaveAssessment: () => {},
  onSetAssessment: () => {},
}

export default NewAssessmentContainer
