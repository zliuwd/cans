import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

class SearchAssessmentHistoryRecord extends PureComponent {
  render() {
    return (
      <div className="col-md-4">
        <AssessmentRecordInfo
          inheritUrl={this.props.inheritUrl}
          assessment={this.props.assessment}
          header={'assessment-client-name'}
          navFrom={this.props.navFrom}
          updateAssessmentHistoryCallback={this.props.updateAssessmentHistoryCallback}
        />
      </div>
    )
  }
}

SearchAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

export default SearchAssessmentHistoryRecord
