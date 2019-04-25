import React from 'react'
import { shallow } from 'enzyme'
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
})
