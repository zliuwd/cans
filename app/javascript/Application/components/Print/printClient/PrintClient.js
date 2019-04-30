import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Print } from '..'
import PrintClientInfo from './PrintClientInfo'
import PrintClientHistory from './PrintClientHistory'
import PrintClientAssessmentComparison from './PrintClientAssessmentComparison'
import { comparisonDataType, assessmentsHistoryDataType } from './PrintClientHelper'

class PrintClient extends PureComponent {
  createPrintNode = () => {
    const { client, printData } = this.props
    const assessments = printData.assessments
    return (
      <div>
        <PrintClientInfo client={client} />
        {assessments ? (
          <PrintClientHistory assessments={assessments} />
        ) : (
          <PrintClientAssessmentComparison comparisonData={printData} />
        )}
      </div>
    )
  }

  print = () => {
    return <Print id={'client-print'} node={this.createPrintNode()} onClose={this.props.onClose} />
  }

  render() {
    return <Fragment>{this.print()}</Fragment>
  }
}

PrintClient.propTypes = {
  client: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  printData: PropTypes.oneOfType([comparisonDataType, assessmentsHistoryDataType]),
}

PrintClient.defaultProps = {
  onClose: () => {},
  printData: undefined,
}

export default PrintClient
