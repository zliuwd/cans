import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'

const CommentIcon = ({ isSolid, className, ratingType }) => {
  const ratingTypeClass = ratingType ? `${ratingType}-${className}` : ''
  return (
    <Icon
      name="comment-alt"
      set={isSolid ? 'fas' : 'far'}
      className={`${isSolid ? 'comment-icon-solid' : 'comment-icon-outlined'} ${className} ${ratingTypeClass}`}
    />
  )
}

CommentIcon.propTypes = {
  className: PropTypes.string,
  isSolid: PropTypes.bool,
  ratingType: PropTypes.string,
}

CommentIcon.defaultProps = {
  className: '',
  isSolid: false,
  ratingType: '',
}

export default CommentIcon
