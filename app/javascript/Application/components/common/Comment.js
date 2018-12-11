import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Label } from '@cwds/components'
import CommentIcon from './CommentIcon'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
      value: props.comment,
    }
  }

  handleInternalValueUpdate = event => {
    this.setState({ value: event.target.value })
  }

  handleOnFocus = () => {
    this.setState({ isFocused: true })
  }

  handleOnBlur = () => {
    const { value } = this.state
    const { comment, onChange } = this.props
    if (value !== comment) {
      onChange(value)
    }
    this.setState({ isFocused: false })
  }

  render() {
    const { isFocused, value } = this.state
    const { prefix, maxCommentLength, id } = this.props
    const isFolded = !isFocused && !value
    const inputClassSuffix = isFolded ? '-empty' : ''
    const lengthClassSuffix = isFocused ? '' : '-hidden'
    const inputId = `${id}-${prefix}`
    return (
      <div className={`${prefix}-wrapper`}>
        <div className={`${prefix}-block`}>
          <Label for={inputId}>
            <CommentIcon isSolid={Boolean(value)} />
            <span className={`${prefix}-label`}>Comment</span>
          </Label>
          <textarea
            id={inputId}
            className={`${prefix}-textarea${inputClassSuffix}`}
            value={value}
            onChange={this.handleInternalValueUpdate}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            maxLength={maxCommentLength}
          />
          <span className={`${prefix}-text-length${lengthClassSuffix}`}>{`${value.length}/${maxCommentLength}`}</span>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.string,
  id: PropTypes.string.isRequired,
  maxCommentLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
}

Comment.defaultProps = {
  comment: '',
  maxCommentLength: 250,
}

export default Comment
