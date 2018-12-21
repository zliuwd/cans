import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row, Col } from 'reactstrap'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
import ChangeLogName from './ChangeLogName'
import PrintChangeLog from './PrintChangeLog'
import { formatClientName } from '../../Client'
import { clientPropTypes, changeHistoryPropTypes } from './ChangeLogHelper'
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
    this.updatePrintButtonIfNeeded(prevProps.assessmentWithHistory.changeHistory)
  }

  componentWillUnmount() {
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
  }

  initHeaderButtons(enablePrintButton) {
    const { assessmentWithHistory, client, pageHeaderButtonsController } = this.props

    const assessment = assessmentWithHistory.assessment ? assessmentWithHistory.assessment : {}
    const assessmentId = assessment.id ? assessment.id : 0
    const changeHistory = assessmentWithHistory.changeHistory ? assessmentWithHistory.changeHistory : []

    const node = <PrintChangeLog history={changeHistory} client={client} assessmentId={assessmentId} />
    const leftButton = buildSearchClientsButton()
    const rightButton = <PrintButton node={node} isEnabled={enablePrintButton} />

    pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  updatePrintButtonIfNeeded(prevChangeHistory) {
    const { assessmentWithHistory } = this.props
    const changeHistory = assessmentWithHistory.changeHistory ? assessmentWithHistory.changeHistory : []
    const changeHistoryUpdated = prevChangeHistory !== changeHistory

    if (changeHistoryUpdated) {
      const enablePrintButton = this.shouldPrintButtonBeEnabled()
      this.initHeaderButtons(enablePrintButton)
    }
  }

  shouldPrintButtonBeEnabled() {
    const { assessmentWithHistory } = this.props
    const changeHistory = assessmentWithHistory.changeHistory ? assessmentWithHistory.changeHistory : []
    const changeHistoryLength = changeHistory.length
    const enablePrintButton = changeHistoryLength > 0

    return enablePrintButton
  }

  buildChangeLogTitle(client, assessment) {
    const clientName = formatClientName(client)
    const titleClientName = trimSafely(`CANS Change Log: ${clientName}`)
    const assessmentDate = assessment.event_date
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
    const { client } = this.props
    const assessmentWithHistory = this.props.assessmentWithHistory ? this.props.assessmentWithHistory : {}
    const assessment = assessmentWithHistory.assessment ? assessmentWithHistory.assessment : null
    const changeHistory = assessmentWithHistory.changeHistory ? assessmentWithHistory.changeHistory : []
    const changeHistoryLength = changeHistory.length

    const minRows = 0
    const defaultPageSize = 10
    const showPagination = changeHistoryLength > defaultPageSize

    return assessment && changeHistoryLength > 0 ? (
      <Row>
        <Col xs="12">
          <Card className="change-log-card">
            <CardHeader className="change-log-header">
              <CardTitle className="change-log-title">{this.buildChangeLogTitle(client, assessment)}</CardTitle>
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
  assessmentWithHistory: PropTypes.shape({
    changeHistory: PropTypes.arrayOf(changeHistoryPropTypes),
    assessment: PropTypes.object,
  }),
  client: clientPropTypes.isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentChangeLog.defaultProps = {
  assessmentWithHistory: {},
}

export default AssessmentChangeLog
