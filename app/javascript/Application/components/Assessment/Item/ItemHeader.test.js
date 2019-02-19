import React from 'react'
import Typography from '@material-ui/core/Typography'
import { mount } from 'enzyme'
import ItemHeader from './ItemHeader'

const fakeProps = {
  code: 'TRM',
  classes: 'someClasses',
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

  it('will render a chevron with correct props', () => {
    const target = wrapper.find('i')
    expect(target.props().id).toContain(fakeProps.code)
    expect(target.props().className).toBe(fakeProps.classes)
    expect(typeof target.props().onClick).toBe('function')
    expect(typeof target.props().onKeyDown).toBe('function')
  })

  it('will render a title with correct text', () => {
    const target = wrapper.find(Typography)
    expect(target.text()).toBe(`${fakeProps.itemNumber + fakeProps.caregiverIndex}. ${fakeProps.title}`)
  })

  it('will invoke onClick when chevron is clicked', () => {
    const target = wrapper.find('i')
    target.simulate('click')
    expect(fakeProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('will invoke onClick when chevron get keypress', () => {
    const target = wrapper.find('i')
    target.simulate('keydown')
    expect(fakeProps.onKeyDown).toHaveBeenCalledTimes(1)
  })
})
