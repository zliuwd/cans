import React from 'react'
import { shallow } from 'enzyme'
import SearchAssessmentHistory from './SearchAssessmentHistory'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import AssessmentLink from '../../common/AssessmentLink'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'
import {
  searchAssessmentHistoryMockedAssessments,
  mockedAssessmentsWithCreatedTimeStamp,
  mockedAssessmentsWithCreatedUpdatedTimeStamp,
} from '../search.mocks'
import { LoadingState } from '../../../util/loadingHelper'

const defaultProps = {
  numAssessments: 3,
  navFrom: 'SEARCH',
  inheritUrl: '/staff/0X5/clients/AznnyCs0X5/assessments/298750',
  updateAssessmentHistoryCallback: () => {},
}

const prepareWrapper = (assessments, loadingState) => {
  const props = {
    assessments,
    loadingState,
    ...defaultProps,
  }

  return shallow(<SearchAssessmentHistory {...props} />)
}

const getTimestamp = (wrapper, index) => {
  return `${wrapper
    .find(SearchAssessmentHistoryRecord)
    .at(index)
    .dive()
    .find(AssessmentRecordInfo)
    .dive()
    .find(AssessmentLink)
    .props()
    .assessment.timestamp.utc()
    .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
}

describe('<SearchAssessmentHistory', () => {
  describe('layout', () => {
    const wrapper = prepareWrapper(searchAssessmentHistoryMockedAssessments, LoadingState.ready)

    it('renders a div with className row', () => {
      expect(wrapper.find('.row').exists()).toBe(true)
    })
  })

  describe('assessment history', () => {
    describe('when more than 3 assessments', () => {
      it('renders 3 in progress assessments', () => {
        const numAssessmentsToExpect = 3
        // given + when
        const wrapper = prepareWrapper(searchAssessmentHistoryMockedAssessments, LoadingState.ready)

        // then
        expect(wrapper.find(SearchAssessmentHistoryRecord).length).toBe(numAssessmentsToExpect)
      })

      it('renders only in progress assessments in the correct order with created_timestamp only', () => {
        // given + when
        const wrapper = prepareWrapper(mockedAssessmentsWithCreatedTimeStamp, LoadingState.ready)

        expect(getTimestamp(wrapper, 0)).toBe('2018-10-28T20:56:19.684Z')
        expect(getTimestamp(wrapper, 1)).toBe('2018-10-27T15:59:46.930Z')
        expect(getTimestamp(wrapper, 2)).toBe('2018-10-26T15:59:46.930Z')
      })

      it('renders only in progress assessments in the correct order with created_timestamp and updated_timestamp', () => {
        // given + when
        const wrapper = prepareWrapper(mockedAssessmentsWithCreatedUpdatedTimeStamp, LoadingState.ready)

        expect(getTimestamp(wrapper, 0)).toBe('2018-10-28T20:56:19.684Z')
        expect(getTimestamp(wrapper, 1)).toBe('2018-10-27T15:59:46.930Z')
        expect(getTimestamp(wrapper, 2)).toBe('2018-10-26T15:59:46.930Z')
      })
    })

    describe('0 assessments', () => {
      describe('Loading State is ready', () => {
        it('renders the no assessments message', () => {
          // given + when
          const wrapper = prepareWrapper([], LoadingState.ready)

          // then
          const message = wrapper.find('#no-data').text()
          expect(message).toBe('No assessments currently exist for the clients.')
        })
      })

      describe('Loading State is not ready', () => {
        it('renders the loading message', () => {
          // given + when
          const wrapper = prepareWrapper(null, LoadingState.waiting)

          // then
          const message = wrapper.find('#no-data').text()
          expect(message).toBe('Loading assessments...')
        })
      })
    })
  })
})
