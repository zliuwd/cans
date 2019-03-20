import { Icon, UncontrolledTooltip } from '@cwds/components'
import { recordsMode } from './Client.helper'
import RecordsModeSwitchButton from './RecordsModeSwitchButton'
import React from 'react'
import { mount } from 'enzyme'

const recordsModeSwitch = jest.fn()
const defaultFakeProps = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  activatedRecordSwitchButton: 'recordsMode.HISTORY',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithOnlyOneValid = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'DELETED' }],
  activatedRecordSwitchButton: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithNoValid = {
  assessments: [{ id: 1, status: 'DELETE' }, { id: 2, status: 'DELETED' }],
  activatedRecordSwitchButton: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsWithNoAssessments = {
  assessments: undefined,
  activatedRecordSwitchButton: 'recordsMode.COMPARISON',
  recordsModeSwitch: recordsModeSwitch,
}

const propsForComparisonTable = {
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  activatedRecordSwitchButton: recordsMode.HISTORY,
  recordsModeSwitch: recordsModeSwitch,
}

let wrapper
const getWrapper = fakeProps => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  wrapper = mount(<RecordsModeSwitchButton {...fakeProps} />, { attachTo: div })
  // special test setting for mounting the component with toolTip nested
}

describe('</RecordsModeSwitchButton>', () => {
  afterEach(() => {
    wrapper.unmount()
  })

  it('will initially render two Icons with correct icon name ', () => {
    getWrapper(defaultFakeProps)
    const target = wrapper.find(Icon)
    expect(target.length).toBe(2)
    const toHistoryIcon = target.at(0)
    expect(toHistoryIcon.props().icon).toEqual('list')
    const toComparisonIcon = target.at(1)
    expect(toComparisonIcon.props().icon).toEqual('chart-bar')
  })

  it('will render Icons with correct icon props', () => {
    getWrapper(propsForComparisonTable)
    const target = wrapper.find(Icon)
    const toComparisonIcon = target.at(0)
    expect(toComparisonIcon.props().icon).toEqual('list')
    expect(toComparisonIcon.props().className).toEqual('assessment-records-button')
    expect(toComparisonIcon.props().onClick).toEqual(recordsModeSwitch)

    const toHistoryIcon = target.at(1)
    expect(toHistoryIcon.props().icon).toEqual('chart-bar')
    expect(toHistoryIcon.props().className).toEqual('assessment-records-button-selected')
    expect(toHistoryIcon.props().onClick).toEqual(null)
  })

  it('will render one toolTip', () => {
    getWrapper(propsForComparisonTable)
    const target = wrapper.find(UncontrolledTooltip)
    expect(target.length).toBe(1)
  })

  it('will invoke recordsModeSwitch when click an actived Icon', () => {
    getWrapper(propsForComparisonTable)
    const target = wrapper.find(Icon)
    const toComparisonIcon = target.at(0)
    expect(toComparisonIcon.props().className).toEqual('assessment-records-button')
    toComparisonIcon.simulate('click')
    expect(recordsModeSwitch).toHaveBeenCalledTimes(1)
    recordsModeSwitch.mockReset()
  })

  it('will not invoke recordsModeSwitch when click an selected Icon', () => {
    getWrapper(propsForComparisonTable)
    const target = wrapper.find(Icon)
    const toHistoryIcon = target.at(1)
    expect(toHistoryIcon.props().className).toEqual('assessment-records-button-selected')
    toHistoryIcon.simulate('click')
    expect(recordsModeSwitch).toHaveBeenCalledTimes(0)
    recordsModeSwitch.mockReset()
  })

  it('will not render Icon when there is only one assessment which status is COMPLETED ', () => {
    getWrapper(propsWithOnlyOneValid)
    const target = wrapper.find(Icon)
    expect(target.exists()).toBe(false)
  })

  it('will not render Icon when there is no assessment which status is COMPLETED ', () => {
    getWrapper(propsWithNoValid)
    const target = wrapper.find(Icon)
    expect(target.exists()).toBe(false)
  })

  it('will not render Icon when there is no assessment', () => {
    getWrapper(propsWithNoAssessments)
    const target = wrapper.find(Icon)
    expect(target.exists()).toBe(false)
    expect(wrapper.text()).toBe(null)
  })
})
