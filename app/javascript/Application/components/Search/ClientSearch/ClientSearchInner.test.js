import React from 'react'
import { shallow } from 'enzyme'
import ClientSearchInner from './ClientSearchInner'
import QueryInput from './QueryInput'
import QueryResults from './QueryResults'

const noop = () => {}
const getInputProps = (props = {}) => props
const getItemProps = (props = {}) => props
const getLabelProps = (props = {}) => props

describe('<ClientSearchInner />', () => {
  const render = ({ labelText = 'My Label', onQueryChange = noop, query = { searchTerm: '' } } = {}) =>
    shallow(
      <ClientSearchInner
        clearItems={noop}
        fetch={noop}
        getInputProps={getInputProps}
        getItemProps={getItemProps}
        getLabelProps={getLabelProps}
        isOpen={false}
        labelText={labelText}
        onQueryChange={onQueryChange}
        openMenu={noop}
        query={query}
      />
    )

  describe('when in default state', () => {
    it('has an empty query', () => {
      expect(
        render()
          .find(QueryResults)
          .props().query
      ).toEqual({
        searchTerm: '',
      })
    })

    it('renders closed results', () => {
      expect(
        render()
          .find(QueryResults)
          .props().isOpen
      ).toBe(false)
    })
  })

  describe('when the query changes from QueryInput', () => {
    let root
    const newQuery = 'New Query 123'
    const onQueryChange = jest.fn()

    beforeEach(() => {
      onQueryChange.mockReset()
      root = render({ onQueryChange })
      root
        .find(QueryInput)
        .props()
        .onChange({ target: { value: newQuery } })
      root.setProps({ isOpen: true })
      root.update()
    })

    it('updates the query searchTerm', () => {
      expect(onQueryChange).toHaveBeenCalledWith({ searchTerm: newQuery })
    })

    it('passes the getItemProps method to the query results', () => {
      expect(root.find(QueryResults).props().getItemProps).toEqual(getItemProps)
    })
  })

  it('renders results matching the query', () => {
    const query = { searchTerm: '123 ABC' }
    const root = render({ query })
    expect(root.find(QueryResults).props().query).toEqual(query)
  })

  it('passes the searchAfter to the results, separately from the query', () => {
    // It is important that it is separate, so that the QueryResults key can be calculated without knowledge of the structure of the query object
    const root = render()
    root.setProps({
      searchAfter: [123, 'Four Five Six'],
      query: { searchTerm: 'Marty McFly' },
    })
    expect(root.find(QueryResults).props().searchAfter).toEqual([123, 'Four Five Six'])
    expect(root.find(QueryResults).props().query).toEqual({ searchTerm: 'Marty McFly' })
  })
})
