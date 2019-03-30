import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogDate from './ChangeLogDate'

const defaultChange = {
  id: 123,
  user_id: 'RACFID',
  entity_id: 1,
  change_type: 'ADD',
  changes: [],
  assessment_change_type: 'CREATED',
}

describe('ChangeLogDate', () => {
  const change = { changed_at: '2018-11-19T16:48:45.110Z', ...defaultChange }

  it('renders a div', () => {
    const wrapper = shallow(<ChangeLogDate original={change} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders a formatted date', () => {
    const wrapper = shallow(<ChangeLogDate original={change} />)

    expect(wrapper.find('div').text()).toBe('11/19/2018 04:48:45 PM')
  })

  it('renders null if there is no date', () => {
    const noDateChange = { changed_at: null, ...defaultChange }
    const wrapper = shallow(<ChangeLogDate original={noDateChange} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if changed_at is undefined', () => {
    const wrapper = shallow(<ChangeLogDate original={defaultChange} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
