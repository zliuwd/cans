import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogComment from './ChangeLogComment'

const defaultChange = {
  id: 123,
  user_id: 'RACFID',
  entity_id: 1,
  change_type: 'ADD',
  changes: [],
  assessment_change_type: 'DELETED',
  changed_at: '2018-11-19T16:48:45.110Z',
  deletion_reason: 'reason',
}

describe('ChangeLogName', () => {
  it('renders a div', () => {
    const wrapper = shallow(<ChangeLogComment original={defaultChange} />)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders reason', () => {
    const wrapper = shallow(<ChangeLogComment original={defaultChange} />)
    expect(wrapper.find('div').text()).toBe('reason')
  })
})
