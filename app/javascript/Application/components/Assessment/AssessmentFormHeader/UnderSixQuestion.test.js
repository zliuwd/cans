import React from 'react'
import { shallow } from 'enzyme'
import UnderSixQuestion from './UnderSixQuestion'

describe('<UnderSixQuestion />', () => {
  const render = ({ isUnderSix, onChange = () => {} } = {}) =>
    shallow(<UnderSixQuestion isUnderSix={isUnderSix} onChange={onChange} />)

  it('displays age buttons as unselected when isUnderSix is undefined', () => {
    const wrapper = render()

    expect(wrapper.find('.age-button').length).toBe(2)
    expect(wrapper.find('.age-button-selected').exists()).toBe(false)
  })

  it('toggles to under six when younger age group is clicked', () => {
    const onChange = jest.fn()
    const wrapper = render({ onChange })
    wrapper
      .find('.age-button')
      .at(0)
      .simulate('click')
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles to under six when older age group is clicked', () => {
    const onChange = jest.fn()
    const wrapper = render({ onChange })
    wrapper
      .find('.age-button')
      .at(1)
      .simulate('click')
    expect(onChange).toHaveBeenCalledWith(false)
  })

  describe('when isUnderSix is true', () => {
    it('selects first age button', () => {
      const wrapper = render({ isUnderSix: true })
      expect(wrapper.find('.age-button-selected').html()).toContain('Age: 0-5')
    })
  })

  describe('when isUnderSix is false', () => {
    it('selects second age button', () => {
      const wrapper = render({ isUnderSix: false })
      expect(wrapper.find('.age-button-selected').html()).toContain('Age: 6-21')
    })
  })
})
