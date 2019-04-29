import React from 'react'
import { shallow } from 'enzyme'
import { Icon, UncontrolledTooltip } from '@cwds/components'
import DomainCommentIcon from './DomainCommentIcon'
import DomainPanelSummary from './DomainPanelSummary'
import DomainProgressBar from './DomainProgressBar'
import DomainScore from './DomainScore'

const domainDefault = {
  id: '1',
  class: 'domain',
  code: 'BEHEMO',
  under_six: false,
  above_six: true,
  items: [
    {
      under_six_id: '',
      above_six_id: '1',
      code: '1',
      required: true,
      confidential: false,
      rating_type: 'REGULAR',
      rating: -1,
    },
  ],
}

describe('DomainPanelSummary', () => {
  const render = ({
    caregiverName,
    description,
    domain = domainDefault,
    index = 3,
    isAssessmentUnderSix = false,
    isCaregiverDomain,
    isExpanded = false,
    isReviewed = false,
    title,
    totalScore = '-',
    warningText = 'Be very wary',
  } = {}) =>
    shallow(
      <DomainPanelSummary
        caregiverName={caregiverName}
        description={description}
        domain={domain}
        index={index}
        isAssessmentUnderSix={isAssessmentUnderSix}
        isCaregiverDomain={isCaregiverDomain}
        isExpanded={isExpanded}
        isReviewed={isReviewed}
        title={title}
        totalScore={totalScore}
        warningText={warningText}
      />
    )

  it('renders chevron icon with rotation 270 when collapsed', () => {
    const wrapper = render()
    const target = wrapper.find(Icon).at(0)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toEqual(270)
  })

  it('will render a Icon with no rotation when expanded', () => {
    const wrapper = render({ isExpanded: true })
    const target = wrapper.find(Icon).at(0)
    expect(target.props().icon).toBe('chevron-down')
    expect(target.props().rotation).toBe(null)
  })

  it('will render toolTip when there is a description', () => {
    const wrapper = render({ description: 'Hello' })
    const target = wrapper.find(UncontrolledTooltip)
    expect(target.exists()).toBe(true)
  })

  it('renders a warning text when no caregiver name is filled', () => {
    const domain = {
      ...domainDefault,
      is_caregiver_domain: true,
      caregiver_index: 'a',
      caregiver_name: undefined,
    }
    const wrapper = render({
      domain,
      caregiverName: domain.caregiver_name,
      isCaregiverDomain: domain.is_caregiver_domain,
    })
    const alert = wrapper.find('.caregiver-warning-text')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toMatch(' Caregiver Name is required')
  })

  it('renders a warning text when caregiver name is blank or whitespace', () => {
    const domain = {
      ...domainDefault,
      is_caregiver_domain: true,
      caregiver_index: 'a',
      caregiver_name: ' ',
    }
    const wrapper = render({
      domain,
      caregiverName: domain.caregiver_name,
      isCaregiverDomain: domain.is_caregiver_domain,
    })
    const alert = wrapper.find('.caregiver-warning-text')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toMatch(' Caregiver Name is required')
  })

  it('warning text is not rendered when caregiver name is filled', () => {
    const domain = {
      ...domainDefault,
      is_caregiver_domain: true,
      caregiver_index: 'a',
      caregiver_name: 'a',
    }
    const wrapper = render({
      domain,
      caregiverName: domain.caregiver_name,
      isCaregiverDomain: domain.is_caregiver_domain,
    })
    const alert = wrapper.find('.caregiver-warning-text')
    expect(alert.exists()).toBe(false)
  })

  it('renders DomainScore', () => {
    const wrapper = render()
    expect(wrapper.find(DomainScore).length).toBe(1)
  })

  describe('progress bar', () => {
    it('renders when folded', () => {
      const wrapper = render()
      wrapper.setProps({ isExpanded: false })
      expect(wrapper.find(DomainProgressBar).length).toBe(1)
    })

    it('renders when extended', () => {
      const wrapper = render()
      wrapper.setProps({ isExpanded: true })
      expect(wrapper.find(DomainProgressBar).length).toBe(1)
    })
  })

  it('renders a comment icon', () => {
    const wrapper = render()
    expect(wrapper.find(DomainCommentIcon).exists()).toBe(true)
  })

  it('adds a class when it needs review', () => {
    const wrapper = render({ isReviewed: false })
    expect(wrapper.find('.domain-metric-with-review').exists()).toBe(true)
  })

  it('adds a class when it does not need review', () => {
    const wrapper = render({ isReviewed: true })
    expect(wrapper.find('.domain-metric').exists()).toBe(true)
  })
})
