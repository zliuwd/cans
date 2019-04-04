import React from 'react'
import { shallow } from 'enzyme'
import { Col, Row } from '@cwds/components'
import RadioGroupMessageBox from './RadioGroupMessageBox'

describe('RadioGroupMessageBox', () => {
  const render = ({
    isDisabled,
    legend = 'Legend',
    message,
    name = 'name',
    onChange = () => {},
    onNoClicked = () => {},
    value = false,
  } = {}) =>
    shallow(
      <RadioGroupMessageBox
        isDisabled={isDisabled}
        legend={legend}
        message={message}
        name={name}
        onChange={onChange}
        onNoClicked={onNoClicked}
        value={value}
      />
    )

  const findCols = wrapper => wrapper.find(Row).find(Col)
  const findRadioGroup = wrapper =>
    findCols(wrapper)
      .at(0)
      .children()
  const findMessage = wrapper =>
    findCols(wrapper)
      .at(1)
      .children()

  it('renders across 6 columns', () => {
    const col = render().find('Col.radio-group-box')
    expect(col.exists()).toBe(true)
    expect(col.props().xs).toBe(6)
  })

  it('adds a radio-group-box class', () => {
    const col = render().find('Col.radio-group-box')
    expect(col.exists()).toBe(true)
  })

  it('renders a Radio Group', () => {
    const wrapper = render({ legend: 'My Group' })
    expect(findRadioGroup(wrapper).props().legend).toBe('My Group')
  })

  it('passes props down to RadioGroup', () => {
    const onChange = jest.fn()
    const onNoClicked = jest.fn()
    const wrapper = render({ isDisabled: true, name: 'myname', onChange, onNoClicked, value: true })
    const groupProps = findRadioGroup(wrapper).props()
    expect(groupProps.onChange).toBe(onChange)
    expect(groupProps.onNoClicked).toBe(onNoClicked)
    expect(groupProps.isDisabled).toBe(true)
    expect(groupProps.name).toBe('myname')
    expect(groupProps.value).toBe(true)
  })

  it('renders a Message', () => {
    const wrapper = render({ message: 'Extra details go here' })
    expect(findMessage(wrapper).text()).toBe('Extra details go here')
  })

  it('renders the radio group smaller than the message', () => {
    const wrapper = render({ message: 'Extra details go here' })
    const cols = findCols(wrapper)
    expect(cols.at(0).props().xs).toBe(4)
    expect(cols.at(1).props().xs).toBe(8)
  })
})
