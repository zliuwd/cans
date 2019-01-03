import React from 'react'
import PropTypes from 'prop-types'
import CommentIcon from '../common/CommentIcon'

const DomainCommentIcon = ({ domain: { comment, items } }) => {
  const hasComment = Boolean(comment) || items.some(item => item.comment)

  return <CommentIcon className="domain-toolbar-comment-icon" isSolid={hasComment} />
}

DomainCommentIcon.propTypes = {
  domain: PropTypes.shape({
    comment: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
}

export default DomainCommentIcon
