import React from 'react'
import { shallow } from 'enzyme'
import { LoadingState } from '../../util/loadingHelper'
import UnsavedDataWarning from '../common/UnsavedDataWarning'
import AssessmentPageHeader from './AssessmentPageHeader'

describe('AssessmentPageHeader', () => {
  const fakeAssessment = { id: 123, state: { under_six: true }, event_date: '2018-02-02' }
  let updateHeaderButtons
  let updateHeaderButtonsToDefault
  let pageHeaderButtonsController
  const onResetAssessment = jest.fn()
  const onSaveAssessment = jest.fn()

  const render = (
    pageHeaderButtonsController,
    {
      assessment = fakeAssessment,
      i18n = {},
      isDirty = false,
      isEditable = true,
      isEventDateBeforeDob = false,
      isValidDate = true,
      loadingState = LoadingState.ready,
    } = {}
  ) =>
    shallow(
      <AssessmentPageHeader
        assessment={assessment}
        i18n={i18n}
        isDirty={isDirty}
        isEditable={isEditable}
        isEventDateBeforeDob={isEventDateBeforeDob}
        isValidDate={isValidDate}
        loadingState={loadingState}
        onResetAssessment={onResetAssessment}
        onSaveAssessment={onSaveAssessment}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />,
      { disableLifecycleMethods: true }
    )

  beforeEach(() => {
    updateHeaderButtons = jest.fn()
    updateHeaderButtonsToDefault = jest.fn()
    pageHeaderButtonsController = {
      updateHeaderButtons,
      updateHeaderButtonsToDefault,
    }
  })

  it('renders an UnsavedDataWarning', () => {
    const wrapper = render(pageHeaderButtonsController)
    const warning = wrapper.find(UnsavedDataWarning)
    expect(warning.props().isUnsaved).toBe(false)
    expect(warning.props().isSavable).toBe(wrapper.state().isSaveButtonEnabled)
    expect(warning.props().assessmentId).toBe(123)
  })

  it('passes the isDirty property to UnsavedDataWarning', () => {
    const wrapper = render(pageHeaderButtonsController)
    wrapper.setProps({ isDirty: true })
    expect(wrapper.find(UnsavedDataWarning).props().isUnsaved).toBe(true)
  })

  it('calls onSaveAssessment when the UnsavedDataWarning saves and continues', () => {
    onSaveAssessment.mockReset()
    const wrapper = render(pageHeaderButtonsController)
    const result = wrapper
      .find(UnsavedDataWarning)
      .props()
      .saveAndContinue()
    expect(result).toBeDefined()
    expect(onSaveAssessment).toHaveBeenCalledTimes(1)
  })

  it('calls onResetAssessment when the UnsavedDataWarning discards and continues', () => {
    onResetAssessment.mockReset()
    const wrapper = render(pageHeaderButtonsController)
    const result = wrapper
      .find(UnsavedDataWarning)
      .props()
      .discardAndContinue()
    expect(result).toBeDefined()
    expect(onResetAssessment).toHaveBeenCalledTimes(1)
  })

  it('initializes the page header buttons on mount', () => {
    const header = render(pageHeaderButtonsController)

    header.instance().componentDidMount()
    expect(updateHeaderButtons).toHaveBeenCalledTimes(1)
  })

  it('updates the page header buttons on update, if saveable state changed', () => {
    const header = render(pageHeaderButtonsController)

    expect(header.state().isSaveButtonEnabled).toBe(true)

    header.setProps({
      isValidDate: false,
    })
    header.update()
    header.instance().componentDidUpdate()
    expect(header.state().isSaveButtonEnabled).toBe(false)
    expect(updateHeaderButtons).toHaveBeenCalledTimes(1)
  })

  it('does not update the page header buttons when saveable does not change', () => {
    const header = render(pageHeaderButtonsController)

    expect(header.state().isSaveButtonEnabled).toBe(true)

    header.setProps({
      assessment: { ...fakeAssessment, state: { under_six: false } },
    })
    header.update()
    header.instance().componentDidUpdate()
    expect(header.state().isSaveButtonEnabled).toBe(true)
    expect(updateHeaderButtons).not.toHaveBeenCalled()
  })

  it('can be saveable', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '2019-01-01' },
      isEditable: true,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(true)
  })

  it('is saveable when under_six is false', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: false }, event_date: '2019-01-01' },
      isEditable: true,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(true)
  })

  it('is not saveable when there is no age template selected', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: undefined }, event_date: '2019-01-01' },
      isEditable: true,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the event date is invalid', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '2019-01-01' },
      isEditable: false,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the event date is before date of birth', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '2017-01-01' },
      isEditable: true,
      isEventDateBeforeDob: true,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the assessment is not editable', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '2019-01-01' },
      isEditable: false,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when there is no event_date', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '' },
      isEditable: true,
      isEventDateBeforeDob: false,
      isValidDate: true,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when assessment is loading', () => {
    const header = render(pageHeaderButtonsController, {
      assessment: { state: { under_six: true }, event_date: '2019-01-01' },
      isEditable: true,
      isEventDateBeforeDob: false,
      isValidDate: true,
      loadingState: LoadingState.waiting,
    })
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })
})
