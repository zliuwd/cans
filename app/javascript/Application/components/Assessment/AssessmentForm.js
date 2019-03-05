import React from 'react'
import PropTypes from 'prop-types'
import NewAssessmentContainer from './NewAssessmentContainer'
import AssessmentDraftManager from './AssessmentDraftManager'
import AssessmentLoadingBoundary from './AssessmentLoadingBoundary'

const AssessmentForm = ({ client, history, match, pageHeaderButtonsController }) => {
  const assessmentId = match.params.id
  return (
    <AssessmentLoadingBoundary instrumentId="1" assessmentId={assessmentId}>
      <AssessmentDraftManager>
        <NewAssessmentContainer
          client={client}
          history={history}
          match={match}
          pageHeaderButtonsController={pageHeaderButtonsController}
        />
      </AssessmentDraftManager>
    </AssessmentLoadingBoundary>
  )
}

AssessmentForm.propTypes = {
  client: PropTypes.object.isRequired,
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
