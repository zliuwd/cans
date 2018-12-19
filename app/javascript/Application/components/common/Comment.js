import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Label } from '@cwds/components'
import CommentIcon from './CommentIcon'
import { isSafari } from '../../util/common'

/* Safari browser calculates the length of textarea input in a different way than other browsers.
This function calculates how many additional symbols should be added to textarea.maxlength
to compensate this irregular Safari behavior */
const calculateSafariMaxLengthAddition = value => (isSafari ? (value.match(/(\r\n|\n|\r)/g) || []).length : 0)

class Comment extends Component {
  constructor(props) {
    super(props)
    const value = props.comment
    this.state = {
      isFocused: false,
      value,
      safariMaxLengthCompensation: calculateSafariMaxLengthAddition(value),
    }
  }

  handleInternalValueUpdate = event => {
    const value = event.target.value
    this.setState({
      value,
      safariMaxLengthCompensation: calculateSafariMaxLengthAddition(value),
    })
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
    const { isFocused, value, safariMaxLengthCompensation } = this.state
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
            maxLength={maxCommentLength + safariMaxLengthCompensation}
            disabled={this.props.disabled}
          />
          <span className={`${prefix}-text-length${lengthClassSuffix}`}>{`${value.length}/${maxCommentLength}`}</span>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  maxCommentLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
}

Comment.defaultProps = {
  comment: '',
  disabled: false,
  maxCommentLength: 250,
}

export default Comment
