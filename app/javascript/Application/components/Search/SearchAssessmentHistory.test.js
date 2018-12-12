import React from 'react'
import { shallow } from 'enzyme'
import { SearchAssessmentHistory } from './index'
import AssessmentService from '../Assessment/Assessment.service'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import AssessmentLink from '../common/AssessmentLink'
import AssessmentRecordInfo from '../common/AssessmentRecordInfo'

jest.mock('../Assessment/Assessment.service')

const params = {
  numAssessments: 3,
  navFrom: 'SEARCH',
}

const getShallowWrapper = () => {
  AssessmentService.getAllAssessments.mockReturnValue(
    Promise.resolve([
      {
        id: 1,
        person: { id: 100 },
        status: 'IN_PROGRESS',
        county: { name: 'Yolo' },
      },
      {
        id: 2,
        person: { id: 200 },
        status: 'IN_PROGRESS',
        county: { name: 'Yolo' },
      },
      {
        id: 3,
        person: { id: 300 },
        status: 'IN_PROGRESS',
        county: { name: 'Yolo' },
      },
      {
        id: 4,
        person: { id: 400 },
        status: 'COMPLETED',
        county: { name: 'Yolo' },
      },
      {
        id: 5,
        person: { id: 500 },
        status: 'COMPLETED',
        county: { name: 'Yolo' },
      },
    ])
  )
  return shallow(<SearchAssessmentHistory {...params} />)
}

const prepareWrapper = async mockedAssessments => {
  // given
  AssessmentService.getAllAssessments.mockReturnValue(Promise.resolve(mockedAssessments))
  const wrapper = shallow(<SearchAssessmentHistory {...params} />)

  // when
  await wrapper.instance().componentDidMount()

  return wrapper
}

describe('<SearchAssessmentHistory', () => {
  describe('components', () => {
    const wrapper = getShallowWrapper()

    it('renders a div with className row', () => {
      expect(wrapper.find('.row').exists()).toBe(true)
    })
  })

  describe('assessment history', () => {
    describe('when more than 3 assessments', () => {
      it('renders 3 in progress assessments', async () => {
        const numAssessmentsToExpect = 3
        // given + when
        const wrapper = await prepareWrapper([
          { id: 1, status: 'IN_PROGRESS' },
          { id: 2, status: 'IN_PROGRESS' },
          { id: 3, status: 'IN_PROGRESS' },
          { id: 4, status: 'COMPLETED' },
          { id: 5, status: 'COMPLETED' },
        ])

        // then
        expect(wrapper.find(SearchAssessmentHistoryRecord).length).toBe(numAssessmentsToExpect)
      })

      it('renders only in progress assessments in the correct order with created_timestamp only', async () => {
        // given + when
        const wrapper = await prepareWrapper([
          {
            id: 1,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-27T15:59:46.930Z',
            person: { first_name: 'Rajesh', identifier: 'C76Jg230X5' },
          },
          {
            id: 2,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-26T15:59:46.930Z',
            person: { first_name: 'Girish', identifier: 'C76Jg230X6' },
          },
          {
            id: 3,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-28T20:56:19.684Z',
            person: { first_name: 'Yama', identifier: 'C76Jg230X7' },
          },
          {
            id: 4,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-25T20:56:19.684Z',
            person: { first_name: 'Shrinkhala', identifier: 'C76Jg230X8' },
          },
          {
            id: 5,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-24T20:56:19.684Z',
            person: { first_name: 'Sisan', identifier: 'C76Jg230X9' },
          },
          {
            id: 6,
            status: 'COMPLETED',
            created_timestamp: '2018-10-23T20:56:19.684Z',
            person: { first_name: 'Laure', identifier: 'C76Jg230X1' },
          },
          {
            id: 7,
            status: 'COMPLETED',
            created_timestamp: '2018-10-22T20:56:19.684Z',
            person: { first_name: 'Mcflo', identifier: 'C76Jg230X2' },
          },
        ])

        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(0)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-28T20:56:19.684Z')
        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(1)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-27T15:59:46.930Z')
        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(2)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-26T15:59:46.930Z')
      })

      it('renders only in progress assessments in the correct order with created_timestamp and updated_timestamp', async () => {
        // given + when
        const wrapper = await prepareWrapper([
          {
            id: 1,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-27T15:59:46.930Z',
            person: { first_name: 'Kulman', identifier: 'C76Jg230X1' },
          },
          {
            id: 2,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-26T15:59:46.930Z',
            person: { first_name: 'Hari', identifier: 'C76Jg230X2' },
          },
          {
            id: 3,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-20T15:59:46.930Z',
            updated_timestamp: '2018-10-28T20:56:19.684Z',
            person: { first_name: 'Sandeep', identifier: 'C76Jg230X3' },
          },
          {
            id: 4,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-19T15:59:46.930Z',
            updated_timestamp: '2018-10-25T20:56:19.684Z',
            person: { first_name: 'Priyanka', identifier: 'C76Jg230X4' },
          },
          {
            id: 5,
            status: 'IN_PROGRESS',
            created_timestamp: '2018-10-18T15:59:46.930Z',
            updated_timestamp: '2018-10-24T20:56:19.684Z',
            person: { first_name: 'Rajesh', identifier: 'C76Jg230X5' },
          },
          {
            id: 6,
            status: 'COMPLETED',
            created_timestamp: '2018-10-23T20:56:19.684Z',
            person: { first_name: 'Rajesh', identifier: 'C76Jg230X6' },
          },
          {
            id: 7,
            status: 'COMPLETED',
            created_timestamp: '2018-10-22T20:56:19.684Z',
            person: { first_name: 'Rajesh', identifier: 'C76Jg230X7' },
          },
        ])

        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(0)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-28T20:56:19.684Z')
        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(1)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-27T15:59:46.930Z')
        expect(
          `${wrapper
            .find(SearchAssessmentHistoryRecord)
            .at(2)
            .dive()
            .find(AssessmentRecordInfo)
            .dive()
            .find(AssessmentLink)
            .props()
            .assessment.timestamp.utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
        ).toBe('2018-10-26T15:59:46.930Z')
      })
    })

    describe('renders 0 assessments', () => {
      it('renders the empty message when there are zero assessments', async () => {
        // given + when
        const wrapper = await prepareWrapper([])

        // then
        const message = wrapper.find('#no-data').text()
        expect(message).toBe('No assessments currently exist for the clients.')
      })
    })
  })
})
