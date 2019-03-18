import React from 'react'
import { shallow } from 'enzyme'
import AgeRangeSwitch from './AgeRangeSwitch'

describe('<AgeRangeSwitch />', () => {
  const defaultProps = { onChange: () => {} }
  const render = props => shallow(<AgeRangeSwitch {...props} />)

  it('displays age buttons as unselected when isUnderSix is undefined', () => {
    const wrapper = render(defaultProps)

    expect(wrapper.find('.age-button').length).toBe(2)
    expect(wrapper.find('.age-button-selected').exists()).toBe(false)
  })

  it('toggles to under six when younger age group is clicked', () => {
    const onChange = jest.fn()
    const wrapper = render({ ...defaultProps, onChange })
    wrapper
      .find('.age-button')
      .at(0)
      .simulate('click')
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles to under six when older age group is clicked', () => {
    const onChange = jest.fn()
    const wrapper = render({ ...defaultProps, onChange })
    wrapper
      .find('.age-button')
      .at(1)
      .simulate('click')
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('propagates disabled prop to #age-0-5-button', () => {
    const wrapper = render({ ...defaultProps, disabled: true })
    expect(wrapper.find('#age-0-5-button').prop('disabled')).toEqual(true)
  })

  it('propagates disabled prop to #age-6-21-button', () => {
    const wrapper = render({ ...defaultProps, disabled: true })
    expect(wrapper.find('#age-6-21-button').prop('disabled')).toEqual(true)
  })

  describe('when isUnderSix is true', () => {
    it('selects first age button', () => {
      const wrapper = render({ ...defaultProps, isUnderSix: true })
      expect(wrapper.find('.age-button-selected').html()).toContain('Age: 0-5')
    })
  })

  describe('when isUnderSix is false', () => {
    it('selects second age button', () => {
      const wrapper = render({ ...defaultProps, isUnderSix: false })
      expect(wrapper.find('.age-button-selected').html()).toContain('Age: 6-21')
    })
  })
})
