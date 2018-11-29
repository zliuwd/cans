import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogStatus from './ChangeLogStatus'

const defaultChange = {
  id: 123,
  user_id: 'RACFID',
  entity_id: 1,
  change_type: 'ADD',
  changes: [],
  changed_at: '2018-11-19T16:48:45.110Z',
}

describe('ChangeLogStatus', () => {
  const change = { assessment_change_type: 'CREATED', ...defaultChange }

  it('renders a div', () => {
    const wrapper = shallow(<ChangeLogStatus original={change} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders null if there is no status change', () => {
    const noChangeType = { assessment_change_type: null, ...defaultChange }
    const wrapper = shallow(<ChangeLogStatus original={noChangeType} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if assessment_change_type is undefined', () => {
    const wrapper = shallow(<ChangeLogStatus original={defaultChange} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  describe('renders the change type', () => {
    it('maps CREATED to Saved', () => {
      const change = { assessment_change_type: 'CREATED', ...defaultChange }
      const wrapper = shallow(<ChangeLogStatus original={change} />)

      expect(wrapper.find('div').text()).toBe('Saved')
    })

    it('maps SAVED to Saved', () => {
      const change = { assessment_change_type: 'SAVED', ...defaultChange }
      const wrapper = shallow(<ChangeLogStatus original={change} />)

      expect(wrapper.find('div').text()).toBe('Saved')
    })

    it('maps COMPLETED to Completed', () => {
      const change = { assessment_change_type: 'COMPLETED', ...defaultChange }
      const wrapper = shallow(<ChangeLogStatus original={change} />)

      expect(wrapper.find('div').text()).toBe('Completed')
    })

    it('maps DELETED to Deleted', () => {
      const change = { assessment_change_type: 'DELETED', ...defaultChange }
      const wrapper = shallow(<ChangeLogStatus original={change} />)

      expect(wrapper.find('div').text()).toBe('Deleted')
    })
  })
})
