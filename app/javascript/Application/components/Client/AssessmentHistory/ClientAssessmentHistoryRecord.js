import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

const ClientAssessmentHistoryRecord = props => {
  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo
        assessment={props.assessment}
        header={'assessment-status'}
        navFrom={props.navFrom}
        inheritUrl={props.inheritUrl}
        userId={props.userId}
      />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string,
  userId: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  navFrom: null,
  userId: null,
}

export default ClientAssessmentHistoryRecord
