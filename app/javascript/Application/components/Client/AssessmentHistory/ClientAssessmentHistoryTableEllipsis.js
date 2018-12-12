import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../common/Ellipsis'

const ClientAssessmentHistoryTableEllipsis = ({ original }) => {
  const { id } = original
  return id ? <Ellipsis id={id} /> : null
}

ClientAssessmentHistoryTableEllipsis.propTypes = {
  original: PropTypes.shape({
    number: PropTypes.number,
  }).isRequired,
}

export default ClientAssessmentHistoryTableEllipsis
