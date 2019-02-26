import React from 'react'
import AssessmentFormFooter from './AssessmentFormFooter'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'
import SecurityService from '../common/Security.service'
import { shallow } from 'enzyme'

jest.mock('../common/Security.service')
jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))

describe('AssessmentFormFooter', () => {
  const render = ({
    isSubmitButtonEnabled = true,
    onCancelClick = jest.fn(),
    onSubmitAssessment = jest.fn(),
    onClick = jest.fn(),
    assessmentId = 1234,
    assessmentStatus = AssessmentStatus.inProgress,
  }) =>
    shallow(
      <AssessmentFormFooter
        assessment={{ person: { identifier: 'aaa' }, state: { under_six: true } }}
        isEditable={true}
        isSubmitButtonEnabled={isSubmitButtonEnabled}
        onCancelClick={onCancelClick}
        onSubmitAssessment={onSubmitAssessment}
        assessmentStatus={assessmentStatus}
        assessmentId={assessmentId}
        onClick={onClick}
      />
    )

  describe('cancel button', () => {
    it('invokes a callback and should render footer buttons when isEditable=true', () => {
      const mockFn = jest.fn()
      const footer = render({ onCancelClick: mockFn })
      footer.find('Button#cancel-assessment').simulate('click')
      expect(footer.find('Button#cancel-assessment').exists()).toEqual(true)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('complete button', () => {
    it('can invoke a callback when enabled', () => {
      const mockFn = jest.fn()
      const footer = render({ onSubmitAssessment: mockFn })
      const completeButton = footer.find('CompleteAssessmentButton')
      completeButton
        .dive()
        .find('Button')
        .simulate('click')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
      const footer = render({ isSubmitButtonEnabled: false })
      expect(footer.find('CompleteAssessmentButton').props().disabled).toBe(true)
    })
  })
})

describe('form footer buttons', () => {
  const render = ({
    isSubmitButtonEnabled = true,
    onCancelClick = jest.fn(),
    onSubmitAssessment = jest.fn(),
    onClick = jest.fn(),
    assessmentId = 1234,
    assessmentStatus = AssessmentStatus.inProgress,
  }) =>
    shallow(
      <AssessmentFormFooter
        assessment={{ person: { identifier: 'aaa' }, state: { under_six: false } }}
        isEditable={false}
        isSubmitButtonEnabled={isSubmitButtonEnabled}
        onCancelClick={onCancelClick}
        onSubmitAssessment={onSubmitAssessment}
        assessmentStatus={assessmentStatus}
        assessmentId={assessmentId}
        onClick={onClick}
      />
    )
  it('FooterButtons should not be rendered when isEditable=false', () => {
    const footer = render({ isSubmitButtonEnabled: true })
    expect(footer.find('Button#cancel-assessment').exists()).toEqual(false)
  })
})
