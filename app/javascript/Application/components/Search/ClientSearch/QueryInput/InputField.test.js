import React from 'react'
import { shallow } from 'enzyme'
import InputField from './InputField'

describe('<InputField />', () => {
  it('renders an input with all of the props', () => {
    const wrapper = shallow(<InputField foo="bar" baz="123" className="hello" />)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.props().foo).toBe('bar')
    expect(wrapper.props().baz).toBe('123')
    expect(wrapper.props().className).toBe('hello')
    expect(wrapper.props().placeholder).toBe(
      'Enter: Last Name, First Name DOB (MM/DD/YYYY), example: Smith, Joe 02/13/2008'
    )
  })

  it('unwraps the value from the event on change', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<InputField onChange={onChange} />)
    const event = { target: { value: 'My Event Value' } }

    wrapper
      .find('input')
      .props()
      .onChange(event)

    expect(onChange).toHaveBeenCalledWith(event.target.value)
  })

  it('transforms into an empty string values that are too short to search', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<InputField onChange={onChange} />)
    const event = { target: { value: 'M' } }

    wrapper
      .find('input')
      .props()
      .onChange(event)

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('transforms into an empty string values that are too short with whitespace', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<InputField onChange={onChange} />)
    const event = { target: { value: '  M' } }

    wrapper
      .find('input')
      .props()
      .onChange(event)

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('manages its own state separately from parent, which may be debounced', () => {
    const wrapper = shallow(<InputField />)
    const event = { target: { value: 'My Event Value' } }

    wrapper
      .find('input')
      .props()
      .onChange(event)

    expect(wrapper.state().value).toBe('My Event Value')
    expect(wrapper.find('input').props().value).toBe('My Event Value')
  })

  it('opens the menu when the input is focused', () => {
    const openMenu = jest.fn()
    const wrapper = shallow(<InputField openMenu={openMenu} />)
    wrapper.setState({ value: 'John' })

    wrapper
      .find('input')
      .props()
      .onFocus()

    expect(openMenu).toHaveBeenCalledTimes(1)
  })

  it('does not open the menu when the input is focused if the value is too short', () => {
    const openMenu = jest.fn()
    const wrapper = shallow(<InputField openMenu={openMenu} />)
    wrapper.setState({ value: '' })

    wrapper
      .find('input')
      .props()
      .onFocus()

    expect(openMenu).not.toHaveBeenCalled()
  })
})
