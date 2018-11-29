import React from 'react'
import PropTypes from 'prop-types'
import STATUS_CHANGE_TYPES from './StatusChangeTypes'

const ChangeLogStatus = ({ original }) => {
  return original.assessment_change_type ? <div>{STATUS_CHANGE_TYPES[original.assessment_change_type]}</div> : null
}

ChangeLogStatus.propTypes = {
  original: PropTypes.shape({
    assessment_change_type: PropTypes.string,
  }).isRequired,
}

export default ChangeLogStatus
