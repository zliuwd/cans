import React from 'react'
import { shallow } from 'enzyme'
import * as Analytics from '../../util/analytics'
import { LoadingState } from '../../util/loadingHelper'
import AssessmentPageActions from './AssessmentPageActions'
import { AssessmentStatus } from './AssessmentHelper'
import { assessment as mockAssessment } from './assessment.mocks.test'

jest.mock('../../util/analytics')

describe('AssessmentPageActions', () => {
  const analyticsSpy = jest.spyOn(Analytics, 'logPageAction')

  const render = ({ assessment = mockAssessment, loadingState = LoadingState.waiting } = {}) =>
    shallow(<AssessmentPageActions assessment={assessment} loadingState={loadingState} />)

  beforeEach(() => {
    analyticsSpy.mockReset()
  })

  it('renders nothing directly', () => {
    expect(render().type()).toBe(null)
  })

  it('logs no page action by default', () => {
    render({ loadingState: LoadingState.updating })
    expect(analyticsSpy).not.toHaveBeenCalled()
  })

  it('logs a page action when the assessment is saved', () => {
    const assessment = { id: 123, county: { name: 'Madera' }, status: AssessmentStatus.inProgress }
    const wrapper = render({ assessment, loadingState: LoadingState.updating })
    wrapper.setProps({ loadingState: LoadingState.ready })
    expect(analyticsSpy).toHaveBeenCalledWith('assessmentSave', { assessment_id: 123, assessment_county: 'Madera' })
  })

  it('logs a page action when the assessment is completed', () => {
    const assessment = { id: 456, county: { name: 'Yolo' }, status: AssessmentStatus.inProgress }
    const wrapper = render({ assessment, loadingState: LoadingState.updating })
    const completedAssessment = { ...assessment, status: AssessmentStatus.completed }
    wrapper.setProps({ assessment: completedAssessment, loadingState: LoadingState.ready })
    expect(analyticsSpy).toHaveBeenCalledWith('assessmentSubmit', { assessment_id: 456, assessment_county: 'Yolo' })
  })

  it('logs a page action when a completed assessment is re-saved', () => {
    const assessment = { id: 789, county: { name: 'Marin' }, status: AssessmentStatus.completed }
    const wrapper = render({ assessment, loadingState: LoadingState.updating })
    wrapper.setProps({ loadingState: LoadingState.ready })
    expect(analyticsSpy).toHaveBeenCalledWith('assessmentSave', { assessment_id: 789, assessment_county: 'Marin' })
  })
})
