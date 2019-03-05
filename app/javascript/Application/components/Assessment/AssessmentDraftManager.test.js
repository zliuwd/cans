import React from 'react'
import { shallow } from 'enzyme'
import AssessmentDraftManager from './AssessmentDraftManager'
import * as AssessmentMocks from './assessment.mocks.test'
import { LoadingState } from '../../util/loadingHelper'

const MyComponent = () => 'Hello'

describe('AssessmentDraftManager', () => {
  const initialAssessment = AssessmentMocks.assessment
  const i18n = { key: 'value' }

  const render = (onSave = () => {}) =>
    shallow(
      <AssessmentDraftManager
        assessmentWithI18n={{ assessment: initialAssessment, i18n }}
        loadingState={LoadingState.ready}
        onSave={onSave}
      >
        <MyComponent />
      </AssessmentDraftManager>
    )

  const findChild = wrapper => wrapper.find(MyComponent)

  it('saves the assessment into state to track local changes', () => {
    const wrapper = render()
    expect(wrapper.state().assessment).toEqual(initialAssessment)
  })

  it('saves the draft assessment to state when the loading state transitions to Ready', () => {
    const wrapper = shallow(
      <AssessmentDraftManager
        assessmentWithI18n={{ assessment: null, i18n }}
        loadingState={LoadingState.waiting}
        onSave={() => {}}
      >
        <MyComponent />
      </AssessmentDraftManager>
    )
    wrapper.setProps({ assessmentWithI18n: { assessment: initialAssessment, i18n }, loadingState: LoadingState.ready })
    wrapper.update()
    expect(wrapper.state().assessment).toEqual(initialAssessment)
  })

  it('updates the draft assessment when the loading state transitions to Ready from Updating', () => {
    const wrapper = shallow(
      <AssessmentDraftManager
        assessmentWithI18n={{ assessment: initialAssessment, i18n }}
        loadingState={LoadingState.updating}
        onSave={() => {}}
      >
        <MyComponent />
      </AssessmentDraftManager>
    )

    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }
    wrapper.setProps({ assessmentWithI18n: { assessment: updatedAssessment, i18n }, loadingState: LoadingState.ready })
    wrapper.update()
    expect(wrapper.state().assessment).toEqual(updatedAssessment)
  })

  it('passes the assessment down to the child', () => {
    const wrapper = render()
    expect(findChild(wrapper).props().assessment).toEqual(initialAssessment)
  })

  it('passes the i18n values down to the child', () => {
    const wrapper = render()
    expect(findChild(wrapper).props().i18n).toEqual(i18n)
  })

  it('passes the loading state down to the child', () => {
    const wrapper = render()
    expect(findChild(wrapper).props().loadingState).toBe(LoadingState.ready)
  })

  it('passes the draft assessment when changes have occurred', () => {
    const wrapper = render()

    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }
    wrapper.setState({ assessment: updatedAssessment })
    wrapper.update()

    expect(findChild(wrapper).props().assessment).toEqual(updatedAssessment)
    expect(findChild(wrapper).props().assessment).not.toEqual(initialAssessment)
  })

  it('provides a callback to modify the draft assessment', () => {
    const wrapper = render()

    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }

    findChild(wrapper)
      .props()
      .onSetAssessment(updatedAssessment)

    expect(wrapper.state().assessment).toEqual(updatedAssessment)
  })

  it('provides a callback to reset the draft state to what is persisted', () => {
    const wrapper = render()

    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }
    wrapper.setState({ assessment: updatedAssessment })
    wrapper.update()

    findChild(wrapper)
      .props()
      .onResetAssessment(initialAssessment)

    expect(wrapper.state().assessment).toEqual(initialAssessment)
  })

  it('provides a callback to persist the draft state', () => {
    const handleSave = jest.fn()
    const wrapper = render(handleSave)

    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }

    findChild(wrapper)
      .props()
      .onSaveAssessment(updatedAssessment)

    expect(handleSave).toHaveBeenCalledWith(updatedAssessment)
  })
})
