import React from 'react'
import { SearchContainer } from './index'
import { shallow } from 'enzyme'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistoryLoadingBoundary from './AssessmentHistory/SearchAssessmentHistoryLoadingBoundary'
import SearchAssessmentHistory from './AssessmentHistory/SearchAssessmentHistory'

describe('<SearchContainer />', () => {
  describe('init SearchContainer', () => {
    describe('page layout', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(<SearchContainer navigateTo="SEARCH" match={{ url: '/staff/0X5' }} />)
      })

      it('renders with a <CloseableAlert /> component', () => {
        expect(wrapper.find('CloseableAlert').exists()).toBe(true)
        expect(wrapper.find('CloseableAlert').prop('message')).toEqual(
          'To Start a CANS Assessment, Search and Select the Child'
        )
      })

      it('renders with a <PersonSearchForm /> component', () => {
        expect(wrapper.find(PersonSearchForm).exists()).toBe(true)
      })

      it('renders h4 with ASSESSMENTS_TITLE', () => {
        expect(wrapper.find('h4').exists()).toBe(true)
        expect(wrapper.find('h4').text()).toBe('Recently Updated CANS (In-progress only)')
      })

      it('renders a <SearchAssessmentHistoryLoadingBoundary /> component', () => {
        expect(wrapper.find(SearchAssessmentHistoryLoadingBoundary).exists()).toBe(true)
      })

      it('renders a <SearchAssessmentHistory /> component', () => {
        expect(wrapper.find(SearchAssessmentHistory).exists()).toBe(true)
      })
    })
  })
})
