import React from 'react'
import { shallow } from 'enzyme'
import SubordinateProfilePage from './SubordinateProfilePage'
import { StaffLoadingBoundary } from '../Staff'
import SubordinateProfilePageInner from './SubordinateProfilePageInner'

describe('Subordinate Profile Page', () => {
  it('renders a SubordinateProfilePageInner within a StaffLoadingBoundary', () => {
    const match = { params: { staffId: 'ABC' } }
    const wrapper = shallow(<SubordinateProfilePage match={match} />)
    const page = wrapper.find(SubordinateProfilePageInner)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(StaffLoadingBoundary)
  })

  it('uses the staffId from match params', () => {
    const staffId = 'zxcvbn'
    const match = { params: { staffId } }
    const wrapper = shallow(<SubordinateProfilePage match={match} />)

    expect(wrapper.find(StaffLoadingBoundary).props().staffId).toBe(staffId)
  })
})
