import React from 'react'
import { shallow } from 'enzyme'
import LoadingBoundary from './LoadingBoundary'
import { LoadingState } from '../../util/loadingHelper'

describe('<LoadingBoundary />', () => {
  const render = ({ childNodeFetchedPropName = 'data', fetch = () => {}, isHiddenWhileLoading }) =>
    shallow(
      <LoadingBoundary
        childNodeFetchedPropName={childNodeFetchedPropName}
        fetch={fetch}
        isHiddenWhileLoading={isHiddenWhileLoading}
      >
        <div />
      </LoadingBoundary>,
      { disableLifecycleMethods: true }
    )

  it('defaults isHiddenWhileLoading prop to true value', () => {
    const wrapper = render({})
    expect(wrapper.instance().props.isHiddenWhileLoading).toBe(true)
  })

  it('starts in a waiting state', () => {
    const wrapper = render({})
    expect(wrapper.state().loadingState).toBe(LoadingState.waiting)
  })

  it('fetches data on mount', async () => {
    const expectedData = { foo: 'bar' }
    const mockFetch = jest.fn()
    mockFetch.mockReturnValue(Promise.resolve(expectedData))
    const wrapper = render({ fetch: mockFetch })
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().data).toEqual(expectedData)
    expect(wrapper.state().loadingState).toBe(LoadingState.ready)
  })

  it('sets loadingState to error if fetching fails', async () => {
    const mockFetch = jest.fn()
    mockFetch.mockReturnValue(Promise.reject(new Error()))
    const wrapper = render({ fetch: mockFetch })
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().data).toBe(null)
    expect(wrapper.state().loadingState).toBe(LoadingState.error)
  })

  describe('when isHiddenWhileLoading prop is true', () => {
    it('renders nothing while fetching', () => {
      const wrapper = render({})
      expect(wrapper.html()).toBeNull()
    })

    it('renders childNode when fetching completed', async () => {
      const mockFetch = jest.fn()
      mockFetch.mockReturnValue(Promise.resolve({}))
      const wrapper = render({ fetch: mockFetch })
      await wrapper.instance().componentDidMount()
      const childNode = wrapper.find('div')
      expect(childNode.exists()).toBeTruthy()
    })

    it('renders childNode when fetching failed', async () => {
      const mockFetch = jest.fn()
      mockFetch.mockReturnValue(Promise.reject(new Error()))
      const wrapper = render({ fetch: mockFetch })
      await wrapper.instance().componentDidMount()
      const childNode = wrapper.find('div')
      expect(childNode.exists()).toBeTruthy()
    })
  })

  describe('when isHiddenWhileLoading prop is false', () => {
    it('renders childNode while fetching', () => {
      const wrapper = render({ isHiddenWhileLoading: false })
      expect(wrapper.find('div').exists()).toBeTruthy()
    })

    it('renders childNode when fetching completed', async () => {
      const mockFetch = jest.fn()
      mockFetch.mockReturnValue(Promise.resolve({}))
      const wrapper = render({ isHiddenWhileLoading: false, fetch: mockFetch })
      await wrapper.instance().componentDidMount()
      const childNode = wrapper.find('div')
      expect(childNode.exists()).toBeTruthy()
    })

    it('renders childNode when fetching failed', async () => {
      const mockFetch = jest.fn()
      mockFetch.mockReturnValue(Promise.reject(new Error()))
      const wrapper = render({ isHiddenWhileLoading: false, fetch: mockFetch })
      await wrapper.instance().componentDidMount()
      const childNode = wrapper.find('div')
      expect(childNode.exists()).toBeTruthy()
    })
  })

  it('propagates loadingState and data to childNode props', async () => {
    const expectedData = { foo: 'bar' }
    const mockFetch = jest.fn()
    mockFetch.mockReturnValue(Promise.resolve(expectedData))
    const wrapper = render({ fetch: mockFetch })
    await wrapper.instance().componentDidMount()
    const childNode = wrapper.find('div')
    expect(childNode.props().data).toEqual(expectedData)
    expect(childNode.props().loadingState).toEqual(LoadingState.ready)
  })

  describe('when the fetch function is updated', () => {
    let wrapper
    let prevProps

    beforeEach(async () => {
      const initialFetch = jest.fn()
      wrapper = render({ isHiddenWhileLoading: false, fetch: initialFetch })
      await wrapper.instance().componentDidMount()
      prevProps = wrapper.instance().props
    })

    it('sets loadingState to updating', () => {
      const newFetch = jest.fn()
      wrapper.setProps({ fetch: newFetch })
      wrapper.instance().componentDidUpdate(prevProps)

      expect(wrapper.find('div').props().loadingState).toBe(LoadingState.updating)
    })

    it('fetches new data', async () => {
      const expectedData = { hello: 'world' }
      const newFetch = jest.fn()
      newFetch.mockReturnValue(Promise.resolve(expectedData))
      wrapper.setProps({ fetch: newFetch })
      await wrapper.instance().componentDidUpdate(prevProps)
      expect(wrapper.state().data).toEqual(expectedData)
      expect(wrapper.state().loadingState).toBe(LoadingState.ready)
    })

    it('sets loadingState to error if fetching fails', async () => {
      const newFetch = jest.fn()
      newFetch.mockReturnValue(Promise.reject(new Error()))
      wrapper.setProps({ fetch: newFetch })
      await wrapper.instance().componentDidUpdate(prevProps)
      expect(wrapper.state().loadingState).toBe(LoadingState.error)
    })
  })

  it('does not refetch when updated with the same fetch function', async () => {
    const initialFetch = jest.fn()
    const wrapper = render({ isHiddenWhileLoading: false, fetch: initialFetch })
    await wrapper.instance().componentDidMount()

    const prevProps = wrapper.instance().props
    expect(initialFetch).toHaveBeenCalledTimes(1)

    wrapper.setState({ data: 'Some new data' })
    wrapper.instance().componentDidUpdate(prevProps)

    expect(initialFetch).toHaveBeenCalledTimes(1)
    expect(wrapper.find('div').props().loadingState).toBe(LoadingState.ready)
  })

  it('does not update data if the initial fetch returns later', async () => {
    let resolveInitial
    const initialData = 'Initial Data'
    const initialFetch = jest.fn(() => new Promise(resolve => (resolveInitial = resolve)))
    const secondData = 'Second Data'
    const secondFetch = jest.fn(() => Promise.resolve(secondData))
    const wrapper = render({ isHiddenWhileLoading: false, fetch: initialFetch })

    const firstUpdatePromise = wrapper.instance().componentDidMount()

    wrapper.setProps({ fetch: secondFetch })
    await wrapper.instance().componentDidUpdate(wrapper.props())

    resolveInitial(initialData)
    await firstUpdatePromise

    expect(wrapper.state().data).not.toEqual(initialData)
    expect(wrapper.state().data).toEqual(secondData)
  })
})
