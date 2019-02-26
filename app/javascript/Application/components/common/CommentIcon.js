import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'

const CommentIcon = ({ className, ratingType }) => {
  const ratingTypeClass = ratingType ? `${ratingType}-${className}` : ''
  return <Icon name="comment-alt" className={`comment-icon-solid ${className} ${ratingTypeClass}`} />
}

CommentIcon.propTypes = {
  className: PropTypes.string,
  ratingType: PropTypes.string,
}

CommentIcon.defaultProps = {
  className: '',
  ratingType: '',
}

export default CommentIcon
