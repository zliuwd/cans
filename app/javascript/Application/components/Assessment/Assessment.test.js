import React from 'react';
import { Assessment, Domain } from './';
import { mount } from 'enzyme';
import { cloneDeep } from 'lodash';

import { assessment, i18n } from './assessment.mocks.test';

describe('<Assessment />', () => {
  describe('assessment form with data', () => {
    it('renders with 1 <Domain /> component', () => {
      const wrapper = mount(<Assessment assessment={assessment} i18n={i18n} />);
      expect(wrapper.find(Domain).length).toBe(1);
    });
  });

  describe('updateItem', () => {
    describe('onUpdateAssessment call back', () => {
      it('is invoked when item rating is updated', () => {
        const mockFn = jest.fn();
        const wrapper = mount(<Assessment onAssessmentUpdate={mockFn} assessment={assessment} i18n={i18n} />);
        expect(assessment.state.domains[0].items[0].rating).toBe(1);
        wrapper.instance().handleUpdateItemRating('1', 2);
        const newAssessment = cloneDeep(assessment);
        newAssessment.state.domains[0].items[0].rating = 2;
        expect(mockFn).toHaveBeenCalledWith(newAssessment);
      });

      it('is invoked when item confidentiality is updated', () => {
        const mockFn = jest.fn();
        const wrapper = mount(<Assessment onAssessmentUpdate={mockFn} assessment={assessment} i18n={i18n} />);
        expect(assessment.state.domains[0].items[3].confidential).toBe(false);
        wrapper.instance().handleUpdateItemConfidentiality('EXPOSURE', true);
        const newAssessment = cloneDeep(assessment);
        newAssessment.state.domains[0].items[3].confidential = true;
        expect(mockFn).toHaveBeenCalledWith(newAssessment);
      });
    });
  });
});
