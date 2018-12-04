import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'

const ItemCommentIcon = ({ isSolid, className }) => (
  <Icon
    name="comment-alt"
    set={isSolid ? 'fas' : 'far'}
    className={`${isSolid ? 'comment-icon-solid' : 'comment-icon-outlined'} ${className}`}
  />
)

ItemCommentIcon.propTypes = {
  className: PropTypes.string,
  isSolid: PropTypes.bool,
}

ItemCommentIcon.defaultProps = {
  className: '',
  isSolid: false,
}

export default ItemCommentIcon
