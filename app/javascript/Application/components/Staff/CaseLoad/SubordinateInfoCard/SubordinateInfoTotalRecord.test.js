import React from 'react'
import { shallow } from 'enzyme'
import SubordinateInfoTotalRecord from './SubordinateInfoTotalRecord'

describe('<SubordinateInfoTotalRecord />', () => {
  const render = value => shallow(<SubordinateInfoTotalRecord totalClientsCount={value} />)

  it('renders caption and value', () => {
    const wrapper = render(10)
    expect(wrapper.text()).toEqual('10Total Clients')
  })
})
