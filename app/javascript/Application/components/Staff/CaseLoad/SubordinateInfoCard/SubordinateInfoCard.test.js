import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import SubordinateInfoCard from './SubordinateInfoCard'
import SubordinateInfoTable from './SubordinateInfoTable'
import { staff as mockStaff } from '../../staff.mocks.test'

describe('<SubordinateInfoCard />', () => {
  const render = () => shallow(<SubordinateInfoCard staffInfo={mockStaff[0]} />)

  it('renders a card', () => {
    const card = render().find(Card)
    expect(card.exists()).toBeTruthy()
    expect(card.props().loading).toBeUndefined()
  })

  it('renders header with a title', () => {
    const wrapper = render()
    expect(
      wrapper
        .find(CardHeader)
        .find(CardTitle)
        .html()
    ).toContain('Cassel, Jory')
  })

  it('has a SubordinateInfoCardTable in body', () => {
    const wrapper = render()
    const staffTable = wrapper.find(CardBody).find(SubordinateInfoTable)
    expect(staffTable.exists()).toBeTruthy()
    expect(staffTable.props().staffInfo).toBe(mockStaff[0])
  })

  it('renders nothing when staffId is not yet loaded', () => {
    const wrapper = shallow(<SubordinateInfoCard />)
    expect(wrapper.type()).toBe(null)
  })
})
