import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Print } from '../../Print'
import { buildButton } from '../PageHeaderButtonsBuilder'
import { eventBus } from '../../../util/eventBus'
import { UNSAVED_ASSESSMENT_VALIDATION_EVENT, ASSESSMENT_PRINT_EVENT } from '../../../util/constants'

class PrintButton extends Component {
  constructor(props) {
    super(props)
    this.state = { shouldPrintNow: false }
    this.togglePrintNow = this.togglePrintNow.bind(this)
  }

  componentDidMount() {
    eventBus.subscribe(ASSESSMENT_PRINT_EVENT, this.togglePrintNow)
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
    eventBus.post(UNSAVED_ASSESSMENT_VALIDATION_EVENT, ASSESSMENT_PRINT_EVENT)
  }

  togglePrintNow() {
    this.setState({ shouldPrintNow: !this.state.shouldPrintNow })
  }

  renderPrintButton = () => {
    const { isEnabled } = this.props

    return buildButton('Print', 'fa-print', this.onPrint, isEnabled)
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
