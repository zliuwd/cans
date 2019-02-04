import React from 'react'
import { shallow } from 'enzyme'
import CurrentUserLoadingBoundary from './CurrentUserLoadingBoundary'
import LoadingBoundary from '../common/LoadingBoundary'
import UserAccountService from '../common/UserAccountService'

jest.mock('../common/UserAccountService')

describe('<CurrentUserLoadingBoundary />', () => {
  const render = () =>
    shallow(
      <CurrentUserLoadingBoundary>
        <div />
      </CurrentUserLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render()
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('user')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('fetches current user', () => {
    const wrapper = render()
    jest.resetAllMocks()
    wrapper
      .find(LoadingBoundary)
      .props()
      .fetch()
    expect(UserAccountService.fetchCurrent).toHaveBeenCalledTimes(1)
  })

  it('does not update fetch', () => {
    const wrapper = render()
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })
})
