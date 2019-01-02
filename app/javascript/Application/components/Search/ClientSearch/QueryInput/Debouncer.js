import React, { Component } from 'react'
import PropTypes from 'prop-types'

const WAIT = 400

class Debouncer extends Component {
  debounce = value => {
    clearTimeout(this.timer)
    const callback = this.props.callback.bind(null, value)

    if (value === '') {
      callback()
    } else {
      this.timer = setTimeout(callback, WAIT)
    }
  }

  render() {
    return React.cloneElement(this.props.children, { [this.props.callbackPropName]: this.debounce })
  }
}

Debouncer.propTypes = {
  callback: PropTypes.func.isRequired,
  callbackPropName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default Debouncer
