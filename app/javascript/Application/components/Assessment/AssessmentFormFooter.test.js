import React from 'react'
import AssessmentFormFooter from './AssessmentFormFooter'
import { shallow } from 'enzyme'

describe('AssessmentFormFooter', () => {
  const render = ({ isSubmitButtonEnabled = true, onCancelClick = jest.fn(), onSubmitAssessment = jest.fn() }) =>
    shallow(
      <AssessmentFormFooter
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

  describe('submit button', () => {
    it('can invoke a callback when enabled', () => {
      const mockFn = jest.fn()
      const footer = render({ onSubmitAssessment: mockFn })
      const submitButton = footer.find('Button#submit-assessment')
      expect(submitButton.props().disabled).toBe(false)
      submitButton.simulate('click')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
      const footer = render({ isSubmitButtonEnabled: false })
      expect(footer.find('Button#submit-assessment').props().disabled).toBe(true)
    })
  })
})
