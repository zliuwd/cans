import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ConfidentialCheckbox from './ConfidentialCheckbox'
import { mount } from 'enzyme'

const tempProps = {
  canReleaseConfidentialInfo: false,
  code: 'TRM',
  disabled: false,
  handleConfidentialityChange: jest.fn(),
  isConfidential: false,
  isConfidentialByDefault: true,
}

let wrapper
const getWrapper = props => {
  wrapper = mount(<ConfidentialCheckbox {...props} />)
}

describe('<ConfidentialCheckbox/>', () => {
  it('renders a checkbox', () => {
    getWrapper(tempProps)
    const target = wrapper.find(Checkbox)
    expect(target.exists()).toBe(true)
  })

  it('redners # Discretion Needed # label when default is not a Confidential checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.isConfidentialByDefault = false
    getWrapper(testProps)
    const target = wrapper.find(FormControlLabel)
    expect(target.text()).toBe('Discretion Needed')
  })

  it('renders # Confidential # label when default is a Confidential checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.isConfidentialByDefault = true
    getWrapper(testProps)
    const target = wrapper.find(FormControlLabel)
    expect(target.text()).toBe('Confidential')
  })

  it('handleConfidentialityChange will be invoked after click # Discretion Needed # checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.isConfidentialByDefault = false
    getWrapper(testProps)
    const target = wrapper.find('input')
    target.simulate('change')
    expect(testProps.handleConfidentialityChange).toHaveBeenCalledTimes(1)
    testProps.handleConfidentialityChange.mockReset()
  })

  it('handleConfidentialityChange will be invoked after click unchecked # Confidential # checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.isConfidential = false
    getWrapper(testProps)
    const target = wrapper.find('input')
    target.simulate('change')
    expect(testProps.handleConfidentialityChange).toHaveBeenCalledTimes(1)
    testProps.handleConfidentialityChange.mockReset()
  })

  it('in read-only mode will render disabled # Discretion Needed # checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.disabled = true
    testProps.isConfidentialByDefault = false
    getWrapper(testProps)
    const label = wrapper.find(FormControlLabel)
    expect(label.text()).toBe('Discretion Needed')
    const target = wrapper.find(Checkbox)
    expect(target.props().disabled).toBe(true)
  })

  it('in read-only mode will render disabled # Confidential # checkbox', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.disabled = true
    testProps.isConfidentialByDefault = true
    getWrapper(testProps)
    const label = wrapper.find(FormControlLabel)
    expect(label.text()).toBe('Confidential')
    const target = wrapper.find(Checkbox)
    expect(target.props().disabled).toBe(true)
  })

  it('when canReleaseConfidentialInfo switch to No renders the checkbox which is disabled', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = false
    getWrapper(testProps)
    const target = wrapper.find(Checkbox)
    expect(target.props().disabled).toBe(true)
  })

  it('when canReleaseConfidentialInfo switch to Yes renders the checkbox which is not disabled', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    getWrapper(testProps)
    const target = wrapper.find(Checkbox)
    expect(target.props().disabled).toBe(false)
  })

  it('when canReleaseConfidentialInfo switch to No renders Confidential checkbox which is checked', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = false
    testProps.isConfidential = true
    getWrapper(testProps)
    const target = wrapper.find(Checkbox)
    expect(target.props().checked).toBe(true)
  })

  it('when canReleaseConfidentialInfo switch to yes renders Confidential checkbox which is unchecked', () => {
    const testProps = { ...tempProps }
    testProps.canReleaseConfidentialInfo = true
    testProps.isConfidential = false
    getWrapper(testProps)
    const target = wrapper.find(Checkbox)
    expect(target.props().checked).toBe(false)
  })
})
