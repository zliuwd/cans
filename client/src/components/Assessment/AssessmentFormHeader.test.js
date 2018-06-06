import React from 'react';
import { AssessmentFormHeader } from './index';

describe('<AssessmentFormHeader />', () => {
  describe('with child name', () => {
    it('displays correct child name', () => {
      const props = {
        clientFirstName: 'test',
        clientLastName: 'child',
      };
      const wrapper = shallow(<AssessmentFormHeader {...props} />);
      const selector = '#child-name';

      expect(wrapper.find(selector).text()).toBe('test child');
      expect(wrapper.find(selector).text()).not.toBe('testchild');
      expect(wrapper.find(selector).text()).not.toBe('something else');
    });
  });
  describe('with no child name', () => {
    it('displays default message', () => {
      const wrapper = shallow(<AssessmentFormHeader />);
      const selector = '#no-data';

      expect(wrapper.find(selector).text()).toBe('Client Info');
      expect(wrapper.find(selector).text()).not.toBe('something else');
    });
  });
});
