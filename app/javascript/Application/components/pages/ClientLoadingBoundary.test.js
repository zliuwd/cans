import React from 'react'
import { shallow } from 'enzyme'
import ClientLoadingBoundary from './ClientLoadingBoundary'
import LoadingBoundary from '../common/LoadingBoundary'
import { ClientService } from '../Client'

jest.mock('../Client')

describe('<ClientLoadingBoundary />', () => {
  const render = (clientId = '123') =>
    shallow(
      <ClientLoadingBoundary clientId={clientId}>
        <div />
      </ClientLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render()
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('client')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('fetches matching client', () => {
    const clientId = 'ABCDEFJHIJ'
    const wrapper = render(clientId)
    jest.resetAllMocks()
    wrapper
      .find(LoadingBoundary)
      .props()
      .fetch()
    expect(ClientService.fetch).toHaveBeenCalledTimes(1)
    expect(ClientService.fetch).toHaveBeenCalledWith(clientId)
  })

  it('does not update if the id does not change', () => {
    const wrapper = render('XYZ')
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })

  it('is not hidden while loading', () => {
    const loadingBoundary = render().find(LoadingBoundary)
    expect(loadingBoundary.props().isHiddenWhileLoading).toBe(false)
  })
})
