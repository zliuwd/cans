import React from 'react'
import { clone } from '../../../util/common'
import './style.sass'
import ConductedByNameField from './ConductedByNameField'
import ConductedByRole from './ConductedByRole'
import ConductedBy from './ConductedBy'
import { shallow } from 'enzyme'

describe('Assessment Conducted by', () => {
  const onAssessmentUpdate = jest.fn()
  const assessment = {
    conducted_by_first_name: 'conducted_by_first_name',
    conducted_by_last_name: 'conducted_by_last_name',
    conducted_by_role: 'UNKNOWN',
  }

  const props = {
    assessment,
    onAssessmentUpdate: onAssessmentUpdate,
    disabled: false,
  }

  it('renders first name input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const firstNameInput = wrapper.find(ConductedByNameField).at(0)
    expect(firstNameInput.props().value).toBe(assessment.conducted_by_first_name)
    expect(firstNameInput.props().disabled).toBe(props.disabled)
    expect(firstNameInput.props().id).toBe('conducted-by-first-name')
    expect(firstNameInput.props().label).toBe('First Name *')
    expect(firstNameInput.props().onChange).toBe(wrapper.instance().handleConductedByFirstNameChange)
    expect(firstNameInput.props().errorMessage).toBe('First name is too long')
  })

  it('renders last name input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const lastNameInput = wrapper.find(ConductedByNameField).at(1)
    expect(lastNameInput.props().value).toBe(assessment.conducted_by_last_name)
    expect(lastNameInput.props().disabled).toBe(props.disabled)
    expect(lastNameInput.props().id).toBe('conducted-by-last-name')
    expect(lastNameInput.props().label).toBe('Last Name *')
    expect(lastNameInput.props().onChange).toBe(wrapper.instance().handleConductedByLastNameChange)
    expect(lastNameInput.props().errorMessage).toBe('')
  })

  it('renders role input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const roleInput = wrapper.find(ConductedByRole).at(0)
    expect(roleInput.props().value).toBe(assessment.conducted_by_role)
    expect(roleInput.props().disabled).toBe(props.disabled)
    expect(roleInput.props().onChange).toBe(wrapper.instance().handleConductedByRoleChange)
  })

  it('renders label', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const label = wrapper.find('legend').at(0)
    expect(label.render().text()).toBe('Assessment Conducted By')
  })

  it('handleConductedByFirstNameChange calls onAssessmentUpdate', () => {
    jest.resetAllMocks()
    const event = {
      target: {
        value: `${assessment.conducted_by_first_name}new`,
      },
    }
    const newAssessment = clone(assessment)
    newAssessment.conducted_by_first_name = event.target.value
    const wrapper = shallow(<ConductedBy {...props} />)
    wrapper
      .find('#conducted-by-first-name')
      .props()
      .onChange(event)
    expect(onAssessmentUpdate).toHaveBeenCalledWith(newAssessment)
  })

  it('handleConductedByLastNameChange calls onAssessmentUpdate', () => {
    jest.resetAllMocks()
    const event = {
      target: {
        value: `${assessment.conducted_by_last_name}new`,
      },
    }
    const newAssessment = clone(assessment)
    newAssessment.conducted_by_last_name = event.target.value
    const wrapper = shallow(<ConductedBy {...props} />)
    wrapper
      .find('#conducted-by-last-name')
      .props()
      .onChange(event)
    expect(onAssessmentUpdate).toHaveBeenCalledWith(newAssessment)
  })

  it('handleConductedByRoleChange calls onAssessmentUpdate', () => {
    jest.resetAllMocks()
    const event = {
      value: 'OTHER',
    }
    const newAssessment = clone(assessment)
    newAssessment.conducted_by_role = event.value
    const wrapper = shallow(<ConductedBy {...props} />)
    wrapper
      .find(ConductedByRole)
      .props()
      .onChange(event)
    expect(onAssessmentUpdate).toHaveBeenCalledWith(newAssessment)
  })
})
