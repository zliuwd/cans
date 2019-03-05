import React from 'react'
import { shallow } from 'enzyme'
import NewAssessmentContainer from './NewAssessmentContainer'
import AssessmentContainerInner from './AssessmentContainerInner'
import { AssessmentStatus } from './AssessmentHelper'
import { initialAssessment, assessment as mockAssessment } from './assessment.mocks.test'

describe('NewAssessmentContainer', () => {
  const render = ({ assessment = {}, client = {}, onSaveAssessment = () => {}, onSetAssessment = () => {} } = {}) =>
    shallow(
      <NewAssessmentContainer
        assessment={assessment}
        client={client}
        i18n={{}}
        onSaveAssessment={onSaveAssessment}
        onSetAssessment={onSetAssessment}
      />
    )

  it('renders an AssessmentContainerInner', () => {
    expect(
      render()
        .find(AssessmentContainerInner)
        .exists()
    ).toBe(true)
  })

  it('calls onSaveAssessment with completed assessment when submitted', () => {
    const client = { id: 123 }
    const onSaveAssessment = jest.fn()
    const wrapper = render({ client, onSaveAssessment })

    wrapper.props().handleSubmitAssessment()

    expect(onSaveAssessment).toHaveBeenCalledTimes(1)
    expect(onSaveAssessment).toHaveBeenCalledWith({
      status: AssessmentStatus.completed,
      person: client,
    })
  })

  it('is editable when there is no assessment', () => {
    // TODO - Do we want this to be a valid situation?
    const wrapper = render({ assessment: null })

    expect(wrapper.props().isEditable).toBe(true)
  })

  it('is editable when a new assessment has not yet been saved', () => {
    const assessment = initialAssessment
    expect(assessment.id).toBeUndefined()
    const wrapper = render({ assessment })

    expect(wrapper.props().isEditable).toBe(true)
  })

  it('is editable when allowed to update the assessment', () => {
    const assessment = {
      ...mockAssessment,
      metadata: {
        allowed_operations: ['update'],
      },
    }

    const wrapper = render({ assessment })
    expect(wrapper.props().isEditable).toBe(true)
  })

  it('is not editable when not allowed to update the assessment', () => {
    const assessment = {
      ...mockAssessment,
      metadata: {
        allowed_operations: ['read', 'create', 'complete', 'write', 'delete'],
      },
    }

    const wrapper = render({ assessment })
    expect(wrapper.props().isEditable).toBe(false)
  })

  it('updates the draft assessment upon request', () => {
    const client = { id: 'hello' }
    const onSetAssessment = jest.fn()
    const wrapper = render({ client, onSetAssessment })

    wrapper.props().onAssessmentUpdate(mockAssessment)

    expect(onSetAssessment).toHaveBeenCalledTimes(1)
    expect(onSetAssessment).toHaveBeenCalledWith({
      ...mockAssessment,
      person: client,
    })
  })
})
// TODO
// Convert Instrument to new Assessment (rebase with Denys's changes)
// Scroll behavior
// Unsaved changes
// Update save button status
// isEditable state
// Header buttons
// Update URL on first save
