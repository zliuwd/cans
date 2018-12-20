import React from 'react'
import { shallow } from 'enzyme'
import AssessmentCard from './AssessmentCard'

describe('<AssessmentCard />', () => {
  const assessmentCardTitleStyle = '.assessment-card-title'
  const render = isUnderSix =>
    shallow(
      <AssessmentCard assessment={{ state: { under_six: isUnderSix } }} i18n={{}} onAssessmentUpdate={() => {}} />
    )

  describe('when isUnderSix is true', () => {
    it('Title is "Age Range 0-5"', () => {
      const wrapper = render(true)
      expect(wrapper.find(assessmentCardTitleStyle).html()).toContain('Age Range 0-5')
    })
  })

  describe('when isUnderSix is false', () => {
    it('Title is "Age Range 6-21"', () => {
      const wrapper = render(false)
      expect(wrapper.find(assessmentCardTitleStyle).html()).toContain('Age Range 6-21')
    })
  })
})
