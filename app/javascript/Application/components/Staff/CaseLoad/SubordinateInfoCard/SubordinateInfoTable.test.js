import React from 'react'
import { shallow } from 'enzyme'
import SubordinateInfoTable from './SubordinateInfoTable'
import SubordinateInfoCountRecord from './SubordinateInfoCountRecord'
import SubordinateInfoRecord from './SubordinateInfoRecord'
import SubordinateInfoTotalRecord from './SubordinateInfoTotalRecord'
import { staff as mockStaff } from '../../staff.mocks.test'

describe('<SubordinateInfoCardTable />', () => {
  const render = staffInfo => shallow(<SubordinateInfoTable staffInfo={staffInfo} />)

  it('renders 1 SubordinateInfoTotalRecord elements', () => {
    const rows = render(mockStaff[0]).find(SubordinateInfoTotalRecord)
    expect(rows.exists()).toBeTruthy()
    expect(rows.props()).toEqual({ totalClientsCount: 10 })
  })

  it('renders 3 SubordinateInfoTableCountRecord elements', () => {
    const rows = render(mockStaff[0]).find(SubordinateInfoCountRecord)
    expect(rows.length).toBe(3)
    expect(rows.at(0).props()).toEqual({ caption: 'No Prior', value: 4 })
    expect(rows.at(1).props()).toEqual({ caption: 'In Progress', value: 5 })
    expect(rows.at(2).props()).toEqual({ caption: 'Complete', value: 1 })
  })

  it('renders 3 SubordinateInfoTableRecord elements', () => {
    const rows = render(mockStaff[0]).find(SubordinateInfoRecord)
    expect(rows.length).toBe(3)
    expect(rows.at(0).props()).toEqual({
      caption: 'County',
      value: 'Santa Cruz',
    })
    expect(rows.at(1).props()).toEqual({
      caption: 'Phone',
      value: '916-765-4321 ext. 4321',
    })
    expect(rows.at(2).props()).toEqual({
      caption: 'Email',
      value: 'e@mail.com',
    })
  })
})
