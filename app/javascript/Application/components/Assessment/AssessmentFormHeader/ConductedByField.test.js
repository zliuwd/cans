import React from 'react'
import { shallow } from 'enzyme'
import ConductedByField from './ConductedByField'

describe('<ConductedByField/>', () => {
  const props = {
    id: 'some_id',
    value: 'some_value',
    onChange: jest.fn(),
  }

  it('renders input', () => {
    const wrapper = shallow(<ConductedByField {...props} />)
    const input = wrapper.find('Input')
    expect(input.prop('id')).toBe(props.id)
    expect(input.prop('value')).toBe(props.value)
    expect(input.prop('disabled')).toBeFalsy()
  })

  it('disabled when props has disabled = true', () => {
    const wrapper = shallow(<ConductedByField disabled={true} />)
    expect(wrapper.find('Input').prop('disabled')).toBeTruthy()
  })

  it('calls onChange', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<ConductedByField {...props} onChange={mockFn} />)
    const event = { target: { name: 'conducted_by', value: 'conductedByValue' } }
    wrapper.find('Input').simulate('change', event)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('quietly does nothing when no onChange is provided', () => {
    expect(() => {
      shallow(<ConductedByField />)
        .props()
        .onChange()
    }).not.toThrow()
  })
})
