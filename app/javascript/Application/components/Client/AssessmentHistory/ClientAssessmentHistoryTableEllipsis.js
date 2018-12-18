import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../common/Ellipsis'

const ClientAssessmentHistoryTableEllipsis = ({ original }) => {
  const { person, id } = original
  return id && person ? <Ellipsis clientId={person.identifier} assessmentId={id} /> : null
}

ClientAssessmentHistoryTableEllipsis.propTypes = {
  original: PropTypes.shape({
    id: PropTypes.number,
    person: PropTypes.object,
  }).isRequired,
}

export default ClientAssessmentHistoryTableEllipsis
