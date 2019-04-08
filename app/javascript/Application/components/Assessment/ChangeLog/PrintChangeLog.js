import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatClientName } from '../../Client'
import PrintChangeLogTable from './PrintChangeLogTable'
import { clientPropTypes } from './ChangeLogHelper'

class PrintChangeLog extends Component {
  renderHeader(client, assessmentId) {
    const formattedClientName = `Client: ${formatClientName(client)}`

    return (
      <div className="print-header">
        <h2 className="print-title">{'CANS Assessment Change Log'}</h2>
        <h3 className="print-client-name">{formattedClientName}</h3>
        <h3 className="print-assessment-id">{`Assessment ID: ${assessmentId}`}</h3>
      </div>
    )
  }

  render() {
    const { history, client, assessmentId } = this.props

    return history && history.length > 0 ? (
      <div className="print-change-log-table-wrapper">
        {this.renderHeader(client, assessmentId)}
        {<PrintChangeLogTable history={history} />}
      </div>
    ) : null
  }
}

PrintChangeLog.propTypes = {
  assessmentId: PropTypes.number,
  client: clientPropTypes.isRequired,
  history: PropTypes.array,
}

PrintChangeLog.defaultProps = {
  assessmentId: 0,
  history: [],
}

export default PrintChangeLog
