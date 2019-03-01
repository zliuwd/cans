import React from 'react'
import { shallow } from 'enzyme'
import AssessmentDraftManager from './AssessmentDraftManager'
import * as AssessmentMocks from './assessment.mocks.test'

const MyComponent = () => 'Hello'

describe('AssessmentDraftManager', () => {
  const render = () =>
    shallow(
      <AssessmentDraftManager assessment={AssessmentMocks.assessment}>
        <MyComponent />
      </AssessmentDraftManager>
    )

  it('saves the assessment into state to track local changes', () => {
    const wrapper = render()
    expect(wrapper.state().assessment).toEqual(AssessmentMocks.assessment)
  })

  it('passes the draft assessment down to children', () => {
    const wrapper = render()
    expect(wrapper.find(MyComponent).props().assessment).toEqual(AssessmentMocks.assessment)
  })
})
