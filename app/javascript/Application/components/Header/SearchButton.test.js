import React from 'react'
import { shallow } from 'enzyme'
import SearchButton from './SearchButton'
import { Button } from '@cwds/components'
import { Link } from 'react-router-dom'

describe('<SearchButton />', () => {
  const getWrapper = () => shallow(<SearchButton />)
  it('renders with <Link /> component', () => {
    const wrapper = getWrapper()
    expect(wrapper.find(Link).length).toBe(1)
  })

  it('renders with <Button /> component', () => {
    const wrapper = getWrapper()
    expect(wrapper.find(Button).length).toBe(1)
  })

  it('has the Link to /search page', () => {
    const wrapper = getWrapper()
    expect(wrapper.find(Link).prop('to')).toBe(`/search`)
  })

  it('has the client search button with label Client Search', () => {
    const wrapper = getWrapper()
    expect(
      wrapper
        .find(Button)
        .dive()
        .find('.client-search-button')
        .html()
    ).toContain('Client Search')
  })
})
