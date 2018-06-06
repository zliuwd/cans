import React from 'react';
import { Assessment } from './index';

describe('<Assessment />', () => {
  describe('with no existing assessment', () => {
    it('calls fetchNewAssessment', () => {
      const props = {
        location: { clientFirstName: 'test', clientLastName: 'child' },
        match: { params: { id: undefined } },
      };

      const fetchNewAssessmentSpy = jest.spyOn(
        Assessment.prototype,
        'fetchNewAssessment'
      );
      const wrapper = shallow(<Assessment {...props} />);
      wrapper.instance().componentDidMount();
      expect(fetchNewAssessmentSpy).toHaveBeenCalled();
    });
  });

  describe('with an existing assessment', () => {
    it('calls fetchAssessment', () => {
      const props = {
        location: { clientFirstName: 'test', clientLastName: 'child' },
        match: { params: { id: 1 } },
      };

      const fetchAssessmentSpy = jest.spyOn(
        Assessment.prototype,
        'fetchAssessment'
      );
      const wrapper = shallow(<Assessment {...props} />);
      wrapper.instance().componentDidMount();
      expect(fetchAssessmentSpy).toHaveBeenCalled();
    });
  });
});
