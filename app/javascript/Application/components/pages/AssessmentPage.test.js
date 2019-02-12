import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import AssessmentPage from './AssessmentPage'
import ClientLoadingBoundary from './ClientLoadingBoundary'
import AssessmentPageInner from './AssessmentPageInner'

describe('Assessment Page', () => {
  it('renders an AssessmentPageInner within a ClientLoadingBoundary', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<AssessmentPage match={match} history={{}} />)
    const page = wrapper.find(AssessmentPageInner)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(ClientLoadingBoundary)
  })

  it('passes navigateTo to the AssessmentPageInner', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const navigateTo = navigation.STAFF_ASSESSMENT_EDIT
    const wrapper = shallow(<AssessmentPage match={match} history={{}} navigateTo={navigateTo} />)
    expect(wrapper.find(AssessmentPageInner).props().navigateTo).toBe(navigateTo)
  })

  it('defaults navigateTo to ASSESSMENT_ADD when new assessment', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<AssessmentPage match={match} history={{}} />)
    expect(wrapper.find(AssessmentPageInner).props().navigateTo).toBe(navigation.ASSESSMENT_ADD)
  })

  it('defaults navigateTo to ASSESSMENT_EDIT when existing assessment', () => {
    const match = { params: { staffId: 'ABC', clientId: '123', id: '1000' }, url: '/my/url' }
    const wrapper = shallow(<AssessmentPage match={match} history={{}} />)
    expect(wrapper.find(AssessmentPageInner).props().navigateTo).toBe(navigation.ASSESSMENT_EDIT)
  })

  it('uses the clientId from match params', () => {
    const clientId = 'zxcvbn'
    const match = { params: { staffId: 'ABC', clientId }, url: '/my/url' }
    const wrapper = shallow(<AssessmentPage match={match} history={{}} />)

    expect(wrapper.find(ClientLoadingBoundary).props().clientId).toBe(clientId)
  })
})
