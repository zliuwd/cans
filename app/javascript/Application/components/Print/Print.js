import React from 'react'
import PropTypes from 'prop-types'
import { print } from './PrintHelper'
import { printViewPreparation } from './enhancedPrint/ePrintHelper'
import { printAssessmentCss } from './printAssessmentCss'

import './style.sass'

const printFrameId = 'print-frame'

class Print extends React.Component {
  componentDidMount() {
    print(printFrameId, printViewPreparation(this.props.node, printAssessmentCss))
    this.props.onClose()
  }

  render() {
    return <iframe id={printFrameId} title={printFrameId} />
  }
}

Print.propTypes = {
  node: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

Print.defaultProps = {
  isTest: false,
}

export default Print
