import React from 'react'
import { Icon } from '@cwds/components'
import Typography from '@material-ui/core/Typography'
import { mount } from 'enzyme'
import ItemHeader from './ItemHeader'

const fakeProps = {
  code: 'TRM',
  isExpanded: true,
  onClick: jest.fn(),
  onKeyDown: jest.fn(),
  itemNumber: '10',
  caregiverIndex: 'a',
  title: 'someTitle',
}

describe('<ItemHeader />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ItemHeader {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a chevron pointing down when expanded', () => {
    const target = wrapper.find(Icon)
    expect(target.props().id).toContain(fakeProps.code)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toBe(null)
    expect(typeof target.props().onClick).toBe('function')
    expect(typeof target.props().onKeyDown).toBe('function')
  })

  it('will render a chevron pointing right when not expanded', () => {
    const closedWrapper = mount(<ItemHeader {...fakeProps} isExpanded={false} />)
    const target = closedWrapper.find(Icon)
    expect(target.props().id).toContain(fakeProps.code)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toBe(270)
    expect(typeof target.props().onClick).toBe('function')
    expect(typeof target.props().onKeyDown).toBe('function')
    closedWrapper.unmount()
  })

  it('will render a title with correct text', () => {
    const target = wrapper.find(Typography)
    expect(target.text()).toBe(`${fakeProps.itemNumber + fakeProps.caregiverIndex}. ${fakeProps.title}`)
  })

  it('will invoke onClick when chevron is clicked', () => {
    const target = wrapper.find(Icon)
    target.simulate('click')
    expect(fakeProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('will invoke onClick when chevron get keypress', () => {
    const target = wrapper.find(Icon)
    target.simulate('keydown')
    expect(fakeProps.onKeyDown).toHaveBeenCalledTimes(1)
  })
})
