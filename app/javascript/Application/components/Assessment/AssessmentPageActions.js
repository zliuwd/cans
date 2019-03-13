import React from 'react'
import PropTypes from 'prop-types'
import { logPageAction } from '../../util/analytics'
import { LoadingState } from '../../util/loadingHelper'
import { AssessmentStatus, handleCountyName } from './AssessmentHelper'

class AssessmentPageActions extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    const isSaved = prevProps.loadingState === LoadingState.updating && this.props.loadingState === LoadingState.ready
    const assessment = this.props.assessment

    if (isSaved && assessment.id) {
      const wasSubmit = assessment.status === AssessmentStatus.completed && prevProps.assessment.status !== AssessmentStatus.completed
      const action = wasSubmit ? 'assessmentSubmit' : 'assessmentSave'
      logPageAction(action, {
        assessment_id: assessment.id,
        assessment_county: handleCountyName(assessment),
      })
    }
  }

  render() {
    return null
  }
}

AssessmentPageActions.propTypes = {
  assessment: PropTypes.shape({
    id: PropTypes.number,
    county: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.oneOf(Object.values(AssessmentStatus)).isRequired,
  }).isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)).isRequired,
}

export default AssessmentPageActions
