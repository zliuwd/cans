import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { DataGrid } from '@cwds/components'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'

const columnWidths = [0, 190, 250, 140, 170, 260, 35]
const columnConfig = [
  {
    Header: '',
    id: 'assessmentTableCreatedDate',
    width: columnWidths[0],
    accessor: 'created_timestamp',
    show: false,
  },
  {
    Header: 'Assessment Date',
    id: 'assessmentTableEventDate',
    Cell: ClientAssessmentHistoryTableLink,
    width: columnWidths[1],
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
    width: columnWidths[2],
    className: 'text-center',
    headerClassName: 'text-center',
    accessor: 'service_source_ui_id',
  },
  {
    Header: 'County',
    id: 'assessmentTableCounty',
    Cell: ClientAssessmentHistoryTableCountyName,
    width: columnWidths[3],
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
    width: columnWidths[4],
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
    width: columnWidths[5],
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
    Cell: ClientAssessmentHistoryTableEllipsis,
    width: columnWidths[6],
    className: 'text-center',
    headerClassName: 'text-center',
    sortable: false,
  },
]

const ClientAssessmentHistoryTable = props => {
  const { assessments, navFrom, inheritUrl, userId, updateAssessmentHistoryCallback } = props
  const columnSort = [{ id: 'assessmentTableEventDate', desc: true }, { id: 'assessmentTableCreatedDate', desc: true }]
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
        columns={columnConfig}
        className={'data-grid-client-assessment-history'}
        defaultSorted={columnSort}
      />
    </Row>
  ) : null
}

ClientAssessmentHistoryTable.propTypes = {
  assessments: PropTypes.array.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default ClientAssessmentHistoryTable
