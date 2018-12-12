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

const columnWidths = [190, 250, 140, 170, 270, 25]
const columnConfig = [
  {
    Header: 'Assessment Date',
    Cell: ClientAssessmentHistoryTableLink,
    width: columnWidths[0],
  },
  {
    Header: 'Case Number',
    Cell: ClientAssessmentHistoryTableCaseNumber,
    width: columnWidths[1],
  },
  {
    Header: 'County',
    Cell: ClientAssessmentHistoryTableCountyName,
    width: columnWidths[2],
  },
  {
    Header: 'Last Updated',
    Cell: ClientAssessmentHistoryTableDate,
    width: columnWidths[3],
  },
  {
    Header: 'Updated By',
    Cell: ClientAssessmentHistoryTableUpdatedBy,
    width: columnWidths[4],
  },
  {
    Header: '',
    Cell: ClientAssessmentHistoryTableEllipsis,
    width: columnWidths[5],
  },
]

const ClientAssessmentHistoryTable = ({ assessments }) => {
  const assessmentsLength = assessments.length
  const minRows = 0
  const defaultPageSize = 10
  const displayDataGridAfterNumAssessments = 3
  const numAssessmentsToRenderInDataGrid = assessmentsLength - displayDataGridAfterNumAssessments
  const showPagination = numAssessmentsToRenderInDataGrid > defaultPageSize
  const showDataGrid = assessmentsLength > displayDataGridAfterNumAssessments
  const startPos = 3
  const assessmentsSubset = assessments.slice(startPos)

  return showDataGrid ? (
    <Row>
      <DataGrid
        data={assessmentsSubset}
        showPagination={showPagination}
        minRows={minRows}
        defaultPageSize={defaultPageSize}
        columns={columnConfig}
        className={'data-grid-client-asssessment-history'}
      />
    </Row>
  ) : null
}

ClientAssessmentHistoryTable.propTypes = {
  assessments: PropTypes.array.isRequired,
}

export default ClientAssessmentHistoryTable
