import React from 'react'
import { shallow } from 'enzyme'
import { Row } from 'reactstrap'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableStatus from './ClientAssessmentHistoryTableStatus'
import { navigation } from '../../../util/constants'
import { AssessmentStatus, AssessmentActionsEllipsis } from '../../Assessment'
import SessionDataGrid from '../../common/SessionDataGrid'
import { ASSESSMENT_HISTORY_PAGE_SIZE_KEY } from '../../../util/sessionStorageUtil'
import { isoToLocalDate } from '../../../util/dateHelper'
import { assessmentInProgressWithCaseNumber } from '../../Assessment/assessment.mocks.test'

const defaultMockedAssessments = [
  { id: 1, county: { name: 'Los Angeles' } },
  { id: 2, county: { name: 'Los Angeles' } },
  { id: 3, county: { name: 'Los Angeles' } },
  { id: 4, county: { name: 'Los Angeles' } },
  { id: 5, county: { name: 'Los Angeles' } },
  { id: 6, county: { name: 'Los Angeles' } },
  { id: 7, county: { name: 'Los Angeles' } },
  { id: 8, county: { name: 'Los Angeles' } },
  { id: 9, county: { name: 'Los Angeles' } },
  { id: 10, county: { name: 'Los Angeles' } },
]

const updateAssessmentHistoryCallback = () => {}

const shallowWrapper = assessments =>
  shallow(
    <ClientAssessmentHistoryTable
      assessments={assessments}
      navFrom={navigation.CHILD_PROFILE}
      userId={'1'}
      inheritUrl={'clients/AdE0PWu0X5'}
      updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
    />
  )

