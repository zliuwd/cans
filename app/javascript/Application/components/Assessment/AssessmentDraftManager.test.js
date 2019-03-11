import React from 'react'
import { shallow } from 'enzyme'
import AssessmentDraftManager from './AssessmentDraftManager'
import * as AssessmentMocks from './assessment.mocks.test'
import { LoadingState } from '../../util/loadingHelper'

const MyComponent = () => 'Hello'

describe('AssessmentDraftManager', () => {
  const initialAssessment = AssessmentMocks.assessment
  const i18n = { key: 'value' }

  const render = ({
    onSave = () => {},
    assessment = initialAssessment,
    history = { push: jest.fn() },
    match = { url: '' },
    loadingState = LoadingState.ready,
  } = {}) =>
    shallow(
      <AssessmentDraftManager
        assessmentWithI18n={{ assessment, i18n }}
        history={history}
        loadingState={loadingState}
        match={match}
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

  it('updates the url when a new assessment is updated with an id', () => {
    const pushSpy = jest.fn()
    const history = { push: pushSpy }
    const match = { url: '/path/to/assessment' }
    const wrapper = render({
      assessment: AssessmentMocks.initialAssessment,
      loadingState: LoadingState.ready,
      history,
      match,
    })
    wrapper.setProps({ loadingState: LoadingState.updating })
    wrapper.update()
    const prevProps = wrapper.instance().props
    const prevState = wrapper.state()
    wrapper.setProps({
      assessmentWithI18n: { assessment: AssessmentMocks.assessment, i18n },
      loadingState: LoadingState.ready,
    })
    wrapper.update()
    wrapper.instance().componentDidUpdate(prevProps, prevState)

    expect(pushSpy).toHaveBeenCalledWith('/path/to/assessment/1')
  })

  it('does not update the url when an assessment already had an id', () => {
    const pushSpy = jest.fn()
    const history = { push: pushSpy }
    const match = { url: '/path/to/assessment' }
    const wrapper = render({
      assessment: AssessmentMocks.assessment,
      loadingState: LoadingState.ready,
      history,
      match,
    })
    wrapper.setProps({ loadingState: LoadingState.updating })
    wrapper.update()
    const prevProps = wrapper.instance().props
    const prevState = wrapper.state()
    wrapper.setProps({
      assessmentWithI18n: { assessment: { ...AssessmentMocks.assessment, id: 2 }, i18n },
      loadingState: LoadingState.ready,
    })
    wrapper.update()
    wrapper.instance().componentDidUpdate(prevProps, prevState)

    expect(pushSpy).not.toHaveBeenCalled()
  })

  describe('without a loaded assessment', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(
        <AssessmentDraftManager
          assessmentWithI18n={{ assessment: null, i18n }}
          history={{ push: () => {} }}
          match={{ url: '' }}
          loadingState={LoadingState.waiting}
          onSave={() => {}}
        >
          <MyComponent />
        </AssessmentDraftManager>
      )
    })

    it('saves the draft assessment to state when the loading state transitions to Ready', () => {
      wrapper.setProps({
        assessmentWithI18n: { assessment: initialAssessment, i18n },
        loadingState: LoadingState.ready,
      })
      wrapper.update()
      expect(wrapper.state().assessment).toEqual(initialAssessment)
    })

    it('is considered clean', () => {
      expect(findChild(wrapper).props().isDirty).toBe(false)
    })
  })

  it('updates the draft assessment when the loading state transitions to Ready from Updating', () => {
    const wrapper = shallow(
      <AssessmentDraftManager
        assessmentWithI18n={{ assessment: initialAssessment, i18n }}
        history={{ push: () => {} }}
        match={{ url: '' }}
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

  describe('when the draft assessment is clean', () => {
    let wrapper
    beforeEach(() => {
      wrapper = render()
    })

    it('passes isDirty as false', () => {
      expect(findChild(wrapper).props().isDirty).toBe(false)
    })

    it('passes the assessment down to the child', () => {
      expect(findChild(wrapper).props().assessment).toEqual(initialAssessment)
    })

    it('passes the i18n values down to the child', () => {
      expect(findChild(wrapper).props().i18n).toEqual(i18n)
    })

    it('passes the loading state down to the child', () => {
      expect(findChild(wrapper).props().loadingState).toBe(LoadingState.ready)
    })

    it('provides a callback to modify the draft assessment', () => {
      const updatedAssessment = {
        ...initialAssessment,
        can_release_confidential_info: !initialAssessment.can_release_confidential_info,
      }

      findChild(wrapper)
        .props()
        .onSetAssessment(updatedAssessment)

      expect(wrapper.state().assessment).toEqual(updatedAssessment)
    })
  })

  describe('when the draft assessment is dirty', () => {
    const updatedAssessment = {
      ...initialAssessment,
      can_release_confidential_info: !initialAssessment.can_release_confidential_info,
    }
    let wrapper

    beforeEach(() => {
      wrapper = render()

      wrapper.setState({ assessment: updatedAssessment })
      wrapper.update()
    })

    it('passes isDirty as true', () => {
      expect(findChild(wrapper).props().isDirty).toBe(true)
    })

    it('passes the draft assessment when changes have occurred', () => {
      expect(findChild(wrapper).props().assessment).toEqual(updatedAssessment)
      expect(findChild(wrapper).props().assessment).not.toEqual(initialAssessment)
    })

    it('provides a callback to reset the draft state to what is persisted', () => {
      findChild(wrapper)
        .props()
        .onResetAssessment(initialAssessment)

      expect(wrapper.state().assessment).toEqual(initialAssessment)
    })
  })

  it('provides a callback to persist the draft state', () => {
    const handleSave = jest.fn()
    const wrapper = render({ onSave: handleSave })

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
