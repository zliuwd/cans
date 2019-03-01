import pageLockService from './PageLockService'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ExternalLink extends Component {
  constructor(context) {
    super(context)
    this.confirmLeavePage = this.confirmLeavePage.bind(this)
    this.leavePage = this.leavePage.bind(this)
  }

  confirmLeavePage(event) {
    event.preventDefault()
    pageLockService.confirm(this.leavePage)
  }

  leavePage() {
    pageLockService.unlock()
    document.location.assign(this.props.href)
  }

  render() {
    return (
      <a href={this.props.href} onClick={this.confirmLeavePage}>
        {this.props.text}
      </a>
    )
  }
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ExternalLink
