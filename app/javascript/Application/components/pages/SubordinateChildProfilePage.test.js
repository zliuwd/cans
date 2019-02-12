import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SubordinateChildProfilePage from './SubordinateChildProfilePage'
import ChildProfilePage from './ChildProfilePage'
import { StaffLoadingBoundary } from '../Staff'

describe('Subordinate Child Profile Page', () => {
  it('loads a staff person before rendering a child profile page', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateChildProfilePage match={match} />)
    const page = wrapper.find(ChildProfilePage)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(StaffLoadingBoundary)
  })

  it('sets the navigateTo to STAFF_CHILD_PROFILE', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateChildProfilePage match={match} />)
    expect(wrapper.find(ChildProfilePage).props().navigateTo).toBe(navigation.STAFF_CHILD_PROFILE)
  })

  it('uses the staffId from match params', () => {
    const staffId = 'zxcvbn'
    const match = { params: { staffId, clientId: 'ABC' }, url: '/my/url' }
    const wrapper = shallow(<SubordinateChildProfilePage match={match} />)

    expect(wrapper.find(StaffLoadingBoundary).props().staffId).toBe(staffId)
  })
})
