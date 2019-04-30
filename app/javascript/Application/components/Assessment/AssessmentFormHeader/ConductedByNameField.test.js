import React from 'react'
import { shallow } from 'enzyme'
import ConductedByNameField from './ConductedByNameField'
import { Icon } from '@cwds/components'
import { ConductedByNameMaxLength } from '../AssessmentHelper'
import { clone } from '../../../util/common'

describe('<ConductedByNameField/>', () => {
  const props = {
    type: 'text',
    id: 'id',
    value: 'value',
    onChange: jest.fn(),
    disabled: false,
    maxLength: ConductedByNameMaxLength,
    label: 'label',
    errorMessage: 'errorMessage',
    fieldName: 'fieldName',
  }

  const longValue = '123456789012345678901234567890A'

  const errorProps = clone(props)
  errorProps.value = longValue
  errorProps.onChange = jest.fn()

  it('renders input', () => {
    const wrapper = shallow(<ConductedByNameField {...props} />)
    const input = wrapper.find('Input')
    expect(input.props().className).toBe('')
    expect(input.props().type).toBe(props.type)
    expect(input.props().id).toBe(props.id)
    expect(input.props().value).toBe(props.value)
    expect(input.props().onChange).toBe(wrapper.instance().handleConductedByNameChange)
    expect(input.props().disabled).toBe(props.disabled)
    expect(input.props().maxLength).toBe(props.maxLength)
    expect(
      wrapper
        .find('Label')
        .render()
        .text()
    ).toBe(props.label)
  })

  it('renders character counter', () => {
    const wrapper = shallow(<ConductedByNameField {...props} />)
    expect(wrapper.find('.form-field-length').length).toBe(1)
    expect(wrapper.text()).toContain(`${props.value.length}/${ConductedByNameMaxLength}`)
  })

  it('does not render error message if valid', () => {
    const wrapper = shallow(<ConductedByNameField {...props} />)
    expect(wrapper.text()).not.toContain(props.errorMessage)
    expect(wrapper.find(Icon).length).toBe(0)
  })

  it('renders error message if value is too long', () => {
    const wrapper = shallow(<ConductedByNameField {...errorProps} />)
    expect(wrapper.find(Icon).length).toBe(1)
    expect(wrapper.text()).toContain(props.errorMessage)
  })

  it('changes input class name if value is too long', () => {
    const wrapper = shallow(<ConductedByNameField {...errorProps} />)
    const input = wrapper.find('Input')
    expect(input.props().className).toBe('conducted-by-name-field-err')
  })

  it('changes counter class name if value is too long', () => {
    const wrapper = shallow(<ConductedByNameField {...errorProps} />)
    expect(wrapper.find('.form-field-length-err').length).toBe(1)
  })

  it('does not render counter if disabled', () => {
    const disabledProps = clone(props)
    disabledProps.disabled = true
    disabledProps.onChange = jest.fn()
    const wrapper = shallow(<ConductedByNameField {...disabledProps} />)
    expect(wrapper.text()).not.toContain(`${disabledProps.value.length}/${ConductedByNameMaxLength}`)
  })

  it('does not render error if disabled and invalid', () => {
    const disabledProps = clone(errorProps)
    disabledProps.disabled = true
    disabledProps.onChange = jest.fn()
    const wrapper = shallow(<ConductedByNameField {...disabledProps} />)
    expect(wrapper.text()).not.toContain(props.errorMessage)
    expect(wrapper.find(Icon).length).toBe(0)
  })

  it('field change triggers onChange call', () => {
    jest.resetAllMocks()
    const event = {
      target: {
        value: 'new name',
      },
    }
    const wrapper = shallow(<ConductedByNameField {...props} />)
    wrapper
      .find('#id')
      .props()
      .onChange(event)
    expect(props.onChange).toHaveBeenCalledWith(props.fieldName, event.target.value)
  })
})
