import React from 'react'
import LoadingBoundary from '../components/common/LoadingBoundary'
import UserAccountService from '../components/common/UserAccountService'
import { shallow, mount } from 'enzyme'
import PermissionRedirectBoundary from './PermissionRedirectBoundary'

jest.mock('../components/common/UserAccountService')

describe('<PermissionRedirectBoundary />', () => {
  const render = () =>
    shallow(
      <PermissionRedirectBoundary>
        <div />
      </PermissionRedirectBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render()
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('user')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('once been mount will fetch data from UserAccountService', () => {
    const userFetchSpy = jest.spyOn(UserAccountService, 'fetchCurrent')
    const wrapper = mount(
      <PermissionRedirectBoundary>
        <div />
      </PermissionRedirectBoundary>
    )
    expect(userFetchSpy).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
