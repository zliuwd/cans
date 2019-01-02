import React from 'react'
import { mount, shallow } from 'enzyme'
import Downshift from 'downshift'
import ClientSearch from './ClientSearch'
import ClientSearchInner from './ClientSearchInner'

describe('<ClientSearch />', () => {
  const render = ({ fetch = () => Promise.resolve([]), labelText, onSelect = () => {} } = {}) =>
    mount(<ClientSearch fetch={fetch} labelText={labelText} onSelect={onSelect} />)
  const shallowRender = ({ fetch = () => Promise.resolve([]), labelText, onSelect = () => {} } = {}) =>
    shallow(<ClientSearch fetch={fetch} labelText={labelText} onSelect={onSelect} />)

  it('renders a Downshift state manager', () => {
    expect(
      render()
        .find(Downshift)
        .exists()
    ).toBe(true)
  })

  it('renders input and label with matching props', () => {
    const root = render()
    const input = root.find('input')
    const label = root.find('label')
    expect(input.props().id).toBeDefined()
    expect(label.props().htmlFor).toBeDefined()
    expect(input.props().id).toBe(label.props().htmlFor)
  })

  it('has a default label', () => {
    const root = render()
    expect(root.find('label').text()).toBe('Search for clients')
  })

  it('renders custom labels', () => {
    const labelText = 'Search Me'
    const root = render({ labelText })
    expect(root.find('label').text()).toBe(labelText)
  })

  it('controls isOpen state of Downshift', () => {
    const root = shallowRender()
    root.setState({ query: { searchTerm: 'Hello' } })
    root.update()
    const onStateChange = root.find(Downshift).props().onStateChange

    const isOpenInitially = root.state().isOpen

    onStateChange({ isOpen: !isOpenInitially })
    root.update()
    expect(root.find(Downshift).props().isOpen).toBe(!isOpenInitially)
  })

  it('stays closed when the query is not searchable', () => {
    const root = render()
    root.setState({ query: { searchTerm: '' } })
    const onStateChange = root.find(Downshift).props().onStateChange

    onStateChange({ isOpen: true })
    root.update()
    expect(root.find(Downshift).props().isOpen).toBe(false)
  })

  it('defaults to a fresh query', () => {
    const initialState = render().state()
    expect(initialState.searchAfter).toBe(null)
    expect(initialState.query).toEqual({ searchTerm: '' })
  })

  it('is initially closed', () => {
    expect(
      render()
        .find(Downshift)
        .props().isOpen
    ).toBe(false)
  })

  describe('selecting', () => {
    const onSelect = jest.fn()
    let root

    beforeEach(() => {
      onSelect.mockReset()
      root = render({ onSelect })
    })

    describe('when a client is selected', () => {
      const myClient = 'Fay Klient'

      beforeEach(() => {
        root
          .find(Downshift)
          .props()
          .onSelect(myClient)
        root.update()
      })

      it('passes selected client to parent when Downshift reports a selection', () => {
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith(myClient)
      })

      it('lets the menu close', () => {
        expect(root.find(Downshift).props().isOpen).toBe(false)
      })
    })

    describe('when Show More Results is selected', () => {
      const action = { type: 'action', action: 'Show More Results', searchAfter: [1, 'my-sort'] }
      beforeEach(() => {
        root
          .find(Downshift)
          .props()
          .onSelect(action)
        root.update()
      })

      it('keeps the menu open', () => {
        expect(root.find(Downshift).props().isOpen).toBe(true)
      })

      it('renders the inner component with the searchAfter value', () => {
        expect(root.find(ClientSearchInner).props().searchAfter).toEqual([1, 'my-sort'])
      })
    })
  })

  describe('when the query changes', () => {
    let root
    const fetch = jest.fn(() => Promise.resolve({ items: [], totalResults: 0 }))

    beforeEach(() => {
      fetch.mockClear()
      root = render({ fetch })
      root.setState({ searchAfter: [0, 'hello'] })
    })

    describe('when the query is searchable', () => {
      const newQuery = { searchTerm: 'my new query' }

      beforeEach(() => {
        root
          .find(ClientSearchInner)
          .props()
          .onQueryChange(newQuery)
      })

      it('updates the query in state', () => {
        expect(root.state().query).toEqual(newQuery)
      })

      it('clears the searchAfter', () => {
        expect(root.state().searchAfter).toEqual(null)
      })

      it('sends the new query to the ClientSearchInner', () => {
        root.update()
        expect(root.find(ClientSearchInner).props().query).toEqual(newQuery)
      })

      it('calls the fetch method', () => {
        expect(fetch).toHaveBeenCalledWith(newQuery)
      })
    })

    describe('when the query is not searchable', () => {
      const newQuery = { searchTerm: '' }

      beforeEach(() => {
        root.setState({ isOpen: true })
        root
          .find(ClientSearchInner)
          .props()
          .onQueryChange(newQuery)
      })

      it('updates the query in state', () => {
        expect(root.state().query).toEqual(newQuery)
      })

      it('clears the searchAfter', () => {
        expect(root.state().searchAfter).toEqual(null)
      })

      it('sends the new query to the ClientSearchInner', () => {
        root.update()
        expect(root.find(ClientSearchInner).props().query).toEqual(newQuery)
      })

      it('closes the menu', () => {
        expect(root.state().isOpen).toBe(false)
      })
    })
  })
})
