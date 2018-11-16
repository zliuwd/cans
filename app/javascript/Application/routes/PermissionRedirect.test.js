import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router'
import PermissionRedirect from './PermissionRedirect'
import { LoadingState } from '../util/loadingHelper'
import UserAccountService from '../components/common/UserAccountService'
import { permissions } from '../util/constants'
jest.mock('../components/common/UserAccountService')

describe('<PermissionRedirect />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<PermissionRedirect />, { disableLifecycleMethods: true })
  })

  it('starts in an updating state', () => {
    expect(wrapper.state().loadingState).toBe(LoadingState.updating)
    expect(wrapper.state().user).toBe(null)
  })

  it('starts loading user account info immediately on mount', () => {
    const fetchCurrentSpy = jest.spyOn(UserAccountService, 'fetchCurrent')
    fetchCurrentSpy.mockReturnValue({})
    wrapper.instance().componentDidMount()
    expect(wrapper.state().loadingState).toBe(LoadingState.updating)
    expect(fetchCurrentSpy).toHaveBeenCalledTimes(1)
  })

  it('loading state should be ready once user account info is fetched', async () => {
    const user = { privileges: ['some permission'] }
    const fetchCurrentSpy = jest.spyOn(UserAccountService, 'fetchCurrent')
    fetchCurrentSpy.mockReturnValue(user)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().loadingState).toBe(LoadingState.ready)
    expect(wrapper.state().user).toBe(user)
  })

  describe('when Loading state is updating', () => {
    it('renders nothing', () => {
      wrapper.setState({ loadingState: LoadingState.updating })
      expect(wrapper.text()).toBe('')
    })
  })

  describe('when loading ready', () => {
    const onlySubordinatesPermission = { privileges: [permissions.SUBORDINATES_READ] }
    const onlyClientsPermission = { privileges: [permissions.CLIENTS_READ] }
    const onlySearchPermission = { privileges: [permissions.CLIENT_SEARCH] }
    const mixedSupervisor = {
      privileges: [permissions.SUBORDINATES_READ, permissions.CLIENTS_READ, permissions.CLIENT_SEARCH],
    }
    const mixedSocialWorker = { privileges: [permissions.CLIENTS_READ, permissions.CLIENT_SEARCH] }

    it('redirects to the staff list when the user only have subordinates-read permission', () => {
      wrapper.setState({ loadingState: LoadingState.ready, user: onlySubordinatesPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/staff')
    })

    it('redirects to the Clients list when the user only have clients-read permission', () => {
      wrapper.setState({ loadingState: LoadingState.ready, user: onlyClientsPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/clients')
    })

    it('redirects to the Search when the user only have client-search permission', () => {
      wrapper.setState({ loadingState: LoadingState.ready, user: onlySearchPermission })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/search')
    })

    it('redirects to the staff when the user is a Supervisor with multiple permissions', () => {
      wrapper.setState({ loadingState: LoadingState.ready, user: mixedSupervisor })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/staff')
    })

    it('redirects to the Clients List when the user is a social worker with multiple permissions', () => {
      wrapper.setState({ loadingState: LoadingState.ready, user: mixedSocialWorker })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/clients')
    })
  })

  describe('when in error', () => {
    it('redirects to the Search by default', () => {
      wrapper.setState({ loadingState: LoadingState.error })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().to).toBe('/search')
    })
  })
})
