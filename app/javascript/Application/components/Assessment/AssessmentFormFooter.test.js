import React from 'react'
import AssessmentFormFooter from './AssessmentFormFooter'
import SecurityService from '../common/Security.service'
import { shallow } from 'enzyme'

jest.mock('../common/Security.service')
jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))

describe('AssessmentFormFooter', () => {
  const render = ({ isSubmitButtonEnabled = true, onCancelClick = jest.fn(), onSubmitAssessment = jest.fn() }) =>
    shallow(
      <AssessmentFormFooter
        assessment={{ person: { identifier: 'aaa' } }}
        isSubmitButtonEnabled={isSubmitButtonEnabled}
        onCancelClick={onCancelClick}
        onSubmitAssessment={onSubmitAssessment}
      />
    )

  describe('cancel button', () => {
    it('invokes a callback', () => {
      const mockFn = jest.fn()
      const footer = render({ onCancelClick: mockFn })
      footer.find('Button#cancel-assessment').simulate('click')
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
