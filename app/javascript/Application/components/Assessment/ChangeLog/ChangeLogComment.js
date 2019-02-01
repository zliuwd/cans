import React from 'react'
import PropTypes from 'prop-types'

const ChangeLogComment = ({ original }) => {
  return <div>{original.deletion_reason}</div>
}

ChangeLogComment.propTypes = {
  original: PropTypes.shape({
    deletion_reason: PropTypes.string,
  }).isRequired,
}

export default ChangeLogComment
