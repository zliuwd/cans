import React from 'react'
import { shallow } from 'enzyme'
import Debouncer from './Debouncer'
import InputField from './InputField'
import QueryInput from './QueryInput'

describe('<QueryInput />', () => {
  const render = ({ onChange = () => {}, ...rest } = {}) => shallow(<QueryInput onChange={onChange} {...rest} />)

  it('renders an input field', () => {
    expect(
      render()
        .find(InputField)
        .exists()
    ).toBe(true)
  })

  it('wraps the input field in an onChange debouncer', () => {
    const debouncer = render().find(Debouncer)
    expect(debouncer.exists()).toBe(true)
    expect(debouncer.find(InputField).exists()).toBe(true)
    expect(debouncer.props().callbackPropName).toBe('onChange')
  })

  it('passes all props from parent to child', () => {
    const wrapper = render({ 'aria-live': 'polite', hello: 'world', magicNumber: 7 })

    const props = wrapper.find(InputField).props()

    expect(props['aria-live']).toBe('polite')
    expect(props.hello).toBe('world')
    expect(props.magicNumber).toBe(7)
  })

  it('fires onChange when the underlying input changes', () => {
    const onChange = jest.fn()
    const wrapper = render({ onChange })
    const value = 'Hello, world'

    wrapper
      .find(Debouncer)
      .props()
      .callback(value)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('fires onChange with the value wrapped in an event for Downshift', () => {
    const onChange = jest.fn()
    const wrapper = render({ onChange })
    const value = 'Hello, world'

    wrapper
      .find(Debouncer)
      .props()
      .callback(value)

    expect(onChange).toHaveBeenCalledWith({ target: { value } })
  })
})
