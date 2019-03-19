import React from 'react'
import { Icon } from '@cwds/components'
import { mount } from 'enzyme'
import ComparisonOuterTableExpander from './ComparisonOuterTableExpander'

const fakeExpandedProps = {
  isExpanded: true,
}
const fakeCollapsedProps = {
  isExpanded: false,
}

describe('<ComparisonOuterTableExpander />', () => {
  let wrapper
  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a Icon with rotation 180 when expanded', () => {
    wrapper = mount(<ComparisonOuterTableExpander {...fakeExpandedProps} />)
    const target = wrapper.find(Icon)
    expect(target.length).toBe(1)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toBe(180)
  })

  it('will render a Icon without rotation when collapsed', () => {
    wrapper = mount(<ComparisonOuterTableExpander {...fakeCollapsedProps} />)
    const target = wrapper.find(Icon)
    expect(target.length).toBe(1)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toEqual(null)
  })
})
