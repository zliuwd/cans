import React from 'react'
import AgeRangeSwitch from '../../common/AgeRangeSwitch'
import ComparisonAgeSwitchButtonGroup from './ComparisonAgeSwitchButtonGroup'
import { shallow } from 'enzyme'

const fakeProps = {
  isUnderSix: true,
  ageSwitch: () => {},
}

describe('<ComparisonAgeSwitchButtonGroup />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ComparisonAgeSwitchButtonGroup {...fakeProps} />)
  })

  it('will render one h5 title with text #Select CANS Template#', () => {
    const target = wrapper.find('h5')
    expect(target.length).toBe(1)
    expect(target.text()).toBe('Select CANS Template')
  })

  it('will render one AgeRangeSwitch with correct props', () => {
    const target = wrapper.find(AgeRangeSwitch)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('isUnderSix', 'onChange', 'disabled')
    expect(target.props().disabled).toBe(false)
  })
})
