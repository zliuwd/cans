import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardBody, CardHeader, CardTitle } from '@cwds/components'
import { AssessmentStatus } from '../AssessmentHelper'
import AssessmentSummary from './AssessmentSummary'
import AssessmentSummaryCard from './AssessmentSummaryCard'

describe('AssessmentSummaryCard', () => {
  const domains = [{ items: [{ code: 'My Item', rating: 1 }] }]
  const i18n = { code: 'value' }
  const render = ({ assessmentStatus = AssessmentStatus.completed, isUnderSix = false } = {}) =>
    shallow(
      <AssessmentSummaryCard
        assessmentStatus={assessmentStatus}
        domains={domains}
        i18n={i18n}
        isUnderSix={isUnderSix}
      />
    )

  it('is a card', () => {
    expect(
      render()
        .find(Card)
        .exists()
    ).toBe(true)
  })

  it('has a title', () => {
    expect(
      render()
        .find(CardHeader)
        .find(CardTitle)
        .props().children
    ).toEqual('CANS Summary')
  })

  it('has a class so that we can override React Wood Duck styles', () => {
    expect(
      render()
        .find(Card)
        .props().className
    ).toBe('card assessment-summary-card')
  })

  it('has an AssessmentSummary', () => {
    expect(
      render()
        .find(CardBody)
        .find(AssessmentSummary)
        .props().domains
    ).toBe(domains)
  })

  it('passes i18n', () => {
    expect(
      render({ isUnderSix: false })
        .find(AssessmentSummary)
        .props().isUnderSix
    ).toBe(false)
    expect(
      render({ isUnderSix: true })
        .find(AssessmentSummary)
        .props().isUnderSix
    ).toBe(true)
  })

  describe('when assessment is still in progress', () => {
    it('renders nothing', () => {
      expect(render({ assessmentStatus: AssessmentStatus.inProgress }).type()).toBe(null)
    })
  })
})
