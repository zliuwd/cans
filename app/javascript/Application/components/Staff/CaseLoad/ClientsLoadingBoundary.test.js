import React from 'react'
import { shallow } from 'enzyme'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import StaffService from '../Staff.service'
import { LoadingState } from '../../../util/loadingHelper'
import { handleError } from '../../../util/ApiErrorHandler'
import { failedFetching } from '../StaffHelper'

jest.mock('../Staff.service')
jest.mock('../../../util/ApiErrorHandler')

describe('<ClientsLoadingBoundary />', () => {
  const render = (staffId = 'ABC') =>
    shallow(
      <ClientsLoadingBoundary staffId={staffId}>
        <div />
      </ClientsLoadingBoundary>,
      { disableLifecycleMethods: true }
    )

  it('starts in a waiting state', () => {
    const wrapper = render()
    expect(wrapper.state().loadingState).toBe(LoadingState.waiting)
    expect(wrapper.state().clients).toEqual([])
  })

  it('starts loading client list on mount', () => {
    const clientFetchSpy = jest.spyOn(StaffService, 'clients')
    clientFetchSpy.mockReturnValue([])

    const wrapper = render()
    wrapper.instance().componentDidMount()

    expect(wrapper.state().loadingState).toBe(LoadingState.waiting)
  })

  it('fetches the clients for the given staffperson', () => {
    const clientFetchSpy = jest.spyOn(StaffService, 'clients')
    clientFetchSpy.mockReturnValue([])

    const wrapper = render('ZXY')
    wrapper.instance().componentDidMount()

    expect(clientFetchSpy).toHaveBeenCalledWith('ZXY')
  })

  describe('when loading fails', () => {
    let clientFetchSpy
    const error = 'My Error'
    let wrapper

    beforeEach(async () => {
      clientFetchSpy = jest.spyOn(StaffService, 'clients')
      clientFetchSpy.mockReturnValue(error)
      wrapper = render()
      await wrapper.instance().componentDidMount()
    })

    it('posts an error message', async () => {
      expect(handleError).toHaveBeenCalledTimes(1)
      expect(handleError).toHaveBeenCalledWith(failedFetching)
    })

    it('sets the loading state to error', async () => {
      expect(wrapper.state().loadingState).toBe(LoadingState.error)
    })
  })

  it('readies itself once clients are fetched', async () => {
    const clients = ['Alice', 'Bob']
    const clientFetchSpy = jest.spyOn(StaffService, 'clients')
    clientFetchSpy.mockReturnValue(clients)
    const wrapper = render()
    await wrapper.instance().componentDidMount()

    expect(wrapper.state().loadingState).toBe(LoadingState.ready)
    expect(wrapper.state().clients).toEqual(clients)
  })

  describe('when waiting', () => {
    it('passes loading state to child', () => {
      const wrapper = render()
      wrapper.setState({ loadingState: LoadingState.waiting })
      expect(wrapper.props()).toEqual({ loadingState: LoadingState.waiting })
    })
  })

  describe('when ready', () => {
    it('renders child with list of clients', () => {
      const wrapper = render()
      wrapper.setState({ loadingState: LoadingState.ready, clients: ['Alice', 'Bob'] })
      expect(wrapper.props().loadingState).toBe(LoadingState.ready)
      expect(wrapper.props().clients).toEqual(['Alice', 'Bob'])
    })
  })

  describe('when in error', () => {
    it('passes loading state to child', () => {
      const wrapper = render()
      wrapper.setState({ loadingState: LoadingState.error })
      expect(wrapper.props()).toEqual({ loadingState: LoadingState.error })
    })
  })
})
