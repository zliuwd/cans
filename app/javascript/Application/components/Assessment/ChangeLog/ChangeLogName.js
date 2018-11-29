import React from 'react'
import PropTypes from 'prop-types'

const ChangeLogName = ({ original }) => {
  const displayFullName =
    original.user_first_name && original.user_last_name
      ? `${original.user_last_name}, ${original.user_first_name}`
      : null

  const displayUserId = original.user_id ? original.user_id : null

  return displayFullName || displayUserId ? <div>{displayFullName || displayUserId}</div> : null
}

ChangeLogName.propTypes = {
  original: PropTypes.shape({
    user_id: PropTypes.string,
    user_first_name: PropTypes.string,
    user_last_name: PropTypes.string,
  }).isRequired,
}

export default ChangeLogName
