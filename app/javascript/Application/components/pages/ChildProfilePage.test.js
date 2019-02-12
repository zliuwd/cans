import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import ChildProfilePage from './ChildProfilePage'
import ClientLoadingBoundary from './ClientLoadingBoundary'
import ChildProfilePageInner from './ChildProfilePageInner'

describe('ChildProfilePage', () => {
  it('renders a ChildProfilePageInner within a ClientLoadingBoundary', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<ChildProfilePage match={match} />)
    const page = wrapper.find(ChildProfilePageInner)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(ClientLoadingBoundary)
  })

  it('defaults the navigateTo to CHILD_PROFILE', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<ChildProfilePage match={match} />)
    expect(wrapper.find(ChildProfilePageInner).props().navigateTo).toBe(navigation.CHILD_PROFILE)
  })

  it('passes through a specific navigateTo', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const navigateTo = navigation.STAFF_CHILD_PROFILE
    const wrapper = shallow(<ChildProfilePage match={match} navigateTo={navigateTo} />)
    expect(wrapper.find(ChildProfilePageInner).props().navigateTo).toBe(navigateTo)
  })

  it('uses the clientId from match params', () => {
    const clientId = 'zxcvbn'
    const match = { params: { staffId: 'ABC', clientId }, url: '/my/url' }
    const wrapper = shallow(<ChildProfilePage match={match} />)

    expect(wrapper.find(ClientLoadingBoundary).props().clientId).toBe(clientId)
  })

  it('passes staffInfo through, if provided', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const staffInfo = { key: 'value' }
    const wrapper = shallow(<ChildProfilePage match={match} staffInfo={staffInfo} />)

    expect(wrapper.find(ChildProfilePageInner).props().staffInfo).toBe(staffInfo)
  })
})
