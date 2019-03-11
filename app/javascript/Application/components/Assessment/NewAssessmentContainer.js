import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'
import AssessmentContainerInner from './AssessmentContainerInner'
import { AssessmentStatus, defaultEmptyAssessment } from './AssessmentHelper'
import AssessmentPageHeader from './AssessmentPageHeader'
import { isAuthorized } from '../common/AuthHelper'

class NewAssessmentContainer extends React.PureComponent {
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

  handleUpdateAssessment = assessment => {
    const newAssessment = {
      ...assessment,
      person: this.props.client,
    }

    this.props.onSetAssessment(newAssessment)
  }

  render() {
    const { assessment, client, i18n, loadingState, pageHeaderButtonsController } = this.props

    const isEditable = Boolean(!assessment || !assessment.id || isAuthorized(assessment, 'update'))

    if (assessment === null) {
      return null
    }

    return (
      <React.Fragment>
        <AssessmentPageHeader
          assessment={assessment}
          clientDateOfBirth={client.dob}
          i18n={i18n}
          isEditable={isEditable}
          isValidDate={true}
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
          handleCaregiverRemove={() => {}}
          handleSubmitAssessment={this.handleSubmitAssessment}
          isEventDateBeforeDob={false}
          isValidForSubmit={false}
          onAssessmentUpdate={this.handleUpdateAssessment}
          onCancelClick={() => {}}
          onEventDateFieldKeyUp={() => {}}
        />
      </React.Fragment>
    )
  }
}

NewAssessmentContainer.propTypes = {
  assessment: PropTypes.any,
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
