import React from 'react'
import { shallow } from 'enzyme'
import CountyAndCase from './CountyAndCase'

describe('CountyAndCase', () => {
  const render = ({ countyName, isAssessmentReady = true, serviceSource, serviceSourceUIId } = {}) =>
    shallow(
      <CountyAndCase
        countyName={countyName}
        isAssessmentReady={isAssessmentReady}
        serviceSource={serviceSource}
        serviceSourceUIId={serviceSourceUIId}
      />
    )

  describe('when assessment is loading', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render({ isAssessmentReady: false, countyName: 'Yolo County' })
    })

    it('renders an empty div', () => {
      expect(wrapper.find('#county-and-case-info').text()).toBe('')
    })
  })

  it('does not render the county name when there is no county', () => {
    const wrapper = render()
    expect(wrapper.find('#county-name').exists()).toBe(false)
  })

  it('renders a placeholder when there is no source', () => {
    const wrapper = render()
    expect(wrapper.find('#case-or-referral-number span').props().children).toBe('No case/referral number exists')
    expect(wrapper.find('#case-or-referral-number-label').props().children).toBe('Case/Referral Number')
  })

  describe('with full information', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render({ countyName: 'Yolo County', serviceSource: 'CASE', serviceSourceUIId: '123' })
    })

    it('renders the county name', () => {
      expect(wrapper.find('#county-name').props().children).toBe('Yolo County')
    })

    it('renders the service source', () => {
      expect(wrapper.find('#case-or-referral-number span').props().children).toBe('123')
      expect(wrapper.find('#case-or-referral-number-label').props().children).toBe('Case Number')
    })
  })

  it('renders a referral label when source is a referral', () => {
    const wrapper = render({ serviceSource: 'REFERRAL' })
    expect(wrapper.find('#case-or-referral-number-label').props().children).toBe('Referral Number')
  })
})
