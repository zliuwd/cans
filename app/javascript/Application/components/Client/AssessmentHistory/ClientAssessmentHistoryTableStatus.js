import React from 'react'
import PropTypes from 'prop-types'
import AssessmentRecordStatus from '../../Assessment/AssessmentRecordStatus'

const ClientAssessmentHistoryTableStatus = ({ original }) => {
  const { status } = original
  return status ? <AssessmentRecordStatus status={status} isForTable={true} /> : null
}

ClientAssessmentHistoryTableStatus.propTypes = {
  original: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

export default ClientAssessmentHistoryTableStatus
