import React from 'react'
import PropTypes from 'prop-types'
import { print, printViewPreparation } from './printUtil/PrintHelper'

const printFrameId = 'print-frame'

class Print extends React.Component {
  componentDidMount() {
    print(printFrameId, printViewPreparation(this.props.node))
    this.props.onClose()
  }

  render() {
    return (
      <iframe
        id={printFrameId}
        title={printFrameId}
        style={{ height: '100%', width: '100%' }}
        height="100%"
        width="100%"
      />
    )
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
