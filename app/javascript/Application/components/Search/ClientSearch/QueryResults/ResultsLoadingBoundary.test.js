import React from 'react'
import { shallow } from 'enzyme'
import ResultsLoadingBoundary from './ResultsLoadingBoundary'
import Aggregator from './Aggregator'
import LoadingBoundary from '../../../common/LoadingBoundary'

const MyComponent = () => 'Hello'

describe('<ResultsLoadingBoundary />', () => {
  const fetch = jest.fn()

  const render = searchTerm =>
    shallow(
      <ResultsLoadingBoundary query={{ searchTerm }} fetch={fetch}>
        <MyComponent />
      </ResultsLoadingBoundary>
    )

  beforeEach(() => {
    jest.resetAllMocks()
    fetch.mockReturnValue(Promise.resolve())
  })

  it('renders LoadingBoundary and Aggregator with results property', () => {
    const wrapper = render('XYZ')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('data')

    const aggregator = loadingBoundary.find(Aggregator)
    expect(aggregator.props().childNodeFetchedPropName).toBe('results')
  })

  describe('when fetching data', () => {
    const expectedItems = [0, 1, 2]
    const total = 465
    let wrapper
    let actualResults

    beforeEach(async () => {
      fetch.mockReturnValue(Promise.resolve({ items: expectedItems, totalResults: total }))
      wrapper = render('Johnny McRealPerson')
      actualResults = await wrapper.props().fetch()
    })

    it('fetches clients based on query', async () => {
      expect(fetch).toHaveBeenCalledWith({ searchTerm: 'Johnny McRealPerson' })
      expect(actualResults.items).toEqual(expectedItems)
    })

    it('fetches total number of results from the SearchService response', () => {
      expect(actualResults.totalResults).toBe(total)
    })

    it('adds the search term to the results object', () => {
      expect(actualResults.searchTerm).toBe('Johnny McRealPerson')
    })
  })

  describe('when there is no query', () => {
    it('returns empty results', async () => {
      const wrapper = render('')

      const actualResults = await wrapper.props().fetch()

      expect(actualResults.items).toEqual([])
      expect(actualResults.totalResults).toEqual(0)
      expect(actualResults.searchTerm).toEqual('')
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  it('renders the aggregator with a new query when query changes', () => {
    const wrapper = render('Johnny McRealPerson')
    const firstQuery = wrapper.find(Aggregator).props().query

    wrapper.setProps({ query: { searchTerm: 'Fay McFakeFace' } })
    const secondQuery = wrapper.find(Aggregator).props().query
    expect(secondQuery).not.toEqual(firstQuery)
  })

  it('renders the aggregator with the same query when the searchAfter changes', () => {
    const wrapper = render('Johnny McRealPerson')
    const firstQuery = wrapper.find(Aggregator).props().query

    wrapper.setProps({ searchAfter: [2, 'Me'] })
    const secondQuery = wrapper.find(Aggregator).props().query
    expect(secondQuery).toBe(firstQuery)
  })

  it('renders the aggregator with the same key when the children change', () => {
    const wrapper = render('Johnny McRealPerson')
    const firstKey = wrapper.find(Aggregator).key()

    wrapper.setProps({ children: <span id="new" /> })
    const secondKey = wrapper.find(Aggregator).key()
    expect(firstKey).toBe(secondKey)
  })

  it('uses a new fetch method when the query changes', () => {
    // When the query changes, load new results
    const wrapper = render('Johnny McRealPerson')
    const firstFetch = wrapper.props().fetch

    wrapper.setProps({ query: { searchTerm: 'Fay McFakeFace' } })
    const secondFetch = wrapper.props().fetch
    expect(firstFetch).not.toBe(secondFetch)
  })

  it('uses a new fetch method when the searchAfter changes', () => {
    // When the search after changes, load more results
    const wrapper = render('Johnny McRealPerson')
    const firstFetch = wrapper.props().fetch

    wrapper.setProps({ searchAfter: [1, 'Fay McFakeFace'] })
    const secondFetch = wrapper.props().fetch
    expect(firstFetch).not.toBe(secondFetch)
  })

  it('uses the same fetch method when the children change', () => {
    // When the children change, we are probably just highlighting a new item
    const wrapper = render('Johnny McRealPerson')
    const firstFetch = wrapper.props().fetch

    wrapper.setProps({ children: <span id="new" /> })
    const secondFetch = wrapper.props().fetch
    expect(firstFetch).toBe(secondFetch)
  })
})
