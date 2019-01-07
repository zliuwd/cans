import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row, Col } from 'reactstrap'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
import ChangeLogName from './ChangeLogName'
import PrintChangeLog from './PrintChangeLog'
import { formatClientName } from '../../Client'
import { clientPropTypes, assessmentHistoryPropTypes } from './ChangeLogHelper'
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
    this.updatePrintButtonIfNeeded(prevProps.assessmentHistory)
  }

  componentWillUnmount() {
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
  }

  initHeaderButtons(enablePrintButton) {
    const { assessmentHistory, client, pageHeaderButtonsController } = this.props
    const assessmentId = assessmentHistory.length > 0 ? assessmentHistory[0].entity_id : 0
    const node = <PrintChangeLog history={assessmentHistory} client={client} assessmentId={assessmentId} />
    const leftButton = buildSearchClientsButton()
    const rightButton = <PrintButton node={node} isEnabled={enablePrintButton} />

    pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  updatePrintButtonIfNeeded(prevAssessmentHistory) {
    const { assessmentHistory } = this.props

    if (prevAssessmentHistory !== assessmentHistory) {
      const enablePrintButton = this.shouldPrintButtonBeEnabled()
      this.initHeaderButtons(enablePrintButton)
    }
  }

  shouldPrintButtonBeEnabled() {
    const { assessmentHistory } = this.props
    const assessmentHistoryLength = assessmentHistory.length

    return assessmentHistoryLength > 0
  }

  buildChangeLogTitle(client, assessmentHistory) {
    const clientName = formatClientName(client)
    const titleClientName = trimSafely(`CANS Change Log: ${clientName}`)
    const assessmentDate = assessmentHistory.length > 0 ? assessmentHistory[0].event_date : ''
    const formattedDate = assessmentDate ? isoToLocalDate(assessmentDate) : ''
    const titleAssessmentDate = trimSafely(`Assessment Date: ${formattedDate}`)
    const changeLogTitle = (
      <div>
        <span>{titleClientName}</span>
        <span>{titleAssessmentDate}</span>
      </div>
    )

    return changeLogTitle
  }

  render() {
    const { client, assessmentHistory } = this.props
    const assessmentHistoryLength = assessmentHistory.length
    const minRows = 0
    const defaultPageSize = 10
    const showPagination = assessmentHistoryLength > defaultPageSize

    return assessmentHistoryLength > 0 ? (
      <Row>
        <Col xs="12">
          <Card className="change-log-card">
            <CardHeader className="change-log-header">
              <CardTitle className="change-log-title">{this.buildChangeLogTitle(client, assessmentHistory)}</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 change-log-body">
              <DataGrid
                data={assessmentHistory}
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
  assessmentHistory: PropTypes.arrayOf(assessmentHistoryPropTypes),
  client: clientPropTypes.isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentChangeLog.defaultProps = {
  assessmentHistory: [],
}

export default AssessmentChangeLog
