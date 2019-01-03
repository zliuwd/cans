import React from 'react'
import { shallow } from 'enzyme'
import ResultsLoadingBoundary from './ResultsLoadingBoundary'
import Results from './Results'
import QueryResults from './QueryResults'

const getItemProps = (props = {}) => props
const clearItems = () => {}
const fetch = () => {}

describe('<QueryResults />', () => {
  const query = { searchTerm: 'any' }
  const render = ({ isOpen = true } = {}) =>
    shallow(
      <QueryResults clearItems={clearItems} fetch={fetch} getItemProps={getItemProps} isOpen={isOpen} query={query} />
    )

  it('renders a loading boundary that wraps the results', () => {
    expect(
      render()
        .find(ResultsLoadingBoundary)
        .find(Results)
        .exists()
    ).toBe(true)
  })

  it('sends the searchAfter and query separately', () => {
    const root = render()
    root.setProps({ searchAfter: [0, 'Hello'] })
    expect(root.find(ResultsLoadingBoundary).props().query).toEqual(query)
    expect(root.find(ResultsLoadingBoundary).props().searchAfter).toEqual([0, 'Hello'])
  })

  it('passes Downshift callbacks to the results', () => {
    const props = render()
      .find(Results)
      .props()
    expect(props.getItemProps).toBe(getItemProps)
    expect(props.clearItems).toBe(clearItems)
  })

  it('renders open Results when open', () => {
    expect(
      render({ isOpen: true })
        .find(Results)
        .props().isOpen
    ).toBe(true)
  })

  it('renders closed Results when closed', () => {
    expect(
      render({ isOpen: false })
        .find(Results)
        .props().isOpen
    ).toBe(false)
  })
})
