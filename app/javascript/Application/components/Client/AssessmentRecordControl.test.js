import React from 'react'
import AddCansButton from './AddCansButton'
import RecordsModeSwitchButton from './RecordsModeSwitchButton'
import AssessmentRecordControl from './AssessmentRecordControl'
import { shallow } from 'enzyme'

const propsWithCreateCans = {
  activatedRecordSwitchButton: 'history',
  recordsModeSwitch: jest.fn(),
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  clientIdentifier: '123',
  disabled: false,
  isReassessment: true,
}

describe('<AssessmentRecordControl/>', () => {
  it('will render both AddCansButton and RecordsModeSwitchButton with correct props', () => {
    const wrapper = shallow(<AssessmentRecordControl {...propsWithCreateCans} />)
    const targetA = wrapper.find(AddCansButton)
    const targetB = wrapper.find(RecordsModeSwitchButton)
    expect(targetA.length).toBe(1)
    expect(Object.keys(targetA.props())).toContain('clientIdentifier', 'disabled', 'isReassessment')
    expect(targetB.length).toBe(1)
    expect(Object.keys(targetB.props())).toContain('activatedRecordSwitchButton', 'recordsModeSwitch', 'assessments')
    wrapper.unmount()
  })
})
