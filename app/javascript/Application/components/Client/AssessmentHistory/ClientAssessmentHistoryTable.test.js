import React from 'react'
import { shallow } from 'enzyme'
import { Row } from 'reactstrap'
import { DataGrid } from '@cwds/components'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { navigation } from '../../../util/constants'

const defaultMockedAssessments = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
]

const shallowWrapper = assessments =>
  shallow(
    <ClientAssessmentHistoryTable
      assessments={assessments}
      navFrom={navigation.CHILD_PROFILE}
      userId={'1'}
      inheritUrl={'clients/AdE0PWu0X5'}
    />
  )

describe('<ClientAssessmentHistoryTable />', () => {
  describe('layout', () => {
    describe('when there are more than 3 assessments', () => {
      it('renders a <DataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper(defaultMockedAssessments)
        expect(wrapper.find(Row).find(DataGrid).length).toBe(1)
      })
    })

    describe('when there is 1 assessment', () => {
      it('does not render a <DataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper([{ id: 1 }])
        expect(wrapper.find(Row).find(DataGrid).length).toBe(0)
        expect(wrapper.type()).toBe(null)
      })
    })

    describe('when there are 0 assessments', () => {
      it('does not render a <DataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper([])
        expect(wrapper.find(Row).find(DataGrid).length).toBe(0)
        expect(wrapper.type()).toBe(null)
      })
    })
  })

  describe('DataGrid Props', () => {
    let dataGrid

    beforeEach(() => {
      const wrapper = shallowWrapper(defaultMockedAssessments)
      dataGrid = wrapper.find(DataGrid)
    })

    describe('Data', () => {
      it('sets data to the correct number of assessments', () => {
        const data = dataGrid.props().data
        expect(data.length).toBe(7)
        expect(data).toEqual([
          { id: 4, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 5, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 6, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 7, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 8, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 9, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
          { id: 10, inheritUrl: 'clients/AdE0PWu0X5', navFrom: 'CHILD_PROFILE_OVERALL', userId: '1' },
        ])
      })
    })

    describe('Min Rows', () => {
      it('sets the minRows to 0', () => {
        expect(dataGrid.props().minRows).toBe(0)
      })
    })

    describe('Default Page Size', () => {
      it('sets the defaultPageSize to 10', () => {
        expect(dataGrid.props().defaultPageSize).toBe(10)
      })
    })

    describe('Class Name', () => {
      it('sets the correct className', () => {
        expect(dataGrid.props().className).toBe('data-grid-client-assessment-history')
      })
    })

    describe('Default Sorted', () => {
      it('sets the default sorted column to the assessment date', () => {
        expect(dataGrid.props().defaultSorted).toEqual([{ id: 'assessmentTableDate', desc: true }])
      })
    })

    describe('Show Pagination', () => {
      describe('when there are 10 or less assessments', () => {
        it('sets showPagination to false', () => {
          expect(dataGrid.props().showPagination).toBe(false)
        })
      })

      describe('when there are more than 10 assessments', () => {
        it('sets showPagination prop to true', () => {
          const mockedAssessments = defaultMockedAssessments.concat([{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }])
          const wrapper = shallowWrapper(mockedAssessments)
          const dataGrid = wrapper.find(DataGrid)
          expect(dataGrid.props().showPagination).toBe(true)
        })
      })
    })

    describe('Column Config', () => {
      describe('Assessment Date', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[0]
          expect(assessmentDateColumnConfig.Header).toBe('Assessment Date')
          expect(assessmentDateColumnConfig.id).toBe('assessmentTableDate')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableLink)
          expect(assessmentDateColumnConfig.width).toEqual(190)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentDateColumnConfig.accessor).toBe('event_date')
        })
      })

      describe('Case/Referral Number', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[1]
          expect(assessmentDateColumnConfig.Header).toBe('Case/Referral Number')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableCaseNumber)
          expect(assessmentDateColumnConfig.width).toEqual(250)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentDateColumnConfig.accessor).toBe('service_source_ui_id')
        })
      })

      describe('County', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[2]
          expect(assessmentDateColumnConfig.Header).toBe('County')
          expect(assessmentDateColumnConfig.id).toBe('assessmentTableCounty')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableCountyName)
          expect(assessmentDateColumnConfig.width).toEqual(140)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentDateColumnConfig.accessor({ county: { name: 'Yolo' } })).toBe('Yolo')
        })
      })

      describe('Last Updated', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[3]
          expect(assessmentDateColumnConfig.Header).toBe('Last Updated')
          expect(assessmentDateColumnConfig.id).toBe('assessmentTableLastUpdated')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableDate)
          expect(assessmentDateColumnConfig.width).toEqual(170)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(
            assessmentDateColumnConfig.accessor({
              updated_timestamp: '2018-12-17T23:27:44.616Z',
              created_timestamp: '2018-05-10T23:27:44.616Z',
            })
          ).toBe('2018-12-17T23:27:44.616Z')
          expect(
            assessmentDateColumnConfig.accessor({
              created_timestamp: '2018-05-10T23:27:44.616Z',
            })
          ).toBe('2018-05-10T23:27:44.616Z')
        })
      })

      describe('Updated By', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[4]
          expect(assessmentDateColumnConfig.Header).toBe('Updated By')
          expect(assessmentDateColumnConfig.id).toBe('assessmentTableUpdatedBy')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableUpdatedBy)
          expect(assessmentDateColumnConfig.width).toEqual(260)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(
            assessmentDateColumnConfig.accessor({
              updated_by: { first_name: 'Casey', last_name: 'Test' },
              created_by: { first_name: 'Annie', last_name: 'Doe' },
            })
          ).toBe('Casey Test')
          expect(
            assessmentDateColumnConfig.accessor({
              created_by: { first_name: 'Annie', last_name: 'Doe' },
            })
          ).toBe('Annie Doe')
        })
      })

      describe('Ellipsis', () => {
        it('passes the correct column config', () => {
          const assessmentDateColumnConfig = dataGrid.props().columns[5]
          expect(assessmentDateColumnConfig.Header).toBe('')
          expect(assessmentDateColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableEllipsis)
          expect(assessmentDateColumnConfig.width).toEqual(35)
          expect(assessmentDateColumnConfig.className).toBe('text-center')
          expect(assessmentDateColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentDateColumnConfig.sortable).toBe(false)
        })
      })
    })
  })
})
