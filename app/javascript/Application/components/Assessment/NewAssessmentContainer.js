import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'
import AssessmentContainerInner from './AssessmentContainerInner'
import { AssessmentStatus, defaultEmptyAssessment } from './AssessmentHelper'
import { isAuthorized } from '../common/AuthHelper'

class NewAssessmentContainer extends React.PureComponent {
  handleSubmitAssessment = () => {
    const newAssessment = {
      ...this.props.assessment,
      person: this.props.client,
      status: AssessmentStatus.completed,
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
    const { assessment, client, i18n, loadingState } = this.props

    const isEditable = Boolean(!assessment || !assessment.id || isAuthorized(assessment, 'update'))

    return (
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
    )
  }
}

NewAssessmentContainer.propTypes = {
  assessment: PropTypes.any,
  client: PropTypes.any.isRequired,
  i18n: PropTypes.any,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  onResetAssessment: PropTypes.func,
  onSaveAssessment: PropTypes.func,
  onSetAssessment: PropTypes.func,
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
