import React from 'react'
import { SearchContainer } from './index'
import { shallow } from 'enzyme'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistoryLoadingBoundary from './AssessmentHistory/SearchAssessmentHistoryLoadingBoundary'
import SearchAssessmentHistory from './AssessmentHistory/SearchAssessmentHistory'
import { globalAlertService } from '../../util/GlobalAlertService'
import { INFO_GLOBAL_ALERT_ID } from '../Assessment/AssessmentHelper'

describe('<SearchContainer />', () => {
  describe('init SearchContainer', () => {
    describe('page layout', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(<SearchContainer navigateTo="SEARCH" match={{ url: '/staff/0X5' }} />)
      })

      it('should display alert box', async () => {
        const postInfoSpy = jest.spyOn(globalAlertService, 'postInfo')
        await wrapper.instance().componentDidMount()
        expect(postInfoSpy).toHaveBeenCalledWith({
          message: 'To Start a CANS Assessment, Search and Select the Child',
          isAutoCloseable: false,
          componentId: INFO_GLOBAL_ALERT_ID,
        })
      })

      it('renders with a <PersonSearchForm /> component', () => {
        expect(wrapper.find(PersonSearchForm).exists()).toBe(true)
      })

      it('renders span with ASSESSMENTS_TITLE', () => {
        expect(wrapper.find('span').exists()).toBe(true)
        expect(wrapper.find('span').text()).toBe('Recently Updated CANS (In-progress only)')
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
