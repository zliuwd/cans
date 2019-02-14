import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import { AssessmentRecordInfo } from '../../Assessment/'

const ClientAssessmentHistoryRecord = props => {
  const { assessment, navFrom, inheritUrl, userId, updateAssessmentHistoryCallback } = props

  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo
        assessment={assessment}
        header={'assessment-status'}
        navFrom={navFrom}
        inheritUrl={inheritUrl}
        updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
        userId={userId}
      />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  userId: null,
}

export default ClientAssessmentHistoryRecord
