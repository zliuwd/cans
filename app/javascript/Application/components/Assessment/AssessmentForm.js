import React from 'react'
import PropTypes from 'prop-types'
import NewAssessmentContainer from './NewAssessmentContainer'
import AssessmentDraftManager from './AssessmentDraftManager'
import AssessmentLoadingBoundary from './AssessmentLoadingBoundary'

const AssessmentForm = ({ client, history, match, pageHeaderButtonsController }) => {
  const assessmentId = match.params.id
  return (
    <AssessmentLoadingBoundary clientId={client.identifier} assessmentId={assessmentId} instrumentId="1">
      <AssessmentDraftManager history={history} match={match}>
        <NewAssessmentContainer client={client} pageHeaderButtonsController={pageHeaderButtonsController} />
      </AssessmentDraftManager>
    </AssessmentLoadingBoundary>
  )
}

AssessmentForm.propTypes = {
  client: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}
AssessmentForm.defaultProps = {
  history: {},
}
export default AssessmentForm
