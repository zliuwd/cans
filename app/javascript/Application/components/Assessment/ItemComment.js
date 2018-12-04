import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from '@cwds/components'
import ItemCommentIcon from './ItemCommentIcon'

const maxCommentLength = 250

class ItemComment extends Component {
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
    const isFolded = !isFocused && !value
    const classSuffix = isFolded ? '-empty' : ''
    const inputId = `comment-${this.props.itemCode}`
    return (
      <div className={'item-comment-wrapper'}>
        <div className={'item-comment-block'}>
          <Label for={inputId}>
            <ItemCommentIcon isSolid={Boolean(value)} />
            <span className={'item-comment-label'}>Comment</span>
          </Label>
          <Input
            id={inputId}
            type={'textarea'}
            className={`item-comment-textarea${classSuffix}`}
            value={value}
            onChange={this.handleInternalValueUpdate}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            maxLength={maxCommentLength}
          />
          {isFocused && <span className={'item-comment-text-length'}>{`${value.length}/${maxCommentLength}`}</span>}
        </div>
      </div>
    )
  }
}

ItemComment.propTypes = {
  comment: PropTypes.string,
  itemCode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

ItemComment.defaultProps = {
  comment: '',
}

export default ItemComment
