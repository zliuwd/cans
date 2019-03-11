import React from 'react'
import { shallow } from 'enzyme'
import NewAssessmentContainer from './NewAssessmentContainer'
import AssessmentContainerInner from './AssessmentContainerInner'
import AssessmentPageHeader from './AssessmentPageHeader'
import { AssessmentStatus } from './AssessmentHelper'
import { initialAssessment, assessment as mockAssessment } from './assessment.mocks.test'

describe('NewAssessmentContainer', () => {
  const fakeController = {
    updateHeaderButtons: () => {},
    updateHeaderButtonsToDefault: () => {},
  }

  const render = ({
    assessment = { state: { under_six: false } },
    client = { dob: '2018-01-01' },
    onSaveAssessment = () => {},
    onSetAssessment = () => {},
  } = {}) =>
    shallow(
      <NewAssessmentContainer
        assessment={assessment}
        client={client}
        i18n={{}}
        onSaveAssessment={onSaveAssessment}
        onSetAssessment={onSetAssessment}
        pageHeaderButtonsController={fakeController}
      />
    )

  it('renders an AssessmentPageHeader', () => {
    const header = render().find(AssessmentPageHeader)
    expect(header.exists()).toBe(true)
    expect(header.props().pageHeaderButtonsController).toBe(fakeController)
  })

  it('renders an AssessmentContainerInner', () => {
    expect(
      render()
        .find(AssessmentContainerInner)
        .exists()
    ).toBe(true)
  })

  it('calls onSaveAssessment with completed assessment when submitted', () => {
    const client = { identifier: '123', dob: '2018-01-01' }
    const onSaveAssessment = jest.fn()
    const wrapper = render({ client, onSaveAssessment })

    wrapper
      .find(AssessmentContainerInner)
      .props()
      .handleSubmitAssessment()

    expect(onSaveAssessment).toHaveBeenCalledTimes(1)
    expect(onSaveAssessment).toHaveBeenCalledWith({
      state: { under_six: false },
      status: AssessmentStatus.completed,
      person: client,
    })
  })

  it('calls onSaveAssessment with the current assessment when saved', () => {
    const client = { identifier: '123', dob: '2018-01-01' }
    const onSaveAssessment = jest.fn()
    const wrapper = render({ client, onSaveAssessment })

    wrapper
      .find(AssessmentPageHeader)
      .props()
      .onSaveAssessment()

    expect(onSaveAssessment).toHaveBeenCalledTimes(1)
    expect(onSaveAssessment).toHaveBeenCalledWith({
      state: { under_six: false },
      person: client,
    })
  })

  it('renders nothing when there is no assessment', () => {
    const wrapper = render({ assessment: null })

    expect(wrapper.type()).toBe(null)
  })

  it('is editable when a new assessment has not yet been saved', () => {
    const assessment = initialAssessment
    expect(assessment.id).toBeUndefined()
    const wrapper = render({ assessment })

    expect(wrapper.find(AssessmentContainerInner).props().isEditable).toBe(true)
  })

  it('is editable when allowed to update the assessment', () => {
    const assessment = {
      ...mockAssessment,
      metadata: {
        allowed_operations: ['update'],
      },
    }

    const wrapper = render({ assessment })
    expect(wrapper.find(AssessmentContainerInner).props().isEditable).toBe(true)
  })

  it('is not editable when not allowed to update the assessment', () => {
    const assessment = {
      ...mockAssessment,
      metadata: {
        allowed_operations: ['read', 'create', 'complete', 'write', 'delete'],
      },
    }

    const wrapper = render({ assessment })
    expect(wrapper.find(AssessmentContainerInner).props().isEditable).toBe(false)
  })

  it('updates the draft assessment upon request', () => {
    const client = { identifier: 'hello', dob: '2018-01-01' }
    const onSetAssessment = jest.fn()
    const wrapper = render({ client, onSetAssessment })

    wrapper
      .find(AssessmentContainerInner)
      .props()
      .onAssessmentUpdate(mockAssessment)

    expect(onSetAssessment).toHaveBeenCalledTimes(1)
    expect(onSetAssessment).toHaveBeenCalledWith({
      ...mockAssessment,
      person: client,
    })
  })
})
// TODO
// Scroll behavior
// Unsaved changes
// isEditable state
// Update URL on first save
