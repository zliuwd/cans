import React from 'react'
import PropTypes from 'prop-types'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import { LoadingState } from '../../../util/loadingHelper'

const SearchAssessmentHistory = props => (
  <div className="row">
    {!props.assessments || props.assessments.length === 0 ? (
      <div id="no-data">
        {props.loadingState === LoadingState.ready
          ? 'No assessments currently exist for the clients.'
          : 'Loading assessments...'}
      </div>
    ) : (
      props.assessments.map(assessment => (
        <SearchAssessmentHistoryRecord
          key={assessment.id}
          assessment={assessment}
          inheritUrl={props.inheritUrl}
          navFrom={props.navFrom}
          updateAssessmentHistoryCallback={props.updateAssessmentHistoryCallback}
        />
      ))
    )}
  </div>
)

SearchAssessmentHistory.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
  inheritUrl: PropTypes.string.isRequired,
  loadingState: PropTypes.string,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

SearchAssessmentHistory.defaultProps = {
  assessments: [],
  loadingState: '',
}

export default SearchAssessmentHistory
