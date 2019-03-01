import React from 'react'
import { Card, CardTitle } from '@cwds/components'
import ComparisonOuterTable from './ComparisonOuterTable'
import './style.sass'
import RecordsModeSwitchButton from '../RecordsModeSwitchButton'
import { recordsMode } from '../Client.helper'
import { shallow, mount } from 'enzyme'
import AssessmentComparison from './AssessmentComparison'

export const fakeData = {
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
            },
            {
              value: 1,
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
        },
      ],
    },
  ],
}

const fakeProps = {
  recordsModeSwitch: jest.fn(),
  comparisonRecords: { data: fakeData, i18n: { i18n: 'value' } },
  loadingState: 'READY',
}

describe('<AssessmentComparison />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<AssessmentComparison {...fakeProps} />)
  })

  it('will render a card', () => {
    const target = wrapper.find(Card)
    expect(target.length).toBe(1)
  })

  it('will render a card title with #Assessment Comparison# ', () => {
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

  it('will render null when got invalid comparisonRecords', () => {
    const invalidProps = {
      recordsModeSwitch: jest.fn(),
      comparisonRecords: {},
      loadingState: 'ERROR',
    }
    const wrapper = mount(<AssessmentComparison {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
  })
})