describe('<ClientAssessmentHistoryTable />', () => {
  describe('layout', () => {
    describe('when there are more than 3 assessments', () => {
      it('renders a <SessionDataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper(defaultMockedAssessments)
        expect(wrapper.find(Row).find(SessionDataGrid).length).toBe(1)
      })
    })

    describe('when there is 1 assessment', () => {
      it('does not render a <SessionDataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper([{ id: 1 }])
        expect(wrapper.find(Row).find(SessionDataGrid).length).toBe(0)
        expect(wrapper.type()).toBe(null)
      })
    })

    describe('when there are 0 assessments', () => {
      it('does not render a <SessionDataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper([])
        expect(wrapper.find(Row).find(SessionDataGrid).length).toBe(0)
        expect(wrapper.type()).toBe(null)
      })
    })
  })

  describe('SessionDataGrid Props', () => {
    let dataGrid

    beforeEach(() => {
      const wrapper = shallowWrapper(defaultMockedAssessments)
      dataGrid = wrapper.find(SessionDataGrid)
    })

    it('should set pageSizeSessionKey props for SessionDataGrid', () => {
      expect(dataGrid.props().pageSizeSessionKey).toBe(ASSESSMENT_HISTORY_PAGE_SIZE_KEY)
    })

    describe('Data', () => {
      it('sets data prop to the correct number of assessments', () => {
        const data = dataGrid.props().data
        expect(data.length).toBe(7)
        expect(data).toEqual([
          {
            id: 4,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 5,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 6,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 7,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 8,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 9,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
          {
            id: 10,
            county: { name: 'Los Angeles' },
            inheritUrl: 'clients/AdE0PWu0X5',
            navFrom: 'CHILD_PROFILE_OVERALL',
            userId: '1',
            updateAssessmentHistoryCallback,
          },
        ])
      })
    })

    describe('Min Rows', () => {
      it('sets the minRows to 0', () => {
        expect(dataGrid.props().minRows).toBe(0)
      })
    })

    describe('Class Name', () => {
      it('sets the correct className', () => {
        expect(dataGrid.props().className).toBe('data-grid-client-assessment-history')
      })
    })

    describe('Default Sorted', () => {
      it('sets the default sorted column to the assessment date', () => {
        expect(dataGrid.props().defaultSorted).toEqual([{ id: 'assessmentTableEventDate', desc: true }])
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
          const dataGrid = wrapper.find(SessionDataGrid)
          expect(dataGrid.props().showPagination).toBe(true)
        })
      })
    })

    describe('Column Config', () => {
      describe('Status', () => {
        it('passes the correct column config', () => {
          const assessmentTableColumnConfig = dataGrid.props().columns[0]
          expect(assessmentTableColumnConfig.Header).toBe('Status')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableStatus)
          expect(assessmentTableColumnConfig.width).toEqual(80)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentTableColumnConfig.accessor).toBe('status')
        })
      })

      describe('Assessment Date', () => {
        it('passes the correct column config', () => {
          const assessmentA = { id: 1, event_date: '2019-01-06' }

          const assessmentTableColumnConfig = dataGrid.props().columns[1]
          expect(assessmentTableColumnConfig.Header).toBe('Assessment Date')
          expect(assessmentTableColumnConfig.id).toBe('assessmentTableEventDate')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableLink)
          expect(assessmentTableColumnConfig.width).toEqual(170)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentTableColumnConfig.accessor(assessmentA)).toBe(assessmentA)
        })

        describe('sort method', () => {
          describe('events dates are different', () => {
            describe('assessment date A is more recent than assessment date B', () => {
              it('sorts assessment A before assessment B', () => {
                const assessmentA = { id: 1, event_date: '2019-01-06' }
                const assessmentB = { id: 2, event_date: '2019-01-05' }
                const assessmentTableColumnConfig = dataGrid.props().columns[1]
                expect(assessmentTableColumnConfig.sortMethod(assessmentA, assessmentB)).toBe(1)
              })
            })

            describe('assessment date A is less recent than assessment date B', () => {
              it('sorts assessment B before assessment A', () => {
                const assessmentA = { id: 1, event_date: '2019-01-06' }
                const assessmentB = { id: 2, event_date: '2019-01-07' }
                const assessmentTableColumnConfig = dataGrid.props().columns[1]
                expect(assessmentTableColumnConfig.sortMethod(assessmentA, assessmentB)).toBe(-1)
              })
            })
          })

          describe('events dates are equal', () => {
            describe('created date A is more recent than created date B', () => {
              it('sorts assessment A before assessment B', () => {
                const assessmentA = {
                  id: 1,
                  event_date: '2019-01-06',
                  created_timestamp: '2019-01-06T03:36:37.552Z',
                }
                const assessmentB = {
                  id: 2,
                  event_date: '2019-01-06',
                  created_timestamp: '2019-01-05T03:36:37.552Z',
                }
                const assessmentTableColumnConfig = dataGrid.props().columns[1]
                expect(assessmentTableColumnConfig.sortMethod(assessmentA, assessmentB)).toBe(1)
              })
            })

            describe('created date A is less recent than created date B', () => {
              it('sorts assessment B before assessment A', () => {
                const assessmentA = {
                  id: 1,
                  event_date: '2019-01-06',
                  created_timestamp: '2019-01-06T03:36:37.552Z',
                }
                const assessmentB = {
                  id: 2,
                  event_date: '2019-01-06',
                  created_timestamp: '2019-01-07T03:36:37.552Z',
                }
                const assessmentTableColumnConfig = dataGrid.props().columns[1]
                expect(assessmentTableColumnConfig.sortMethod(assessmentA, assessmentB)).toBe(-1)
              })
            })
          })
        })
      })

      describe('Case/Referral Number', () => {
        it('passes the correct column config', () => {
          const assessmentTableColumnConfig = dataGrid.props().columns[2]
          expect(assessmentTableColumnConfig.Header).toBe('Case/Referral Number')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableCaseNumber)
          expect(assessmentTableColumnConfig.width).toEqual(250)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentTableColumnConfig.accessor).toBe('service_source_ui_id')
        })
      })

      describe('County', () => {
        it('passes the correct column config', () => {
          const assessmentTableColumnConfig = dataGrid.props().columns[3]
          expect(assessmentTableColumnConfig.Header).toBe('County')
          expect(assessmentTableColumnConfig.id).toBe('assessmentTableCounty')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableCountyName)
          expect(assessmentTableColumnConfig.width).toEqual(120)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentTableColumnConfig.accessor({ county: { name: 'Yolo' } })).toBe('Yolo')
        })
      })

      describe('Last Updated', () => {
        it('passes the correct column config', () => {
          const assessmentTableColumnConfig = dataGrid.props().columns[4]
          expect(assessmentTableColumnConfig.Header).toBe('Last Updated')
          expect(assessmentTableColumnConfig.id).toBe('assessmentTableLastUpdated')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableDate)
          expect(assessmentTableColumnConfig.width).toEqual(150)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(
            assessmentTableColumnConfig.accessor({
              updated_timestamp: '2018-12-17T23:27:44.616Z',
              created_timestamp: '2018-05-10T23:27:44.616Z',
            })
          ).toBe('2018-12-17T23:27:44.616Z')
          expect(
            assessmentTableColumnConfig.accessor({
              updated_timestamp: '2018-05-09T23:27:44.616Z',
            })
          ).toBe('2018-05-09T23:27:44.616Z')
          expect(
            assessmentTableColumnConfig.accessor({
              created_timestamp: '2018-05-10T23:27:44.616Z',
            })
          ).toBe('2018-05-10T23:27:44.616Z')
        })

        describe('sort method', () => {
          describe('date A is more recent than date B', () => {
            it('sorts date A before date B', () => {
              const dateA = '2018-12-17T23:27:44.616Z'
              const dateB = '2018-12-16T23:27:44.616Z'
              const assessmentTableColumnConfig = dataGrid.props().columns[4]

              expect(assessmentTableColumnConfig.sortMethod(dateA, dateB)).toBe(1)
            })
          })

          describe('date A is less recent than date B', () => {
            it('sorts date B before date A', () => {
              const dateA = '2018-12-15T23:27:44.616Z'
              const dateB = '2018-12-16T23:27:44.616Z'
              const assessmentTableColumnConfig = dataGrid.props().columns[4]

              expect(assessmentTableColumnConfig.sortMethod(dateA, dateB)).toBe(-1)
            })
          })
        })
      })

      describe('Updated By', () => {
        it('passes the correct column config', () => {
          const assessmentTableColumnConfig = dataGrid.props().columns[5]
          expect(assessmentTableColumnConfig.Header).toBe('Updated By')
          expect(assessmentTableColumnConfig.id).toBe('assessmentTableUpdatedBy')
          expect(assessmentTableColumnConfig.Cell).toEqual(ClientAssessmentHistoryTableUpdatedBy)
          expect(assessmentTableColumnConfig.width).toEqual(220)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(
            assessmentTableColumnConfig.accessor({
              updated_by: { first_name: 'Casey', last_name: 'Test' },
              created_by: { first_name: 'Annie', last_name: 'Doe' },
            })
          ).toBe('Casey Test')
          expect(
            assessmentTableColumnConfig.accessor({
              created_by: { first_name: 'Annie', last_name: 'Doe' },
            })
          ).toBe('Annie Doe')
        })
      })

      describe('AssessmentActionsEllipsis', () => {
        it('passes the correct column config', () => {
          const row = {
            original: {
              inheritUrl: '/staff/0X5',
              person: { identifier: '0PcpFQu0QM' },
              county: { name: 'Los Angeles' },
              id: 12345,
              status: AssessmentStatus.completed,
              assessmentDate: assessmentInProgressWithCaseNumber.event_date,
              metadata: {
                allowed_operations: ['read', 'update', 'create', 'write', 'delete'],
              },
              updateAssessmentHistoryCallback,
            },
          }
          const assessmentTableColumnConfig = dataGrid.props().columns[6]
          expect(assessmentTableColumnConfig.Header).toBe('')
          expect(assessmentTableColumnConfig.Cell(row)).toEqual(
            <AssessmentActionsEllipsis
              date={isoToLocalDate(assessmentInProgressWithCaseNumber.event_date)}
              inheritUrl="/staff/0X5"
              clientId="0PcpFQu0QM"
              assessmentId={12345}
              assessmentCounty="Los Angeles"
              assessmentStatus="COMPLETED"
              assessmentMetaData={{
                allowed_operations: ['read', 'update', 'create', 'write', 'delete'],
              }}
              updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
            />
          )
          expect(assessmentTableColumnConfig.width).toEqual(35)
          expect(assessmentTableColumnConfig.className).toBe('text-center')
          expect(assessmentTableColumnConfig.headerClassName).toBe('text-center')
          expect(assessmentTableColumnConfig.sortable).toBe(false)
        })
      })
    })
  })
})
