import React from 'react'
import { shallow } from 'enzyme'
import SubordinateInfoCountRecord from './SubordinateInfoCountRecord'

describe('<SubordinateInfoTableCountRecord />', () => {
  const render = (caption, value) => shallow(<SubordinateInfoCountRecord caption={caption} value={value} />)

  it('renders caption and value', () => {
    const wrapper = render('caption', 10)
    expect(wrapper.text()).toEqual('caption:10')
  })
})
