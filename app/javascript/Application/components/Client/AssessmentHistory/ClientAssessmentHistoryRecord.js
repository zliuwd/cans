import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

const ClientAssessmentHistoryRecord = ({ assessment }) => {
  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo assessment={assessment} header={'assessment-status'} />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default ClientAssessmentHistoryRecord
