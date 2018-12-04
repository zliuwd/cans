import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row, Col } from 'reactstrap'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
import ChangeLogName from './ChangeLogName'
import PrintChangeLog from './PrintChangeLog'
import { formatClientName } from '../../Client'
import { clientPropTypes, changeHistoryPropType } from './ChangeLogHelper'
import { trimSafely } from '../../../util/formatters'
import { isoToLocalDate } from '../../../util/dateHelper'
import { buildSearchClientsButton } from '../../Header/PageHeaderButtonsBuilder'
import PrintButton from '../../Header/PageHeaderButtons/PrintButton'

const columnConfig = [
  {
    Header: 'Date / Time Updated',
    accessor: 'changed_at',
    Cell: ChangeLogDate,
  },
  {
    Header: 'Updated By',
    accessor: 'user_id',
    Cell: ChangeLogName,
  },
  {
    Header: 'Change',
    accessor: 'assessment_change_type',
    Cell: ChangeLogStatus,
  },
]

class AssessmentChangeLog extends Component {
  componentDidMount() {
    const enablePrintButton = this.shouldPrintButtonBeEnabled()
    this.initHeaderButtons(enablePrintButton)
  }

  componentDidUpdate(prevProps) {
    const { changeHistory: prevChangeHistory } = prevProps
    this.updatePrintButtonIfNeeded(prevChangeHistory)
  }

  componentWillUnmount() {
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
  }

  initHeaderButtons(enablePrintButton) {
    const { changeHistory, client, match } = this.props
    const node = <PrintChangeLog history={changeHistory} client={client} assessmentId={match.params.id} />
    const leftButton = buildSearchClientsButton()
    const rightButton = <PrintButton node={node} isEnabled={enablePrintButton} />

    this.props.pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  updatePrintButtonIfNeeded(prevChangeHistory) {
    const { changeHistory } = this.props
    const changeHistoryUpdated = prevChangeHistory !== changeHistory
    if (changeHistoryUpdated) {
      const enablePrintButton = this.shouldPrintButtonBeEnabled()
      this.initHeaderButtons(enablePrintButton)
    }
  }

  shouldPrintButtonBeEnabled() {
    const { changeHistory } = this.props
    const changeHistoryLength = changeHistory.length
    const enablePrintButton = changeHistoryLength > 0

    return enablePrintButton
  }

  render() {
    const { client, changeHistory } = this.props
    const changeHistoryLength = changeHistory.length
    const minRows = 0
    const defaultPageSize = 10

    const clientDob = client.dob ? isoToLocalDate(client.dob) : ''
    const title = `CANS Change Log: ${formatClientName(client)} ${clientDob}`
    const showPagination = changeHistoryLength > defaultPageSize

    return changeHistoryLength > 0 ? (
      <Row>
        <Col xs="12">
          <Card className="change-log-card">
            <CardHeader className="change-log-header">
              <CardTitle className="change-log-title">{trimSafely(title)}</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 change-log-body">
              <DataGrid
                data={changeHistory}
                showPagination={showPagination}
                minRows={minRows}
                defaultPageSize={defaultPageSize}
                columns={columnConfig}
                className="assessment-change-log"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    ) : null
  }
}

AssessmentChangeLog.propTypes = {
  changeHistory: PropTypes.arrayOf(changeHistoryPropType),
  client: clientPropTypes.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentChangeLog.defaultProps = {
  changeHistory: [],
}

export default AssessmentChangeLog
