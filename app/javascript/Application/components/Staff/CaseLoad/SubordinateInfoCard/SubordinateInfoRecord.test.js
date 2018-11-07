import React from 'react'
import { shallow } from 'enzyme'
import SubordinateInfoRecord from './SubordinateInfoRecord'

describe('<SubordinateInfoRecord />', () => {
  const render = (caption, value) => shallow(<SubordinateInfoRecord caption={caption} value={value} />)

  it('renders caption and value', () => {
    const wrapper = render('caption', 'value')
    expect(wrapper.text()).toEqual('caption:value')
  })

  it('renders caption and default value', () => {
    const wrapper = render('caption')
    expect(wrapper.text()).toEqual('caption:')
  })
})
