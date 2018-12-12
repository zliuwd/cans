import React from 'react'
import PropTypes from 'prop-types'
import AssessmentLink from '../../common/AssessmentLink'

const ClientAssessmentHistoryLink = ({ original }) => {
  const props = { assessment: original, key: original.id, linkText: '' }
  return original.id ? <AssessmentLink {...props} /> : null
}

ClientAssessmentHistoryLink.propTypes = {
  original: PropTypes.shape({
    number: PropTypes.number,
  }).isRequired,
}

export default ClientAssessmentHistoryLink
