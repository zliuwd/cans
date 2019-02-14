import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import AssessmentChangelogPage from './AssessmentChangelogPage'
import ClientLoadingBoundary from './ClientLoadingBoundary'
import AssessmentChangelogPageInner from './AssessmentChangelogPageInner'

describe('AssessmentChangelogPage', () => {
  it('renders a AssessmentChangelogProfilePageInner within a ClientLoadingBoundary', () => {
    const match = { params: { clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<AssessmentChangelogPage match={match} />)
    const page = wrapper.find(AssessmentChangelogPageInner)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(ClientLoadingBoundary)
  })

  it('defaults the navigateTo to ASSESSMENT_CHANGELOG', () => {
    const match = { params: { clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<AssessmentChangelogPage match={match} />)
    expect(wrapper.find(AssessmentChangelogPageInner).props().navigateTo).toBe(navigation.ASSESSMENT_CHANGELOG)
  })

  it('passes through a specific navigateTo', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const navigateTo = navigation.STAFF_CHANGELOG
    const wrapper = shallow(<AssessmentChangelogPage match={match} navigateTo={navigateTo} />)
    expect(wrapper.find(AssessmentChangelogPageInner).props().navigateTo).toBe(navigateTo)
  })

  it('uses the clientId from match params', () => {
    const clientId = 'zxcvbn'
    const match = { params: { clientId }, url: '/my/url' }
    const wrapper = shallow(<AssessmentChangelogPage match={match} />)

    expect(wrapper.find(ClientLoadingBoundary).props().clientId).toBe(clientId)
  })

  it('passes staffInfo through, if provided', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const staffInfo = { key: 'value' }
    const wrapper = shallow(<AssessmentChangelogPage match={match} staffInfo={staffInfo} />)

    expect(wrapper.find(AssessmentChangelogPageInner).props().staffInfo).toBe(staffInfo)
  })
})
