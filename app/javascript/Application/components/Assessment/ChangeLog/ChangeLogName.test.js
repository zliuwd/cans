import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogName from './ChangeLogName'

const defaultChange = {
  id: 123,
  user_id: 'RACFID',
  entity_id: 1,
  change_type: 'ADD',
  changes: [],
  assessment_change_type: 'CREATED',
  changed_at: '2018-11-19T16:48:45.110Z',
}

describe('ChangeLogName', () => {
  it('renders a div', () => {
    const wrapper = shallow(<ChangeLogName original={defaultChange} />)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders the last and first name', () => {
    const change = {
      user_first_name: 'Casey',
      user_last_name: 'Test',
      ...defaultChange,
    }
    const wrapper = shallow(<ChangeLogName original={change} />)
    expect(wrapper.find('div').text()).toBe('Test, Casey')
  })

  it('renders user_id if there is no first and last name', () => {
    const wrapper = shallow(<ChangeLogName original={defaultChange} />)
    expect(wrapper.find('div').text()).toBe('RACFID')
  })

  it('renders null if user_id and first and last name are undefined', () => {
    const change = {
      id: 123,
      entity_id: 1,
      change_type: 'ADD',
      changes: [],
      assessment_change_type: 'CREATED',
      changed_at: '2018-11-19T16:48:45.110Z',
    }
    const wrapper = shallow(<ChangeLogName original={change} />)
    expect(wrapper.type()).toBe(null)
  })
})
