import React from 'react';
import { AssessmentFormHeader } from './index';
import { DateTime } from 'luxon';
import { Alert } from '@cwds/components'

describe('<AssessmentFormHeader />', () => {
  describe('with child name', () => {
    it('displays correct child name', () => {
      const props = {
        clientFirstName: 'test',
        clientLastName: 'child',
      };
      const wrapper = shallow(<AssessmentFormHeader {...props} />);
      const selector = '#child-name';

      expect(wrapper.find(selector).text()).toBe('child, test');
    });
  });

  describe('with no child name', () => {
    it('displays default message', () => {
      const wrapper = shallow(<AssessmentFormHeader />);
      const selector = '#no-data';

      expect(wrapper.find(selector).text()).toBe('Client Info');
    });
  });

  describe('select date', () => {
    it('should default to todays date', () => {
      const today = DateTime.local().toISODate();
      const tomorrow = DateTime.local()
        .plus({days: 1})
        .toISODate()

      const props = {
        onValueChange: jest.fn(),
        assessmentDate: today,
      };

      const wrapper = shallow(<AssessmentFormHeader {...props}/>);
      expect(wrapper.instance().props.assessmentDate).toBe(today);
      expect(wrapper.find('#date-select').props().value).toBe(today);
      expect(wrapper.instance().props.assessmentDate).not.toBe(tomorrow);
    });

    it('should allow user to change date', () => {
      const today = DateTime.local().toISODate()
      const tomorrow = {
        target: {
          value: DateTime.local().plus({ days: 1 }).toISODate(),
          name: 'event_date',
        }
      };

      const onValueChange = jest.fn();

      const wrapper = shallow(<AssessmentFormHeader assessmentDate={today} onValueChange={onValueChange} />);

      expect(wrapper.instance().props.assessmentDate).toBe(today);
      wrapper.instance().handleValueChange(tomorrow);
      expect(onValueChange).toBeCalled();
      expect(onValueChange).toBeCalledWith(tomorrow.target.name, tomorrow.target.value);
    });
  });

  describe('select can_release_confidential_info', () => {
    it('should default to false', () => {
      const value = false;

      const wrapper = shallow(<AssessmentFormHeader canReleaseInformation={value}/>);
      expect(wrapper.instance().props.canReleaseInformation).toBe(value);
    });

    it('should allow user to change can_release_confidential_info', () => {
      const defaultValue = false;
      const newValue = { target: { value: 'true', name: 'can_release_confidential_info'}};

      const onValueChange = jest.fn();
      const props = {
        onValueChange: jest.fn(),
        canReleaseInformation: defaultValue,
      };

      const wrapper = shallow(<AssessmentFormHeader {...props} onValueChange={onValueChange} />);

      expect(wrapper.instance().props.canReleaseInformation).toBe(false);
      wrapper.instance().handleValueChange(newValue);
      expect(onValueChange).toBeCalledWith('can_release_confidential_info', true);
    });
  });

  describe('select completedAs', () => {
    it('should default to Communimetric', () => {
      const value = 'Communimetric';

      const wrapper = shallow(<AssessmentFormHeader assessmentCompletedAs={value}/>);
      expect(wrapper.instance().props.assessmentCompletedAs).toBe(value);
    });

    it('should allow user to change completedAs', () => {
      const defaultValue = 'Communimetric';
      const newValue = { target: { value: 'Social Worker', name: 'completed_as' } };

      const onValueChange = jest.fn();
      const props = {
        onValueChange: jest.fn(),
        assessmentCompletedAs: defaultValue,
      };

      const wrapper = shallow(<AssessmentFormHeader {...props} onValueChange={onValueChange}/>);

      expect(wrapper.instance().props.assessmentCompletedAs).toBe('Communimetric');
      wrapper.instance().handleValueChange(newValue);
      expect(onValueChange).toBeCalledWith('completed_as', 'Social Worker');
    });
  });

  describe('parseCanReleaseInfo', () => {
    it('should return a boolean value when passed a string', () => {
      const value = { target: { value: 'true', name: 'can_release_confidential_info' } };

      expect(AssessmentFormHeader.parseCanReleaseInfo(value)).toBe(true);
    });

    it('should return the original value if the target name isnt can_release_confidential_info', () => {
      const value = { target: { value: 1, name: 'completed_as' } };

      expect(AssessmentFormHeader.parseCanReleaseInfo(value)).toBe(1);
    });
  });

  describe('renderWarningAlert', () => {
    const props = {
      onValueChange: () => {},
      clientFirstName: '',
      clientLastName:'',
      assessmentDate: '',
      assessmentCompletedAs: '',
      canReleaseInformation: false
    }

    it('should render Alert component when canReleaseInformation is false', () => {
      const wrapper = shallow(<AssessmentFormHeader {...props}/>);
      expect(wrapper.find(Alert).length).toBe(1)
    });

    it('should render specific message', () => {
      const wrapper = shallow(<AssessmentFormHeader  {...props}/>);
      expect(wrapper.find(Alert).html()).toMatch(/Prior to sharing the CANS assessment redact item number 7, 48, EC.41 and EC.18/)
    });

  });

});
