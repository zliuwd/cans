import React from 'react'
import { mount } from 'enzyme'
import Debouncer from './Debouncer'
import { SearchService } from '../Search/Search.service'
import {
  defaultState,
  mockClientResult,
  mockDoraResult,
  mockResults,
  sortAfter,
  defaultMockClientResultData,
} from './debouncer.mocks'

const MyComponent = () => <div>Hello World</div>

describe('<Debouncer />', () => {
  const render = () => {
    return mount(<Debouncer>{<MyComponent />}</Debouncer>)
  }

  describe('page layout', () => {
    it('renders a child component', () => {
      const wrapper = render(<MyComponent />)
      expect(wrapper.find(MyComponent).exists()).toBe(true)
      expect(wrapper.find(MyComponent).text()).toBe('Hello World')
    })
  })

  describe('getPrevPage', () => {
    it('calls getResultsSubset with new page number', async () => {
      const mockClientResultData = {
        page: 2,
        lastPageFetched: 2,
        results: [{ result: 11 }],
        ...defaultMockClientResultData,
      }
      const wrapper = render()
      const getResultsSubsetSpy = jest.spyOn(wrapper.instance(), 'getResultsSubset')
      wrapper.setState(mockClientResultData)
      await wrapper.instance().getPrevPage()

      expect(getResultsSubsetSpy).toHaveBeenCalledTimes(1)
      expect(getResultsSubsetSpy).toHaveBeenCalledWith(1)
    })
  })

  describe('getNextPage', () => {
    describe('results for next page are not cached', () => {
      it('calls getClientResultData with new page, searchTerm, and sortAfter', async () => {
        const mockSearchServiceResponse = {
          hits: { total: 1, hits: [mockDoraResult] },
        }
        const searchServiceSpy = jest.spyOn(SearchService, 'getClients')
        searchServiceSpy.mockReturnValue(Promise.resolve(mockSearchServiceResponse))

        const mockClientResultData = {
          page: 1,
          lastPageFetched: 1,
          results: mockResults,
          ...defaultMockClientResultData,
        }

        const wrapper = render()
        const getClientResultDataSpy = jest.spyOn(wrapper.instance(), 'getClientResultData')
        wrapper.setState(mockClientResultData)
        await wrapper.instance().getNextPage('annie', sortAfter)

        expect(getClientResultDataSpy).toHaveBeenCalledTimes(1)
        expect(getClientResultDataSpy).toHaveBeenCalledWith(2, 'annie', sortAfter)
      })
    })

    describe('results for next page are cached', () => {
      it('calls getResultsSubset with new page number', async () => {
        const mockClientResultData = {
          page: 1,
          lastPageFetched: 2,
          results: mockResults,
          ...defaultMockClientResultData,
        }
        const wrapper = render()
        const getResultsSubsetSpy = jest.spyOn(wrapper.instance(), 'getResultsSubset')
        wrapper.setState(mockClientResultData)
        await wrapper.instance().getNextPage()

        expect(getResultsSubsetSpy).toHaveBeenCalledTimes(1)
        expect(getResultsSubsetSpy).toHaveBeenCalledWith(2)
      })
    })
  })

  describe('getClientResultData', () => {
    describe('called by getNextPage', () => {
      it('passes a new page and subset of results to child component', async () => {
        const mockSearchServiceResponse = {
          hits: { total: 1, hits: [mockDoraResult] },
        }
        const searchServiceSpy = jest.spyOn(SearchService, 'getClients')
        searchServiceSpy.mockReturnValue(Promise.resolve(mockSearchServiceResponse))

        const mockClientResultData = {
          page: 1,
          lastPageFetched: 1,
          results: mockResults,
          allResults: mockResults,
          totalResults: 20,
        }
        const wrapper = render()
        wrapper.setState(mockClientResultData)
        const newPage = wrapper.state().page + 1
        await wrapper.instance().getClientResultData(newPage, 'annie')
        wrapper.update()

        expect(wrapper.find(MyComponent).prop('page')).toBe(2)
        expect(wrapper.find(MyComponent).prop('results')).toEqual(mockClientResult)
      })
    })

    describe('called by debounce', () => {
      it('passes a new page and subset of results to child component', async () => {
        const mockSearchServiceResponse = {
          hits: { total: 1, hits: [mockDoraResult] },
        }
        const searchServiceSpy = jest.spyOn(SearchService, 'getClients')
        searchServiceSpy.mockReturnValue(Promise.resolve(mockSearchServiceResponse))

        const wrapper = render()
        const newPage = 1
        await wrapper.instance().getClientResultData(newPage, 'annie')
        wrapper.update()

        expect(wrapper.find(MyComponent).prop('page')).toBe(1)
        expect(wrapper.find(MyComponent).prop('results')).toEqual(mockClientResult)
      })
    })
  })

  describe('getResultsSubset', () => {
    describe('called by getPrevPage', () => {
      it('passes a new page and subset of results to child component', async () => {
        const mockClientResultData = {
          page: 2,
          lastPageFetched: 2,
          results: [{ result: 11 }],
          ...defaultMockClientResultData,
        }
        const wrapper = render()
        wrapper.setState(mockClientResultData)
        const newPage = wrapper.state().page - 1
        await wrapper.instance().getResultsSubset(newPage)
        wrapper.update()

        expect(wrapper.find(MyComponent).prop('page')).toBe(1)
        expect(wrapper.find(MyComponent).prop('results')).toEqual(mockResults)
      })
    })

    describe('called by getNextPage', () => {
      it('passes a new page and subset of results to child component', async () => {
        const mockClientResultData = {
          page: 1,
          lastPageFetched: 2,
          results: mockResults,
          ...defaultMockClientResultData,
        }
        const wrapper = render()
        wrapper.setState(mockClientResultData)
        const newPage = wrapper.state().page + 1
        await wrapper.instance().getResultsSubset(newPage)
        wrapper.update()

        expect(wrapper.find(MyComponent).prop('page')).toBe(2)
        expect(wrapper.find(MyComponent).prop('results')).toEqual([{ result: 11 }])
      })
    })
  })

  describe('debounce', () => {
    const timeToWait = 400
    const params = [1, 'annie', 'george']
    let wrapper
    let getClientResultDataSpy

    beforeEach(() => {
      jest.useFakeTimers()

      wrapper = render()
      getClientResultDataSpy = jest.spyOn(wrapper.instance(), 'getClientResultData')
    })

    afterEach(() => {
      getClientResultDataSpy.mockReset()
    })

    describe('call debouncer once', () => {
      it('waits 400 milliseconds to call getClientResultData', () => {
        wrapper.instance().debounce(params[1])
        jest.advanceTimersByTime(399)
        expect(clearTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(getClientResultDataSpy).not.toBeCalled()
        jest.advanceTimersByTime(1)
        expect(getClientResultDataSpy).toHaveBeenCalledTimes(1)
        expect(getClientResultDataSpy).toHaveBeenLastCalledWith(params[0], params[1])
      })
    })

    describe('call debouncer twice', () => {
      it('waits 400 milliseconds to call getClientResultData after being called twice', async () => {
        await wrapper.instance().debounce(params[1])
        jest.advanceTimersByTime(399)
        expect(clearTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(getClientResultDataSpy).not.toBeCalled()
        await wrapper.instance().debounce(params[2])
        jest.advanceTimersByTime(399)
        expect(clearTimeout).toHaveBeenCalledTimes(2)
        expect(setTimeout).toHaveBeenCalledTimes(2)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(getClientResultDataSpy).not.toBeCalled()
        jest.advanceTimersByTime(1)
        expect(getClientResultDataSpy).toHaveBeenCalledTimes(1)
        expect(getClientResultDataSpy).toHaveBeenLastCalledWith(params[0], params[2])
      })
    })
  })

  describe('onClear', () => {
    it('clears state when onClear is called', () => {
      const mockClientResultData = {
        page: 2,
        lastPageFetched: 2,
        results: [{ result: 11 }],
        ...defaultMockClientResultData,
      }
      const wrapper = render()
      wrapper.setState(mockClientResultData)
      wrapper.instance().onClear()
      expect(wrapper.state()).toEqual(defaultState)
    })
  })
})
