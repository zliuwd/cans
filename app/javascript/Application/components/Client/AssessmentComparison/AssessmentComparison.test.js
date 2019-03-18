import React from 'react'
import { Card, CardTitle } from '@cwds/components'
import ComparisonOuterTable from './comparisonTable/ComparisonOuterTable'
import ComparisonGraph from './comparisonGraph/ComparisonGraph'
import './style.sass'
import RecordsModeSwitchButton from '../RecordsModeSwitchButton'
import { recordsMode } from '../Client.helper'
import { shallow, mount } from 'enzyme'
import AssessmentComparison from './AssessmentComparison'
import ComparisonAgeSwitchButtonGroup from './ComparisonAgeSwitchButtonGroup'

export const fakeData = {
  underSix: {
    event_dates: [
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64005,
      },
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64006,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64007,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64008,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64009,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: true,
        above_six: false,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65005,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65006,
          },
          {
            assessment_id: 65007,
          },
          {
            assessment_id: 65008,
          },
          {
            assessment_id: 65009,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65005,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65006,
                trend: 'DOWN',
              },
              {
                assessment_id: 65007,
                trend: 'UP',
              },
              {
                assessment_id: 65008,
                trend: 'UP',
              },
              {
                assessment_id: 65009,
                trend: 'UP',
              },
            ],
          },
        ],
      },
    ],
  },
  aboveSix: {
    event_dates: [
      {
        event_date: '2019-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 65005,
      },
      {
        event_date: '2019-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 65006,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65007,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65008,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65009,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: false,
        above_six: true,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65005,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65006,
          },
          {
            assessment_id: 65007,
          },
          {
            assessment_id: 65008,
          },
          {
            assessment_id: 65009,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65005,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65006,
                trend: 'DOWN',
              },
              {
                assessment_id: 65007,
                trend: 'UP',
              },
              {
                assessment_id: 65008,
                trend: 'UP',
              },
              {
                assessment_id: 65009,
                trend: 'UP',
              },
            ],
          },
        ],
      },
    ],
  },
}

const fakeProps = {
  recordsModeSwitch: jest.fn(),
  comparisonRecords: { data: fakeData, i18n: { i18n: 'value' } },
  loadingState: 'READY',
}

const hideAgeSwitchWhenNoUnderSixProps = {
  recordsModeSwitch: jest.fn(),
  comparisonRecords: { data: { underSix: { event_dates: [] }, aboveSix: fakeData.aboveSix }, i18n: { i18n: 'value' } },
  loadingState: 'READY',
}

const hideAgeSwitchWhenNoAboveSixProps = {
  recordsModeSwitch: jest.fn(),
  comparisonRecords: { data: { underSix: fakeData.underSix, aboveSix: { event_dates: [] } }, i18n: { i18n: 'value' } },
  loadingState: 'READY',
}

describe('<AssessmentComparison />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<AssessmentComparison {...fakeProps} />)
  })

  it('will initially set state with currentDataKey and isAgeSwitchShown', () => {
    const target = wrapper.state()
    expect(Object.keys(target)).toContain('currentDataKey', 'isAgeSwitchShown')
  })

  it('will render two cards', () => {
    const target = wrapper.find(Card)
    expect(target.length).toBe(2)
  })

  it('each card has correct className', () => {
    const target = wrapper.find(Card)
    expect(target.at(0).props().className).toBe('card-cans-comparison')
    expect(target.at(1).props().className).toBe('comparison-graph-card')
  })

  it('will render one cardTitle with #Assessment Comparison# ', () => {
    const target = wrapper.find(CardTitle)
    expect(target.length).toBe(1)
    expect(target.html()).toContain('Assessment Comparison')
  })

  it('will render a RecordsModeSwitchButton with text show history', () => {
    const target = wrapper.find(RecordsModeSwitchButton)
    expect(target.length).toBe(1)
    expect(target.html()).toContain(recordsMode.HISTORY)
  })

  it('will render a RecordsModeSwitchButton with correct props', () => {
    const target = wrapper.find(RecordsModeSwitchButton)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('switchButtonName', 'recordsModeSwitch', 'assessments')
  })

  it('will render a ComparisonOuterTable with correct props', () => {
    const target = wrapper.find(ComparisonOuterTable)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('data', 'i18n')
  })

  it('will render a ComparisonGraph with correct props', () => {
    const target = wrapper.find(ComparisonGraph)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('data', 'i18n')
  })

  it('will render a ComparisonAgeSwitchButtonGroup with correct props when state.isAgeSwitchShown equal to true', () => {
    const target = wrapper.find(ComparisonAgeSwitchButtonGroup)
    expect(wrapper.state().isAgeSwitchShown).toBe(true)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('isUnderSix', 'ageSwitch')
  })

  it('will Not render ComparisonAgeSwitchButtonGroup without valid underSix data', () => {
    const specialWrapper = shallow(<AssessmentComparison {...hideAgeSwitchWhenNoUnderSixProps} />)
    expect(specialWrapper.state().isAgeSwitchShown).toBe(false)
    const target = specialWrapper.find(ComparisonAgeSwitchButtonGroup)
    expect(target.exists()).toBe(false)
  })

  it('will Not render ComparisonAgeSwitchButtonGroup without valid aboveSix data', () => {
    const specialWrapper = shallow(<AssessmentComparison {...hideAgeSwitchWhenNoAboveSixProps} />)
    expect(specialWrapper.state().isAgeSwitchShown).toBe(false)
    const target = specialWrapper.find(ComparisonAgeSwitchButtonGroup)
    expect(target.exists()).toBe(false)
  })

  it('will render null when got empty comparisonRecords', () => {
    const invalidProps = {
      recordsModeSwitch: jest.fn(),
      comparisonRecords: {},
      loadingState: 'READY',
    }
    const wrapper = mount(<AssessmentComparison {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
    wrapper.unmount()
  })

  it('will render null when got undefined comparisonRecords', () => {
    const invalidProps = {
      recordsModeSwitch: jest.fn(),
      comparisonRecords: undefined,
      loadingState: 'ERROR',
    }
    const wrapper = mount(<AssessmentComparison {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
    wrapper.unmount()
  })

  it('will render null when comparisonRecords.data is invalid', () => {
    const invalidProps = {
      recordsModeSwitch: jest.fn(),
      comparisonRecords: { data: undefined, i18n: { i18n: 'value' } },
      loadingState: 'READY',
    }
    const wrapper = mount(<AssessmentComparison {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
    wrapper.unmount()
  })

  it('will render null when comparisonRecords.i18n is invalid', () => {
    const invalidProps = {
      recordsModeSwitch: jest.fn(),
      comparisonRecords: { data: fakeData, i18n: undefined },
      loadingState: 'READY',
    }
    const wrapper = mount(<AssessmentComparison {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
    wrapper.unmount()
  })

  it('handleAgeSwitch method works well', () => {
    wrapper.instance().handleAgeSwitch(false)
    const target1 = wrapper.state().currentDataKey
    expect(target1).toBe('aboveSix')
    wrapper.instance().handleAgeSwitch(true)
    const target2 = wrapper.state().currentDataKey
    expect(target2).toBe('underSix')
  })
})
