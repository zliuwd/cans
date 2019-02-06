import React from 'react'
import { shallow } from 'enzyme'
import UserMenu from './UserMenu'
import { Avatar } from '@cwds/components'
import { UncontrolledDropdown, DropdownToggle, DropdownItem } from '@cwds/reactstrap'
import { logoutUrl } from '../../util/navigationUtil'

describe('<UserMenu />', () => {
  const render = user => shallow(<UserMenu user={user} />)

  it('renders a dropdown menu', () => {
    expect(render().type()).toBe(UncontrolledDropdown)
  })

  it('renders a toggle with user name and avatar', () => {
    const toggle = render({ first_name: 'Eddard', last_name: 'Stark' }).find(DropdownToggle)

    expect(toggle.find('span').props().children).toEqual('Eddard Stark')
    expect(toggle.find(Avatar).exists()).toBe(true)
  })

  it('renders a logout item', () => {
    const item = render().find(DropdownItem)
    expect(item.props().children).toBe('Logout')
  })

  it('logs out when clicking logout item', () => {
    const item = render().find(DropdownItem)
    const spy = jest.spyOn(window.location, 'assign').mockImplementation(() => {})
    item.props().onClick()
    expect(spy).toHaveBeenCalledWith(logoutUrl())
  })
})
