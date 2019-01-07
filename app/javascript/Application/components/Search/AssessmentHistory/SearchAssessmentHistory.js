import React from 'react'
import PropTypes from 'prop-types'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import { LoadingState } from '../../../util/loadingHelper'
import { AssessmentStatus, sortAssessments } from '../../Assessment'

class SearchAssessmentHistory extends React.Component {
  processAssessments() {
    const { assessments } = this.props
    if (assessments) {
      const inProgressAssessments = assessments.filter(assessment => assessment.status === AssessmentStatus.inProgress)
      const options = {
        assessments: inProgressAssessments,
        sortEventDate: false,
        sortCreatedTimestamp: true,
        sortUpdatedTimestamp: true,
        backupSort: false,
        direction: 'desc',
      }
      const sortedAssessmentsByDate = sortAssessments(options)
      const sortedAssessmentsByDateSubset = sortedAssessmentsByDate.slice(0, this.props.numAssessments)

      return sortedAssessmentsByDateSubset
    } else {
      return []
    }
  }

  renderAssessments() {
    const { loadingState, navFrom, inheritUrl } = this.props
    const assessments = this.processAssessments()
    const noDataText =
      loadingState === LoadingState.ready ? 'No assessments currently exist for the clients.' : 'Loading assessments...'

    return assessments.length === 0 ? (
      <div id="no-data">{noDataText}</div>
    ) : (
      assessments.map(assessment => (
        <SearchAssessmentHistoryRecord
          navFrom={navFrom}
          assessment={assessment}
          key={assessment.id}
          inheritUrl={inheritUrl}
          updateAssessmentHistoryCallback={this.props.updateAssessmentHistoryCallback}
        />
      ))
    )
  }

  render() {
    return <div className="row">{this.renderAssessments()}</div>
  }
}

SearchAssessmentHistory.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
  inheritUrl: PropTypes.string.isRequired,
  loadingState: PropTypes.string,
  navFrom: PropTypes.string.isRequired,
  numAssessments: PropTypes.number.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

SearchAssessmentHistory.defaultProps = {
  assessments: [],
  loadingState: '',
}

export default SearchAssessmentHistory
