import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Print } from '../../Print'
import { buildButton } from '../PageHeaderButtonsBuilder'
import pageLockService from './../../common/PageLockService'

class PrintButton extends Component {
  constructor(props) {
    super(props)
    this.state = { shouldPrintNow: false }
    this.togglePrintNow = this.togglePrintNow.bind(this)
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
      this.onPrint()
      event.preventDefault()
    }
  }

  onPrint = () => {
    pageLockService.confirm(this.togglePrintNow)
  }

  togglePrintNow() {
    this.setState({ shouldPrintNow: !this.state.shouldPrintNow })
  }

  renderPrintButton = () => {
    const { isEnabled } = this.props

    return buildButton('Print', null, this.onPrint, isEnabled)
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
  isEnabled: PropTypes.bool.isRequired,
  node: PropTypes.node.isRequired,
}

export default PrintButton
