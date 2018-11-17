import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router'
import PermissionRedirect from './PermissionRedirect'
import { permissions } from '../util/constants'

describe('<PermissionRedirect />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<PermissionRedirect />)
  })

  describe('when a user prop passed in', () => {
    const onlySubordinatesPermission = { privileges: [permissions.SUBORDINATES_READ] }
    const onlyClientsPermission = { privileges: [permissions.CLIENTS_READ] }
    const onlySearchPermission = { privileges: [permissions.CLIENT_SEARCH] }
    const mixedSupervisor = {
      privileges: [permissions.SUBORDINATES_READ, permissions.CLIENTS_READ, permissions.CLIENT_SEARCH],
    }
    const mixedSocialWorker = { privileges: [permissions.CLIENTS_READ, permissions.CLIENT_SEARCH] }

    it('redirects to the staff list when the user only have subordinates-read permission', () => {
      wrapper.setProps({ user: onlySubordinatesPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/staff')
    })

    it('redirects to the Clients list when the user only have clients-read permission', () => {
      wrapper.setProps({ user: onlyClientsPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/clients')
    })

    it('redirects to the Search when the user only have client-search permission', () => {
      wrapper.setProps({ user: onlySearchPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/search')
    })

    it('redirects to the staff when the user is a Supervisor with multiple permissions', () => {
      wrapper.setProps({ user: mixedSupervisor })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/staff')
    })

    it('redirects to the Clients List when the user is a social worker with multiple permissions', () => {
      wrapper.setProps({ user: mixedSocialWorker })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/clients')
    })
  })

  describe('when does not have a user prop', () => {
    it('will not render redirect', () => {
      wrapper.setProps({ user: undefined })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(false)
      expect(wrapper.text()).toBe('')
    })
  })
})
