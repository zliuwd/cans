import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { DataGrid } from '@cwds/components'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import { AssessmentActionsEllipsis } from '../../Assessment/'
import { isoToLocalDate } from '../../../util/dateHelper'

// These column widths are finely tuned for a ~1200px screen
const COLUMN_WIDTHS = {
  DATE: 190,
  SOURCE_NUMBER: 250,
  COUNTY: 140,
  UPDATED: 170,
  UPDATED_BY: 260,
  ELLIPSIS: 35,
}

class ClientAssessmentHistoryTable extends React.Component {
  columnConfig = [
    {
      Header: 'Assessment Date',
      id: 'assessmentTableEventDate',
      Cell: ClientAssessmentHistoryTableLink,
      width: COLUMN_WIDTHS.DATE,
      className: 'text-center',
      headerClassName: 'text-center',
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
      className: 'text-center',
      headerClassName: 'text-center',
      accessor: 'service_source_ui_id',
    },
    {
      Header: 'County',
      id: 'assessmentTableCounty',
      Cell: ClientAssessmentHistoryTableCountyName,
      width: COLUMN_WIDTHS.COUNTY,
      className: 'text-center',
      headerClassName: 'text-center',
      accessor: assessment => {
        return assessment.county ? `${assessment.county.name}` : ''
      },
    },
    {
      Header: 'Last Updated',
      id: 'assessmentTableLastUpdated',
      Cell: ClientAssessmentHistoryTableDate,
      width: COLUMN_WIDTHS.UPDATED,
      className: 'text-center',
      headerClassName: 'text-center',
      accessor: assessment => {
        const { updated_timestamp: updatedTimestamp, created_timestamp: createdTimestamp } = assessment
        const timestamp = updatedTimestamp || createdTimestamp
        return timestamp
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
      className: 'text-center',
      headerClassName: 'text-center',
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
          status,
          metadata,
          updateAssessmentHistoryCallback,
          updated_timestamp: updatedTimestamp,
          created_timestamp: createdTimestamp,
        } = row.original
        const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
        return (
          <AssessmentActionsEllipsis
            inheritUrl={inheritUrl}
            clientId={person.identifier}
            assessmentId={assessmentId}
            assessmentStatus={status}
            date={formattedTimestamp}
            assessmentMetaData={metadata}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
          />
        )
      },
      width: COLUMN_WIDTHS.ELLIPSIS,
      className: 'text-center',
      headerClassName: 'text-center',
      sortable: false,
    },
  ]

  render() {
    const { assessments, navFrom, inheritUrl, userId, updateAssessmentHistoryCallback } = this.props
    const columnSort = [{ id: 'assessmentTableEventDate', desc: true }]
    const assessmentsLength = assessments.length
    const minRows = 0
    const defaultPageSize = 10
    const displayDataGridAfterNumAssessments = 3
    const numAssessmentsToRenderInDataGrid = assessmentsLength - displayDataGridAfterNumAssessments
    const showPagination = numAssessmentsToRenderInDataGrid > defaultPageSize
    const showDataGrid = assessmentsLength > displayDataGridAfterNumAssessments
    const assessmentsSubset = assessments.slice(displayDataGridAfterNumAssessments)
    const assessmentsSubsetWithNavFromAndCallback = assessmentsSubset.map(assessment => {
      return {
        navFrom,
        inheritUrl,
        userId,
        updateAssessmentHistoryCallback,
        ...assessment,
      }
    })

    return showDataGrid ? (
      <Row>
        <DataGrid
          data={assessmentsSubsetWithNavFromAndCallback}
          showPagination={showPagination}
          minRows={minRows}
          defaultPageSize={defaultPageSize}
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
  userId: PropTypes.string.isRequired,
}

export default ClientAssessmentHistoryTable
