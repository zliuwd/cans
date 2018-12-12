import React from 'react'
import { SearchContainer } from './index'
import { shallow } from 'enzyme'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistory from './SearchAssessmentHistory'

describe('<SearchContainer />', () => {
  describe('init SearchContainer', () => {
    describe('page layout', () => {
      it('renders with a <PersonSearchForm /> component', () => {
        const wrapper = shallow(<SearchContainer navigateTo="SEARCH" />)
        expect(wrapper.find(PersonSearchForm).exists()).toBe(true)
      })

      it('renders h4 with ASSESSMENTS_TITLE', () => {
        const wrapper = shallow(<SearchContainer navigateTo="SEARCH" />)
        expect(wrapper.find('h4').exists()).toBe(true)
        expect(wrapper.find('h4').text()).toBe('Recently Updated CANS')
      })

      it('renders with a <SearchAssessmentHistory /> component', () => {
        const wrapper = shallow(<SearchContainer navigateTo="SEARCH" />)
        expect(wrapper.find(SearchAssessmentHistory).exists()).toBe(true)
      })
    })
  })
})
