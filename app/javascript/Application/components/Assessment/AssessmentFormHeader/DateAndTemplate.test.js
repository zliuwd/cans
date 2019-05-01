import React from 'react'
import { shallow } from 'enzyme'
import { Label } from 'reactstrap'
import AgeRangeSwitch from '../../common/AgeRangeSwitch'
import DateField from '../../common/DateField'
import DateAndTemplate from './DateAndTemplate'

describe('DateAndTemplate', () => {
  const render = ({
    disabled = false,
    eventDate = '',
    isEventDateBeforeDob = false,
    isUnderSix,
    onAgeTemplateChange = () => {},
    onEventDateChange = () => {},
    onEventDateFieldKeyUp = () => {},
  } = {}) =>
    shallow(
      <DateAndTemplate
        disabled={disabled}
        eventDate={eventDate}
        isEventDateBeforeDob={isEventDateBeforeDob}
        isUnderSix={isUnderSix}
        onAgeTemplateChange={onAgeTemplateChange}
        onEventDateChange={onEventDateChange}
        onEventDateFieldKeyUp={onEventDateFieldKeyUp}
      />
    )

  describe('default', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render()
    })

    it('renders Assessment Date label', () => {
      const label = wrapper.find('[htmlFor="assessment-date_input"]')
      expect(label.type()).toBe(Label)
    })

    it('renders Assessment Template label', () => {
      const label = wrapper.find('#assessment-template-label')
      expect(label.props().children).toBe('Select CANS Template *')
    })

    it('renders an enabled DateField', () => {
      expect(wrapper.find(DateField).props().disabled).not.toBeTruthy()
    })

    it('renders an enabled AgeRangeSwitch', () => {
      expect(wrapper.find(AgeRangeSwitch).props().disabled).not.toBeTruthy()
    })
  })

  describe('when disabled', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render({ disabled: true })
    })

    it('renders Assessment Date label', () => {
      const label = wrapper.find('[htmlFor="assessment-date_input"]')
      expect(label.type()).toBe(Label)
    })

    it('renders Assessment Template label', () => {
      const label = wrapper.find('#assessment-template-label')
      expect(label.props().children).toBe('Select CANS Template *')
    })

    it('renders an enabled DateField', () => {
      expect(wrapper.find(DateField).props().disabled).toBeTruthy()
    })

    it('renders an enabled AgeRangeSwitch', () => {
      expect(wrapper.find(AgeRangeSwitch).props().disabled).toBeTruthy()
    })
  })

  it('marks DateField as invalid when the event date is before person.dob', () => {
    const wrapper = render({ isEventDateBeforeDob: true })
    expect(wrapper.find(DateField).props().isValid).toBe(false)
  })

  it('calls back when event date changes', () => {
    const onEventDateChange = jest.fn()
    const wrapper = render({ onEventDateChange })
    const onChange = wrapper.find(DateField).props().onChange
    onChange('my value')
    expect(onEventDateChange).toHaveBeenCalledWith('my value')
  })

  it('calls back when event date detects a keyup', () => {
    const onEventDateFieldKeyUp = jest.fn()
    const wrapper = render({ onEventDateFieldKeyUp })
    const onRawValueUpdate = wrapper.find(DateField).props().onRawValueUpdate
    onRawValueUpdate('my value')
    expect(onEventDateFieldKeyUp).toHaveBeenCalledWith('my value')
  })

  it('calls back when age template changes', () => {
    const onAgeTemplateChange = jest.fn()
    const wrapper = render({ onAgeTemplateChange })
    const onChange = wrapper.find(AgeRangeSwitch).props().onChange
    onChange('my value')
    expect(onAgeTemplateChange).toHaveBeenCalledWith('my value')
  })
})
