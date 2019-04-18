import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableStatus from './ClientAssessmentHistoryTableStatus'
import { AssessmentActionsEllipsis } from '../../Assessment/'
import { isoToLocalDate } from '../../../util/dateHelper'
import { COLUMN_WIDTHS } from './AssessmentHistoryTableHelper'
import { ASSESSMENT_HISTORY_PAGE_SIZE_KEY } from '../../../util/sessionStorageUtil'
import { PAGE_SIZES } from '../../../util/DataGridHelper'
import SessionDataGrid from '../../common/SessionDataGrid'

const commonStyle = { className: 'text-center', headerClassName: 'text-center' }

class ClientAssessmentHistoryTable extends React.Component {
  columnConfig = [
    {
      Header: 'Status',
      id: 'assessmentTableStatus',
      Cell: ClientAssessmentHistoryTableStatus,
      width: COLUMN_WIDTHS.STATUS,
      accessor: 'status',
      ...commonStyle,
    },
    {
      Header: 'Assessment Date',
      id: 'assessmentTableEventDate',
      Cell: ClientAssessmentHistoryTableLink,
      width: COLUMN_WIDTHS.DATE,
      ...commonStyle,
      accessor: assessment => assessment,
      sortMethod: (a, b) => {
        const eventDateA = new Date(a.event_date).getTime()
        const eventDateB = new Date(b.event_date).getTime()
        if (eventDateA - eventDateB === 0) {
          const createdDateA = new Date(a.created_timestamp).getTime()
          const createdDateB = new Date(b.created_timestamp).getTime()
          return createdDateA > createdDateB ? 1 : -1
        }
        return eventDateA > eventDateB ? 1 : -1
      },
    },
    {
      Header: 'Case/Referral Number',
      Cell: ClientAssessmentHistoryTableCaseNumber,
      width: COLUMN_WIDTHS.SOURCE_NUMBER,
      ...commonStyle,
      accessor: 'service_source_ui_id',
    },
    {
      Header: 'County',
      id: 'assessmentTableCounty',
      Cell: ClientAssessmentHistoryTableCountyName,
      width: COLUMN_WIDTHS.COUNTY,
      ...commonStyle,
      accessor: assessment => {
        return assessment.county ? `${assessment.county.name}` : ''
      },
    },
    {
      Header: 'Last Updated',
      id: 'assessmentTableLastUpdated',
      Cell: ClientAssessmentHistoryTableDate,
      width: COLUMN_WIDTHS.UPDATED,
      ...commonStyle,
      accessor: assessment => {
        const { updated_timestamp: updatedTimestamp, created_timestamp: createdTimestamp } = assessment
        return updatedTimestamp || createdTimestamp
      },
      sortMethod: (a, b) => {
        const dateA = new Date(a).getTime()
        const dateB = new Date(b).getTime()
        return dateA > dateB ? 1 : -1
      },
    },
    {
      Header: 'Updated By',
      id: 'assessmentTableUpdatedBy',
      Cell: ClientAssessmentHistoryTableUpdatedBy,
      width: COLUMN_WIDTHS.UPDATED_BY,
      ...commonStyle,
      accessor: assessment => {
        const { updated_by: updatedBy, created_by: createdBy } = assessment
        const user = updatedBy || createdBy
        return `${user.first_name} ${user.last_name}`
      },
    },
    {
      Header: '',
      Cell: row => {
        const {
          inheritUrl,
          person,
          id: assessmentId,
          county,
          status,
          metadata,
          updateAssessmentHistoryCallback,
          assessmentDate,
        } = row.original
        const formattedTimestamp = isoToLocalDate(assessmentDate)
        return (
          <AssessmentActionsEllipsis
            inheritUrl={inheritUrl}
            clientId={person.identifier}
            assessmentCounty={county ? county.name : ''}
            assessmentId={assessmentId}
            assessmentStatus={status}
            date={formattedTimestamp}
            assessmentMetaData={metadata}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
          />
        )
      },
      width: COLUMN_WIDTHS.ELLIPSIS,
      ...commonStyle,
      sortable: false,
    },
  ]

  render() {
    const { assessments, navFrom, inheritUrl, userId, updateAssessmentHistoryCallback } = this.props
    const columnSort = [{ id: 'assessmentTableEventDate', desc: true }]
    const assessmentsLength = assessments.length
    const minRows = 0
    const displayDataGridAfterNumAssessments = 3
    const numAssessmentsToRenderInDataGrid = assessmentsLength - displayDataGridAfterNumAssessments
    const showPagination = numAssessmentsToRenderInDataGrid > PAGE_SIZES[0]
    const showDataGrid = assessmentsLength > displayDataGridAfterNumAssessments
    const assessmentsSubset = assessments.slice(displayDataGridAfterNumAssessments)
    const assessmentsSubsetWithNavFromAndCallback = assessmentsSubset.map(assessment => {
      return {
        navFrom,
        inheritUrl,
        userId,
        updateAssessmentHistoryCallback,
        assessmentDate: assessment.event_date,
        ...assessment,
      }
    })

    return showDataGrid ? (
      <Row>
        <SessionDataGrid
          data={assessmentsSubsetWithNavFromAndCallback}
          showPagination={showPagination}
          minRows={minRows}
          pageSizeSessionKey={ASSESSMENT_HISTORY_PAGE_SIZE_KEY}
          pageSizeOptions={PAGE_SIZES}
          columns={this.columnConfig}
          className={'data-grid-client-assessment-history'}
          defaultSorted={columnSort}
        />
      </Row>
    ) : null
  }
}

ClientAssessmentHistoryTable.propTypes = {
  assessments: PropTypes.array.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentHistoryTable.defaultProps = {
  userId: null,
}

export default ClientAssessmentHistoryTable
