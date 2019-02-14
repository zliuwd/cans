import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SearchAssessmentPage from './SearchAssessmentPage'
import AssessmentPage from './AssessmentPage'

describe('Search Assessment Page', () => {
  it('renders an assessment page', () => {
    const match = { params: { clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SearchAssessmentPage match={match} />)
    const page = wrapper.find(AssessmentPage)
    expect(page.exists()).toBe(true)
  })

  it('sets the navigateTo to SEARCH_ASSESSMENT_EDIT when there is an assessment id', () => {
    const match = { params: { clientId: '456', id: '1001' }, url: '/path' }
    const wrapper = shallow(<SearchAssessmentPage match={match} />)
    expect(wrapper.find(AssessmentPage).props().navigateTo).toBe(navigation.SEARCH_ASSESSMENT_EDIT)
  })

  it('sets the navigateTo to SEARCH_ASSESSMENT_ADD when there is no assessment id', () => {
    const match = { params: { clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SearchAssessmentPage match={match} />)
    expect(wrapper.find(AssessmentPage).props().navigateTo).toBe(navigation.SEARCH_ASSESSMENT_ADD)
  })
})
