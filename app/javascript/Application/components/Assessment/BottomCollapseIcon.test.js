import React from 'react'
import { mount } from 'enzyme'
import Icon from '@cwds/icons'
import BottomCollapseIcon from './BottomCollapseIcon'

const fakeProps = {
  code: 'TRM',
  onClick: jest.fn(),
  onKeyDown: jest.fn(),
}

describe('<BottomCollapseIcon />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<BottomCollapseIcon {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
    fakeProps.onClick.mockReset()
    fakeProps.onKeyDown.mockReset()
  })

  it('will render Icon', () => {
    const target = wrapper.find(Icon)
    expect(target.exists()).toBe(true)
  })

  it('will render Icon with correct props', () => {
    const target = wrapper.find(Icon)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().id).toBe('TRM-inner-collapse-icon')
    expect(typeof target.props().onClick).toBe('function')
    expect(typeof target.props().onKeyPress).toBe('function')
  })

  it('will invoke onClick after is clicked', () => {
    const target = wrapper.find(Icon)
    target.simulate('click')
    expect(fakeProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('will invoke onKeyDown when press the key Enter', () => {
    const target = wrapper.find(Icon)
    target.simulate('keypress', { key: 'Enter' })
    expect(fakeProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('will not invoke onKeyDown when press the key other than Enter', () => {
    const target = wrapper.find(Icon)
    target.simulate('keypress', { key: 'Tab' })
    expect(fakeProps.onClick).toHaveBeenCalledTimes(0)
  })
})
