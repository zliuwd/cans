import React from 'react'
import { shallow } from 'enzyme'
import SearchAssessmentHistory from './SearchAssessmentHistory'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import { LoadingState } from '../../../util/loadingHelper'

const assessments = [{ id: 1 }, { id: 2 }, { id: 3 }]

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

describe('<SearchAssessmentHistory', () => {
  describe('layout', () => {
    const wrapper = prepareWrapper(assessments, LoadingState.ready)

    it('renders a div with className row', () => {
      expect(wrapper.find('.row').exists()).toBe(true)
    })
  })

  describe('assessment history', () => {
    describe('when more than 0 assessments', () => {
      it('renders 3 assessments', () => {
        const numAssessmentsToExpect = 3
        const wrapper = prepareWrapper(assessments, LoadingState.ready)
        expect(wrapper.find(SearchAssessmentHistoryRecord).length).toBe(numAssessmentsToExpect)
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
