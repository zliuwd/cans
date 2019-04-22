import React from 'react'
import { mount, shallow } from 'enzyme'
import { CardHeader, CardTitle } from '@cwds/components'
import AssessmentRecordControl from './AssessmentRecordControl'
import ClientAssessmentStatisticsHeader from './ClientAssessmentStatisticsHeader'
import { BrowserRouter } from 'react-router-dom'
import { LoadingState } from '../../util/loadingHelper'

const historyfakeProps = {
  isComparisonShown: false,
  activatedRecordSwitchButton: 'history',
  recordsModeSwitch: jest.fn(),
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  clientIdentifier: '123',
  disabled: false,
  isReassessment: true,
  loadingState: LoadingState.ready,
}

const comparisonfakeProps = {
  isComparisonShown: true,
  activatedRecordSwitchButton: 'history',
  recordsModeSwitch: jest.fn(),
  assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
  clientIdentifier: '123',
  disabled: false,
  isReassessment: true,
  loadingState: LoadingState.ready,
}

describe('<ClientAssessmentStatisticsHeader/>', () => {
  let wrapper
  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // special test setting for mounting the component with toolTip nested
    wrapper = mount(
      <BrowserRouter>
        <ClientAssessmentStatisticsHeader {...historyfakeProps} />
      </BrowserRouter>,
      { attachTo: div }
    )
  })

  it('initially renders 1 CardHeader', () => {
    const target = wrapper.find(CardHeader)
    expect(target.length).toBe(1)
  })

  it('initially renders 1 CardTitle', () => {
    const target = wrapper.find(CardTitle)
    expect(target.length).toBe(1)
  })

  it('does not render assessment record control when loadingState is idle', () => {
    const props = {
      isComparisonShown: false,
      activatedRecordSwitchButton: 'history',
      recordsModeSwitch: jest.fn(),
      assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
      clientIdentifier: '123',
      disabled: false,
      isReassessment: true,
      loadingState: LoadingState.idle,
    }
    const header = shallow(<ClientAssessmentStatisticsHeader {...props} />)
    const control = header.find('AssessmentRecordControl')
    expect(control.exists()).toEqual(false)
  })

  it('does not render assessment record control when loadingState is waiting', () => {
    const props = {
      isComparisonShown: false,
      activatedRecordSwitchButton: 'history',
      recordsModeSwitch: jest.fn(),
      assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
      clientIdentifier: '123',
      disabled: false,
      isReassessment: true,
      loadingState: LoadingState.waiting,
    }
    const header = shallow(<ClientAssessmentStatisticsHeader {...props} />)
    const control = header.find('AssessmentRecordControl')
    expect(control.exists()).toEqual(false)
  })

  it('renders assessment record control when loadingState is ready', () => {
    const props = {
      isComparisonShown: false,
      activatedRecordSwitchButton: 'history',
      recordsModeSwitch: jest.fn(),
      assessments: [{ id: 1, status: 'COMPLETED' }, { id: 2, status: 'COMPLETED' }, { id: 3, status: 'COMPLETED' }],
      clientIdentifier: '123',
      disabled: false,
      isReassessment: true,
      loadingState: LoadingState.ready,
    }
    const header = shallow(<ClientAssessmentStatisticsHeader {...props} />)
    const control = header.find('AssessmentRecordControl')
    expect(control.exists()).toEqual(true)
  })

  it('initially renders 1 AssessmentRecordControl with correct props', () => {
    const target = wrapper.find(AssessmentRecordControl)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain(
      'activatedRecordSwitchButton',
      'recordsModeSwitch',
      'assessments',
      'clientIdentifier',
      'disabled',
      'isReassessment'
    )
  })

  it('initially renders CardTitle with text #Assessment History#', () => {
    const target = wrapper.find(CardTitle)
    expect(target.html()).toContain('Assessment History')
  })

  it('renders CardTitle with text #Assessment History Over Time# for comparison view', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const comparisonWrapper = mount(
      <BrowserRouter>
        <ClientAssessmentStatisticsHeader {...comparisonfakeProps} />
      </BrowserRouter>,
      { attachTo: div }
    )
    const target = comparisonWrapper.find(CardTitle)
    expect(target.html()).toContain('Assessment Comparison')
  })
})
