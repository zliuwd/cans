import React from 'react';
import AssessmentFormFooter from './AssessmentFormFooter';
import { shallow } from 'enzyme';

describe('AssessmentFormFooter', () => {
  describe('cancel button', () => {
    it('invokes a callback', () => {
      const mockFn = jest.fn();
      const footer = shallow(<AssessmentFormFooter onCancelClick={mockFn} />);
      footer.find('Button#cancel-assessment').simulate('click');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('save button', () => {
    it('can invoke a callback when enabled', () => {
      const mockFn = jest.fn();
      const footer = shallow(<AssessmentFormFooter isSaveButtonEnabled={true} onSaveAssessment={mockFn} />);
      const saveButton = footer.find('Button#save-assessment');
      expect(saveButton.props().disabled).toBe(false);
      saveButton.simulate('click');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
      const footer = shallow(<AssessmentFormFooter isSaveButtonEnabled={false} />);
      expect(footer.find('Button#save-assessment').props().disabled).toBe(true);
    });
  });

  describe('submit button', () => {
    it('can invoke a callback when enabled', () => {
      const mockFn = jest.fn();
      const footer = shallow(<AssessmentFormFooter isSubmitButtonEnabled={true} onSubmitAssessment={mockFn} />);
      const submitButton = footer.find('Button#submit-assessment');
      expect(submitButton.props().disabled).toBe(false);
      submitButton.simulate('click');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
      const footer = shallow(<AssessmentFormFooter isSubmitButtonEnabled={false} />);
      expect(footer.find('Button#submit-assessment').props().disabled).toBe(true);
    });
  });
});
