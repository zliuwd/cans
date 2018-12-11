import React from 'react'
import { shallow } from 'enzyme'
import { Row, Col } from 'reactstrap'
import StrengthsSummary from './StrengthsSummary'
import ActionRequiredSummary from './ActionRequiredSummary'
import ImmediateActionRequiredSummary from './ImmediateActionRequiredSummary'
import TraumaSummary from './TraumaSummary'
import AssessmentSummary from './AssessmentSummary'

describe('<AssessmentSummary />', () => {
  const i18n = { code: 'value' }
  const render = ({ domains = [], isUnderSix = false } = {}) =>
    shallow(<AssessmentSummary domains={domains} i18n={i18n} isUnderSix={isUnderSix} getSummaryCode={() => {}} />)

  it('renders a StrengthsSummary', () => {
    expect(
      render()
        .find(StrengthsSummary)
        .exists()
    ).toBe(true)
  })

  it('renders an ActionRequiredSummary', () => {
    expect(
      render()
        .find(ActionRequiredSummary)
        .exists()
    ).toBe(true)
  })

  it('renders an ImmediateActionRequiredSummary', () => {
    expect(
      render()
        .find(ImmediateActionRequiredSummary)
        .exists()
    ).toBe(true)
  })

  it('renders an TraumaSummary', () => {
    expect(
      render()
        .find(TraumaSummary)
        .exists()
    ).toBe(true)
  })

  it('renders all summaries in a single row on extra large screens', () => {
    const wrapper = render()
    const sumSize = wrapper
      .find(Row)
      .find(Col)
      .reduce((sum, col) => sum + col.props().xl, 0)
    expect(sumSize).toBe(12)
  })

  it('renders each summary on its own row on smaller screens', () => {
    const cols = render().find(Col)
    cols.forEach(col => expect(col.props().xs).toBe(12))
  })

  describe('when under_six', () => {
    it('passes domain data to each summary', () => {
      const domains = [
        { code: 'OBI', under_six: true, above_six: true, items: [] },
        { code: 'WAN', under_six: false, above_six: true, items: [] },
        { code: 'KEN', under_six: true, above_six: false, items: [] },
      ]
      const cols = render({ domains, isUnderSix: true }).find(Col)
      cols.forEach(col =>
        expect(col.childAt(0).props().domains).toEqual([
          { code: 'OBI', under_six: true, above_six: true, items: [] },
          { code: 'KEN', under_six: true, above_six: false, items: [] },
        ])
      )
    })
  })

  describe('when not under_six', () => {
    it('passes domain data to each summary', () => {
      const domains = [
        { code: 'OBI', under_six: true, above_six: true, items: [] },
        { code: 'WAN', under_six: false, above_six: true, items: [] },
        { code: 'KEN', under_six: true, above_six: false, items: [] },
      ]
      const cols = render({ domains, isUnderSix: false }).find(Col)
      cols.forEach(col =>
        expect(col.childAt(0).props().domains).toEqual([
          { code: 'OBI', under_six: true, above_six: true, items: [] },
          { code: 'WAN', under_six: false, above_six: true, items: [] },
        ])
      )
    })
  })

  it('passes i18n to each summary', () => {
    const cols = render().find(Col)
    cols.forEach(col => expect(col.childAt(0).props().i18n).toBe(i18n))
  })
})
