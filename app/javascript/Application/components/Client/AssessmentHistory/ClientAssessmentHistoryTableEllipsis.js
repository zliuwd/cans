import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../common/Ellipsis'

const ClientAssessmentHistoryTableEllipsis = ({ original }) => {
  const { person, id, inheritUrl } = original
  return id && person ? <Ellipsis clientId={person.identifier} inheritUrl={inheritUrl} assessmentId={id} /> : null
}

ClientAssessmentHistoryTableEllipsis.propTypes = {
  original: PropTypes.shape({
    id: PropTypes.number,
    person: PropTypes.object,
  }).isRequired,
}

export default ClientAssessmentHistoryTableEllipsis
