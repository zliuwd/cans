import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SearchAssessmentChangelogPage from './SearchAssessmentChangelogPage'
import AssessmentChangelogPage from './AssessmentChangelogPage'

describe('Search Assessment Changelog Page', () => {
  it('renders an assessment changelog page', () => {
    const match = { params: { clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SearchAssessmentChangelogPage match={match} />)
    const page = wrapper.find(AssessmentChangelogPage)
    expect(page.exists()).toBe(true)
  })

  it('sets the navigateTo to SEARCH_CHANGELOG', () => {
    const match = { params: { clientId: '456', id: '1001' }, url: '/path' }
    const wrapper = shallow(<SearchAssessmentChangelogPage match={match} />)
    expect(wrapper.find(AssessmentChangelogPage).props().navigateTo).toBe(navigation.SEARCH_CHANGELOG)
  })
})
