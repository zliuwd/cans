import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import AddCansButton from './AddCansButton'

describe('<AddCansButton/>', () => {
  it('renders <Link/> And #new-cans-button when enabled', () => {
    const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} />)
    const link = wrapper.find(Link)
    expect(link.exists()).toEqual(true)
    const button = wrapper.find('#new-cans-button')
    expect(button.exists()).toEqual(true)
    expect(button.prop('disabled')).toEqual(false)
  })

  it('renders with <Link /> that navigates to /assessments', () => {
    const link = shallow(<AddCansButton clientIdentifier={'aaa'} />).find(Link)
    expect(link.prop('to')).toBe('./aaa/assessments')
  })

  it('renders disabled #new-cans-button when disabled', () => {
    const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={true} />)
    const link = wrapper.find(Link)
    expect(link.exists()).toEqual(false)
    const button = wrapper.find('#new-cans-button')
    expect(button.exists()).toEqual(true)
    expect(button.prop('disabled')).toEqual(true)
  })

  describe('#isDisabled()', () => {
    it('returns true when boolean passed', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={true} />)
      expect(wrapper.instance().isDisabled()).toEqual(true)
    })

    it('returns true when string passed', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={'true'} />)
      expect(wrapper.instance().isDisabled()).toEqual(true)
    })

    it('returns false when boolean passed', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={false} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })

    it('returns false when string passed', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={'false'} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })

    it('returns false when random string passed', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} disabled={'someRandomString'} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })
  })

  describe('isReassessment', () => {
    it('renders Add Cans if isReassessment is false', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} isReassessment={false} />)
      expect(
        wrapper
          .find('#new-cans-button')
          .render()
          .text()
      ).toBe('Add CANS')
    })

    it('renders Add reassessment if isReassessment is true', () => {
      const wrapper = shallow(<AddCansButton clientIdentifier={'aaa'} isReassessment={true} />)
      expect(
        wrapper
          .find('#new-cans-button')
          .render()
          .text()
      ).toBe('Add reassessment')
    })
  })
})
