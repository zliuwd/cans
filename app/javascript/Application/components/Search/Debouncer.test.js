import React from 'react'
import { mount } from 'enzyme'
import Debouncer from './Debouncer'
import { SearchService } from '../Search/Search.service'

const MyComponent = () => <div>Hello World</div>

describe('<Debouncer />', () => {
  const render = child => {
    return mount(<Debouncer>{child}</Debouncer>)
  }

  describe('page layout', () => {
    it('renders a child component', () => {
      const wrapper = render(<MyComponent />)

      expect(wrapper.find(MyComponent).exists()).toBe(true)
      expect(wrapper.find(MyComponent).text()).toBe('Hello World')
    })
  })

  describe('debounce', () => {
    const timeToWait = 400

    beforeEach(() => {
      jest.useFakeTimers()
    })

    describe('calls debounce one time', () => {
      it('waits 400 milliseconds after the last call to search for clients', () => {
        const searchServiceSpy = jest.spyOn(SearchService, 'getClients')

        const wrapper = render(<MyComponent />)
        wrapper.instance().debounce('annie')

        jest.advanceTimersByTime(399)

        expect(clearTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(searchServiceSpy).not.toBeCalled()

        jest.advanceTimersByTime(1)

        expect(searchServiceSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('calls debounce twice', () => {
      it('waits 400 milliseconds after the last call to search for clients', () => {
        const searchServiceSpy = jest.spyOn(SearchService, 'getClients')

        const wrapper = render(<MyComponent />)
        wrapper.instance().debounce('george')

        jest.advanceTimersByTime(399)

        expect(clearTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(searchServiceSpy).not.toBeCalled()

        wrapper.instance().debounce('annie')

        jest.advanceTimersByTime(399)

        expect(clearTimeout).toHaveBeenCalledTimes(2)
        expect(setTimeout).toHaveBeenCalledTimes(2)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeToWait)
        expect(searchServiceSpy).not.toBeCalled()

        jest.advanceTimersByTime(1)

        expect(searchServiceSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('onClear', () => {
    it('clears state when onClear is called', () => {
      const wrapper = render(<MyComponent />)
      wrapper.setState({
        results: ['result 1', 'result 2'],
        totalResults: 100,
      })
      wrapper.instance().onClear()
      const afterState = {
        results: [],
        totalResults: 0,
      }

      expect(wrapper.state()).toEqual(afterState)
    })
  })
})
