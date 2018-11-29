import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatClientName } from '../../Client'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
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

  renderChangeLogTable(history) {
    const fontSize = '1.2rem'
    const textAlign = 'left'
    const columnWidths = ['30rem', '20rem', '20rem']

    return (
      <table className="print-change-log-table">
        <tr className="print-change-table-header">
          <th style={{ width: columnWidths[0], textAlign, fontSize }}>{'Date / Time Updated'}</th>
          <th style={{ width: columnWidths[1], textAlign, fontSize }}>{'Updated By'}</th>
          <th style={{ width: columnWidths[2], textAlign, fontSize }}>{'Change'}</th>
        </tr>
        {history.map((record, index) => {
          return (
            <tr className="print-change-log-row" key={index}>
              <td
                style={{
                  width: columnWidths[0],
                  fontSize,
                }}
              >
                {<ChangeLogDate original={record} />}
              </td>
              <td
                style={{
                  width: columnWidths[1],
                  fontSize,
                }}
              >
                {record.user_id}
              </td>
              <td
                style={{
                  width: columnWidths[2],
                  fontSize,
                }}
              >
                {<ChangeLogStatus original={record} />}
              </td>
            </tr>
          )
        })}
      </table>
    )
  }

  render() {
    const { history, client, assessmentId } = this.props
    return (
      <div className="print-change-log-table-wrapper">
        {this.renderHeader(client, assessmentId)}
        {this.renderChangeLogTable(history)}
      </div>
    )
  }
}

PrintChangeLog.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  client: clientPropTypes.isRequired,
  history: PropTypes.array.isRequired,
}

export default PrintChangeLog
