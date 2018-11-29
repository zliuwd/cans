import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
import ChangeLogName from './ChangeLogName'
import { Row, Col } from 'reactstrap'
import PrintButton from '../../common/PrintButton'
import PrintChangeLog from './PrintChangeLog'
import { formatClientName } from '../../Client'
import { clientPropTypes, changeHistoryPropType } from './ChangeLogHelper'
import moment from 'moment'
import { trimSafely } from '../../../util/formatters'

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

const AssessmentChangeLog = ({ client, match, changeHistory }) => {
  const changeHistoryLength = changeHistory.length
  const pageSize = changeHistoryLength > 9 ? 10 : changeHistoryLength
  const clientDob = client.dob
    ? moment(client.dob)
        .utcOffset(0)
        .format('MM/DD/YYYY')
    : ''
  const title = `CANS Change Log: ${formatClientName(client)} ${clientDob}`
  const showPagination = changeHistoryLength > 10

  return changeHistoryLength > 0 ? (
    <Fragment>
      <Row>
        <Col xs="12">
          <PrintButton
            className={'change-log-print-button'}
            node={<PrintChangeLog history={changeHistory} client={client} assessmentId={match.params.id} />}
          />
        </Col>
      </Row>
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
                defaultPageSize={pageSize}
                columns={columnConfig}
                className="assessment-change-log"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  ) : null
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
}

AssessmentChangeLog.defaultProps = {
  changeHistory: [],
}

export default AssessmentChangeLog
