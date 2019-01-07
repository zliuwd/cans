import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'

describe('ClientAssessmentHistoryTableEllipsis', () => {
  it('renders an Ellipsis when passed valid props', () => {
    const props = {
      original: {
        id: 1,
        person: { identifier: '123' },
        metadata: {
          allowed_operations: ['read', 'update', 'create', 'complete', 'write', 'delete'],
        },
        status: 'IN_PROGRESS',
        inheritUrl: '/staff/0X5',
        updateAssessmentHistoryCallback: () => {},
      },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableEllipsis {...props} />)
    expect(wrapper.find('Ellipsis').exists()).toBe(true)
  })
})
