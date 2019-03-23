import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Print } from '../../Print'
import { buildButton } from '../PageHeaderButtonsBuilder'
import pageLockService from './../../common/PageLockService'

let self

class PrintButton extends Component {
  constructor(props) {
    super(props)
    this.state = { shouldPrintNow: false }
    self = this
  }

  componentDidMount = () => {
    this.activeCtrlP()
  }

  componentWillUnmount = () => {
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
    pageLockService.confirm(this.togglePrintNow, { isDiscardDisabled: this.props.assessmentId === undefined })
  }

  togglePrintNow = () => {
    self.setState(prevState => ({ shouldPrintNow: !prevState.shouldPrintNow }))
  }

  renderPrintButton = () => {
    const { isEnabled } = this.props

    return buildButton('Print', null, this.onPrint, isEnabled)
  }

  render = () => {
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
  assessmentId: PropTypes.number,
  isEnabled: PropTypes.bool.isRequired,
  node: PropTypes.node.isRequired,
}

PrintButton.defaultProps = {
  assessmentId: undefined,
}

export default PrintButton
