import React from 'react'
import { shallow } from 'enzyme'
import AssessmentForm from './AssessmentForm'
import NewAssessmentContainer from './NewAssessmentContainer'
import AssessmentDraftManager from './AssessmentDraftManager'
import AssessmentLoadingBoundary from './AssessmentLoadingBoundary'

describe('AssessmentForm', () => {
  const fakeButtonController = {
    updateHeaderButtons: () => {},
    updateHeaderButtonsToDefault: () => {},
  }
  const defaultMatch = { params: { id: '123' } }

  const render = ({ match = defaultMatch } = {}) =>
    shallow(<AssessmentForm client={{}} match={match} pageHeaderButtonsController={fakeButtonController} />)

  it('renders an NewAssessmentContainer inside an AssessmentDraftManager inside an AssessmentLoadingBoundary', () => {
    const wrapper = render()
    const child = wrapper.find(NewAssessmentContainer)
    expect(child.exists()).toBe(true)
    expect(child.parent().type()).toBe(AssessmentDraftManager)
    const draftManager = wrapper.find(AssessmentDraftManager)
    expect(draftManager.parent().type()).toBe(AssessmentLoadingBoundary)
  })

  it('uses instrument 1', () => {
    const wrapper = render()
    expect(wrapper.find(AssessmentLoadingBoundary).props().instrumentId).toBe('1')
  })

  it('loads the assessment specified in the match params', () => {
    const wrapper = render({ match: { params: { id: '10101' } } })
    expect(wrapper.find(AssessmentLoadingBoundary).props().assessmentId).toBe('10101')
  })

  it('loads a new assessmentId when no match specified', () => {
    const wrapper = render({ match: { params: {} } })
    expect(wrapper.find(AssessmentLoadingBoundary).props().assessmentId).toBe(null)
  })
})
