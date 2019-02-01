import React from 'react'
import { mount } from 'enzyme'
import ClientAssessmentHistoryTableStatus from './ClientAssessmentHistoryTableStatus'
import AssessmentRecordStatus from '../../Assessment/AssessmentRecordStatus'

describe('ClientAssessmentHistoryTableStatus', () => {
  it('renders AssessmentRecordStatus with right props', () => {
    const props = {
      original: { status: 'COMPLETED' },
    }
    const wrapper = mount(<ClientAssessmentHistoryTableStatus {...props} />)
    const target = wrapper.find(AssessmentRecordStatus)
    expect(target.exists()).toBe(true)
    expect(target.props().isForTable).toBe(true)
    expect(target.props().status).toBe('COMPLETED')
  })

  it('will not render AssessmentRecordStatus if the status is undefined', () => {
    const props = {
      original: { status: '' },
    }
    const wrapper = mount(<ClientAssessmentHistoryTableStatus {...props} />)
    expect(wrapper.find(AssessmentRecordStatus).exists()).toBe(false)
  })
})
