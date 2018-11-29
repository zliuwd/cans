import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Print } from '../Print'

class PrintButton extends Component {
  constructor(props) {
    super(props)
    this.state = { shouldPrintNow: false }
  }

  componentDidMount() {
    this.activeCtrlP()
  }

  componentWillUnmount() {
    this.muteCtrlP()
  }

  activeCtrlP = () => {
    if (!this.state.shouldPrintNow) {
      window.addEventListener('keydown', this.handleCtrlP, false)
    }
  }

  muteCtrlP = () => {
    window.removeEventListener('keydown', this.handleCtrlP, false)
  }

  handleCtrlP = event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
      this.togglePrintNow()
      event.preventDefault()
    }
  }

  togglePrintNow = () => {
    this.setState({ shouldPrintNow: !this.state.shouldPrintNow })
  }

  renderPrintButton = () => {
    const { className } = this.props

    return (
      <button className={`print-button ${className}`} onClick={this.togglePrintNow} onKeyPress={this.togglePrintNow}>
        <i className="fa fa-print" />
        <span>{'Print'}</span>
      </button>
    )
  }

  render() {
    const { shouldPrintNow } = this.state
    const { node } = this.props

    return (
      <Fragment>
        {shouldPrintNow && <Print node={node} onClose={this.togglePrintNow} />}
        {this.renderPrintButton()}
      </Fragment>
    )
  }
}

PrintButton.propTypes = {
  className: PropTypes.string.isRequired,
  node: PropTypes.element.isRequired,
}

export default PrintButton
