import React from 'react'
import PropTypes from 'prop-types'

const MIN_SEARCHABLE_CHARS = 2
const isValidQuery = value => value && value.replace(/^\s+/, '').length >= MIN_SEARCHABLE_CHARS

class InputField extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value })
    this.props.onChange(isValidQuery(value) ? value : '')
  }

  onFocus = () => {
    if (isValidQuery(this.state.value)) {
      this.props.openMenu()
    }
  }

  render() {
    const { onChange, openMenu, ...props } = this.props
    return <input {...props} onChange={this.onChange} onFocus={this.onFocus} value={this.state.value} />
  }
}

InputField.propTypes = {
  onChange: PropTypes.func,
  openMenu: PropTypes.func,
}

InputField.defaultProps = {
  onChange: () => {},
  openMenu: () => {},
}

export default InputField
