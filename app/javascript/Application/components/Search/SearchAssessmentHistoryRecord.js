import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AssessmentRecordInfo from '../common/AssessmentRecordInfo'

class SearchAssessmentHistoryRecord extends PureComponent {
  render() {
    return (
      <div className="col-md-4">
        <AssessmentRecordInfo assessment={this.props.assessment} header={'assessment-client-name'} />
      </div>
    )
  }
}

SearchAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default SearchAssessmentHistoryRecord
