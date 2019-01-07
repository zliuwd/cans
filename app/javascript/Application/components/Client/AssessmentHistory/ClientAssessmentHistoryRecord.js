import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

const ClientAssessmentHistoryRecord = props => {
  const { updateAssessmentHistoryCallback } = props

  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo
        assessment={props.assessment}
        header={'assessment-status'}
        navFrom={props.navFrom}
        inheritUrl={props.inheritUrl}
        userId={props.userId}
        updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
      />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  navFrom: null,
  userId: null,
}

export default ClientAssessmentHistoryRecord
