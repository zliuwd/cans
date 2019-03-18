import { Button } from '@cwds/components'
import { recordsMode } from './Client.helper'
import RecordsModeSwitchButton from './RecordsModeSwitchButton'
import React from 'react'
import { mount } from 'enzyme'
const recordsModeSwitch = jest.fn()
const defaultFakeProps = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  switchButtonName: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithOnlyOneValid = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'DELETED' }],
  switchButtonName: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithNoValid = {
  assessments: [{ id: 1, status: 'DELETE' }, { id: 2, status: 'DELETED' }],
  switchButtonName: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithNoAssessments = {
  assessments: undefined,
  switchButtonName: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsForComparisonTable = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  switchButtonName: recordsMode.HISTORY,
  recordsModeSwitch: recordsModeSwitch,
}

let wrapper
const getWrapper = fakeProps => {
  wrapper = mount(<RecordsModeSwitchButton {...fakeProps} />)
}

describe('</RecordsModeSwitchButton>', () => {
  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a button with correct text, when there are two or more assessments which status are not DELETED ', () => {
    getWrapper(defaultFakeProps)
    const target = wrapper.find(Button)
    expect(target.length).toBe(1)
    expect(target.text()).toBe('recordsMode.COMPARISON')
  })

  it('always render a button with correct text, when it be mounted in comparison table header', () => {
    getWrapper(propsForComparisonTable)
    const target = wrapper.find(Button)
    expect(target.length).toBe(1)
    expect(target.text()).toBe('Show History')
  })

  it('after button was clicked, recordsModeSwitch will be invoked  ', () => {
    getWrapper(defaultFakeProps)
    const target = wrapper.find(Button)
    target.simulate('click')
    expect(recordsModeSwitch).toHaveBeenCalledTimes(1)
  })

  it('will not render button when there is only one assessment which status is not DELETED ', () => {
    getWrapper(propsWithOnlyOneValid)
    const target = wrapper.find(Button)
    expect(target.exists()).toBe(false)
  })

  it('will not render button when there is no assessment which status is not DELETED ', () => {
    getWrapper(propsWithNoValid)
    const target = wrapper.find(Button)
    expect(target.exists()).toBe(false)
  })

  it('will not render button when there is no assessment', () => {
    getWrapper(propsWithNoAssessments)
    const target = wrapper.find(Button)
    expect(target.exists()).toBe(false)
    expect(wrapper.text()).toBe(null)
  })
})
