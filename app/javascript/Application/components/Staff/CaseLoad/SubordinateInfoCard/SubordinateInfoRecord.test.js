import React from 'react'
import { shallow } from 'enzyme'
import SubordinateInfoRecord from './SubordinateInfoRecord'

describe('<SubordinateInfoRecord />', () => {
  const render = (caption, value) => shallow(<SubordinateInfoRecord caption={caption} value={value} />)

  it('renders a caption and a string value', () => {
    const wrapper = render('caption', 'value')
    expect(wrapper.text()).toEqual('caption:value')
  })

  it('renders a caption and a node value', () => {
    const wrapper = render('caption', <div>div value</div>)
    expect(wrapper.text()).toEqual('caption:div value')
  })

  it('renders a caption and the default value', () => {
    const wrapper = render('caption')
    expect(wrapper.text()).toEqual('caption:')
  })
})
