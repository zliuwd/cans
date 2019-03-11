import React from 'react'
import { shallow } from 'enzyme'
import AssessmentPageHeader from './AssessmentPageHeader'
import { LoadingState } from '../../util/loadingHelper'

describe('AssessmentPageHeader', () => {
  const fakeAssessment = { state: { under_six: true }, event_date: '2018-02-02' }
  const i18n = {}
  let updateHeaderButtons
  let updateHeaderButtonsToDefault
  let pageHeaderButtonsController

  const render = pageHeaderButtonsController =>
    shallow(
      <AssessmentPageHeader
        assessment={fakeAssessment}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
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

  it('renders nothing', () => {
    expect(render(pageHeaderButtonsController).type()).toBe(null)
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
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(true)
  })

  it('is saveable when under_six is false', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: false }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(true)
  })

  it('is not saveable when there is no age template selected', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: undefined }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the event date is invalid', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={false}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the event date is before date of birth', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '2017-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when the assessment is not editable', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={false}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when there is no event_date', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.ready}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })

  it('is not saveable when assessment is loading', () => {
    const header = shallow(
      <AssessmentPageHeader
        assessment={{ state: { under_six: true }, event_date: '2019-01-01' }}
        clientDateOfBirth={'2018-01-01'}
        i18n={i18n}
        isEditable={true}
        isValidDate={true}
        loadingState={LoadingState.updating}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )
    expect(header.state().isSaveButtonEnabled).toBe(false)
  })
})
