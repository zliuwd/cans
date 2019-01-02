import React from 'react'
import { shallow } from 'enzyme'
import Aggregator from './Aggregator'
import { LoadingState } from '../../../../util/loadingHelper'

const MyComponent = () => 'Hello!'

describe('Aggregator', () => {
  const data = { items: ['a', 'b', 'c'] }
  const render = () =>
    shallow(
      <Aggregator
        childNodeFetchedPropName="myProp"
        data={data}
        loadingState={LoadingState.ready}
        query={{ searchTerm: 'Original Query' }}
      >
        <MyComponent />
      </Aggregator>
    )

  it('renders the child component', () => {
    expect(
      render()
        .find(MyComponent)
        .exists()
    ).toBe(true)
  })

  it('passes the data from props to the corresponding child prop', () => {
    expect(
      render()
        .find(MyComponent)
        .props().myProp
    ).toEqual(data)
  })

  it('passes all the data it has ever seen', () => {
    const wrapper = render()
    const moreData = { items: ['d', 'e', 'f'] }
    wrapper.setProps({ data: moreData })
    const evenMoreData = { items: ['w', 'x', 'y', 'z'] }
    wrapper.setProps({ data: evenMoreData })
    expect(wrapper.find(MyComponent).props().myProp).toEqual({
      items: [...data.items, ...moreData.items, ...evenMoreData.items],
    })
  })

  it('does not save data when the loading state is not ready', () => {
    const newData = { items: ['d', 'e', 'f'] }
    const wrapper = render()
    wrapper.setProps({ loadingState: LoadingState.updating, data: newData })
    expect(wrapper.find(MyComponent).props().myProp).toEqual(data)
    wrapper.setProps({ loadingState: LoadingState.ready })
    expect(wrapper.find(MyComponent).props().myProp).toEqual({ items: [...data.items, ...newData.items] })
  })

  it('does not add duplicate items if the children changed', () => {
    const wrapper = render()
    const newChild = <MyComponent foo="bar" />
    wrapper.setProps({ children: newChild })
    expect(wrapper.find(MyComponent).props().myProp).toEqual(data)
  })

  describe('when the query changes', () => {
    const newQuery = { searchTerm: 'my new query' }
    const newData = { items: ['new'] }
    let wrapper

    beforeEach(() => {
      wrapper = render()
      wrapper.setProps({
        data: newData,
        loadingState: LoadingState.updating,
        query: newQuery,
      })
    })

    it('displays old data until loading state is ready', () => {
      expect(wrapper.find(MyComponent).props().myProp).toEqual(data)
    })

    it('clears the previous results when the loading state is ready', () => {
      wrapper.setProps({ loadingState: LoadingState.ready })
      expect(wrapper.find(MyComponent).props().myProp).toEqual(newData)
    })
  })
})
