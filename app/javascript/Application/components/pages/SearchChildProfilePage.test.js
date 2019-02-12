import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SearchChildProfilePage from './SearchChildProfilePage'
import ChildProfilePage from './ChildProfilePage'

describe('Search Child Profile Page', () => {
  it('renders a child profile page', () => {
    const match = { params: { clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SearchChildProfilePage match={match} />)
    const page = wrapper.find(ChildProfilePage)
    expect(page.exists()).toBe(true)
  })

  it('sets the navigateTo to SEARCH_CHILD_PROFILE', () => {
    const match = { params: { clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SearchChildProfilePage match={match} />)
    expect(wrapper.find(ChildProfilePage).props().navigateTo).toBe(navigation.SEARCH_CHILD_PROFILE)
  })
})
