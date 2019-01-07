import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../common/Ellipsis'

const ClientAssessmentHistoryTableEllipsis = ({ original }) => {
  const { person, id, metadata, status, inheritUrl, updateAssessmentHistoryCallback } = original

  return (
    <Ellipsis
      clientId={person.identifier}
      assessmentId={id}
      assessmentMetaData={metadata}
      assessmentStatus={status}
      inheritUrl={inheritUrl}
      updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
    />
  )
}

ClientAssessmentHistoryTableEllipsis.propTypes = {
  original: PropTypes.shape({
    id: PropTypes.number,
    person: PropTypes.object,
    metadata: PropTypes.shape({
      allowed_operations: PropTypes.array,
    }),
    status: PropTypes.string,
    inheritUrl: PropTypes.string,
    updateAssessmentHistoryCallback: PropTypes.func,
  }).isRequired,
}

export default ClientAssessmentHistoryTableEllipsis
