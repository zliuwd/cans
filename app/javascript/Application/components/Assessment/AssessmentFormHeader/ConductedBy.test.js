import React from 'react'
import './style.sass'
import ConductedByNameField from './ConductedByNameField'
import ConductedByRole from './ConductedByRole'
import ConductedBy from './ConductedBy'
import { shallow } from 'enzyme'

describe('Assessment Conducted by', () => {
  const props = {
    disabled: false,
    firstName: 'firstName',
    lastName: 'firstName',
    onChange: jest.fn(),
    role: 'role',
  }

  it('renders first name input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const firstNameInput = wrapper.find(ConductedByNameField).at(0)
    expect(firstNameInput.props().value).toBe(props.firstName)
    expect(firstNameInput.props().disabled).toBe(props.disabled)
    expect(firstNameInput.props().id).toBe('conducted-by-first-name')
    expect(firstNameInput.props().label).toBe('First Name *')
    expect(firstNameInput.props().onChange).toBe(props.onChange)
    expect(firstNameInput.props().errorMessage).toBe('First name is too long')
  })

  it('renders last name input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const lastNameInput = wrapper.find(ConductedByNameField).at(1)
    expect(lastNameInput.props().value).toBe(props.lastName)
    expect(lastNameInput.props().disabled).toBe(props.disabled)
    expect(lastNameInput.props().id).toBe('conducted-by-last-name')
    expect(lastNameInput.props().label).toBe('Last Name *')
    expect(lastNameInput.props().onChange).toBe(props.onChange)
    expect(lastNameInput.props().errorMessage).toBe('')
  })

  it('renders role input', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const roleInput = wrapper.find(ConductedByRole).at(0)
    expect(roleInput.props().value).toBe(props.role)
    expect(roleInput.props().disabled).toBe(props.disabled)
    expect(roleInput.props().onChange).toBe(props.onChange)
  })

  it('renders label', () => {
    const wrapper = shallow(<ConductedBy {...props} />)
    const label = wrapper.find('legend').at(0)
    expect(label.render().text()).toBe('Assessment Conducted By')
  })
})
