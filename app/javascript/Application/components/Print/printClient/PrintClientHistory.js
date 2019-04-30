import React, { PureComponent } from 'react'
import { header, container } from '../PrintStyles'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../../util/dateHelper'
import { composeUpdatedByName } from './PrintClientHelper'

class PrintClientHistory extends PureComponent {
  renderHistoryTable = assessments => {
    return (
      <div style={container} id={'print-client-history-table'}>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Assessment Date</th>
              <th>Case/Referral Number</th>
              <th>County</th>
              <th>Last Updated</th>
              <th>Updated By</th>
            </tr>
          </thead>
          {assessments.map((item, index) => this.renderTableRow(item, index))}
        </table>
      </div>
    )
  }

  renderTableRow = (assessment, index) => {
    return (
      <tr key={`row-${index}`}>
        <td>{assessment.status.split('_').join(' ')}</td>
        <td>{assessment.event_date}</td>
        <td>{assessment.service_source_ui_id}</td>
        <td>{assessment.county ? assessment.county.name : ''}</td>
        <td>{isoToLocalDate(assessment.updated_timestamp || assessment.created_timestamp)}</td>
        <td>{composeUpdatedByName(assessment)}</td>
      </tr>
    )
  }

  render = () => {
    return (
      <div id={'print-client-history'} style={container}>
        <div id={'print-client-history-header'} style={header}>
          Assessment History
        </div>
        {this.renderHistoryTable(this.props.assessments)}
      </div>
    )
  }
}

PrintClientHistory.propTypes = {
  assessments: PropTypes.array.isRequired,
}

export default PrintClientHistory
