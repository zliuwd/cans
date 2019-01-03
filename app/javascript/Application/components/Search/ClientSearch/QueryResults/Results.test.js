import React from 'react'
import { shallow } from 'enzyme'
import Results from './Results'
import SuggestionHeader from './SuggestionHeader'
import { PersonSuggestion } from './PersonSuggestion'
import ShowMoreResultsButton from './ShowMoreResultsButton'

const defaultProps = {
  getItemProps: (props = {}) => props,
  clearItems: () => {},
  onChangeQuery: () => {},
}

describe('<Results />', () => {
  const render = props => shallow(<Results {...defaultProps} {...props} />)

  it('calls clearItems every time it renders', async () => {
    const clearItems = jest.fn()
    const wrapper = render({ clearItems, isOpen: true })
    expect(clearItems).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ isOpen: false })
    await wrapper.setProps({ results: { items: ['a'], totalResults: 1, searchTerm: '' } })
    await wrapper.setProps({ results: { items: ['b'], totalResults: 1, searchTerm: '' } })
    expect(clearItems).toHaveBeenCalledTimes(4)
  })

  describe('when open', () => {
    describe('with more items than can be displayed', () => {
      const getItemProps = jest.fn(defaultProps.getItemProps)
      const items = ['a', 'b', 'c']
      const totalResults = items.length * 5
      let wrapper

      beforeEach(() => {
        getItemProps.mockClear()
        wrapper = render({
          getItemProps,
          isOpen: true,
          results: { items, totalResults, searchTerm: 'Sir Puppyton' },
        })
      })

      it('renders a SuggestionHeader', () => {
        expect(wrapper.find(SuggestionHeader).exists()).toBe(true)
        const props = wrapper.find(SuggestionHeader).props()
        expect(props.page).toBe(1)
        expect(props.currentNumberOfResults).toBe(items.length)
        expect(props.totalResults).toBe(totalResults)
        expect(props.searchTerm).toBe('Sir Puppyton')
      })

      it('renders a PersonSuggestion for each item', () => {
        expect(wrapper.find('.search-item').find(PersonSuggestion).length).toBe(items.length)
      })

      it('calls getItemProps for each item and the Show More Results button', () => {
        expect(getItemProps).toHaveBeenCalledTimes(items.length + 1)
      })

      it('adds a Show More Results button', () => {
        expect(wrapper.find(ShowMoreResultsButton).exists()).toBe(true)
      })
    })

    describe('when all of the total items are displayed', () => {
      const getItemProps = jest.fn(defaultProps.getItemProps)
      const items = ['a', 'b', 'c', 'd']
      const totalResults = items.length
      let wrapper

      beforeEach(() => {
        getItemProps.mockClear()
        wrapper = render({
          getItemProps,
          isOpen: true,
          results: { items, totalResults, searchTerm: 'Alec Baldwinnebago' },
        })
      })

      it('renders a SuggestionHeader', () => {
        expect(wrapper.find(SuggestionHeader).exists()).toBe(true)
        const props = wrapper.find(SuggestionHeader).props()
        expect(props.page).toBe(1)
        expect(props.currentNumberOfResults).toBe(items.length)
        expect(props.totalResults).toBe(totalResults)
        expect(props.searchTerm).toBe('Alec Baldwinnebago')
      })

      it('renders a PersonSuggestion for each item', () => {
        expect(wrapper.find('.search-item').find(PersonSuggestion).length).toBe(items.length)
      })

      it('calls getItemProps for each item', () => {
        expect(getItemProps).toHaveBeenCalledTimes(items.length)
      })

      it('has no Show More Results button', () => {
        expect(wrapper.find(ShowMoreResultsButton).exists()).toBe(false)
      })
    })
  })

  describe('when closed', () => {
    it('renders nothing when closed', () => {
      const items = ['a', 'b', 'c']
      const wrapper = render({ isOpen: false, results: { items, totalResults: items.length, searchTerm: '' } })

      expect(wrapper.type()).toBe(null)
    })
  })
})
