import React from 'react';
import { mount, shallow } from 'enzyme';
import ChildForm from './ChildForm';

describe('<ChildForm />', () => {
  const getWrapper =  () =>  shallow(<ChildForm />);
  const getMountWrapper = () => mount(<ChildForm />);
  const getLength = component => {
    const wrapper = getMountWrapper();
    const length = wrapper.find(component).length;
    wrapper.unmount();
    return length;
  };

  it('verifies the numbers of Cards, CardHeader, CardContent, and CardActions', () => {
    expect(getLength('Card')).toEqual(1);
    expect(getLength('CardHeader')).toEqual(1);
    expect(getLength('CardContent')).toEqual(1);
    expect(getLength('CardActions')).toEqual(1);
  });

  describe('input validation', () => {
    it('validates first_name', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      childFormWrapper.instance().handleChange('first_name')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').first_name).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates last_name', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      childFormWrapper.instance().handleChange('last_name')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').last_name).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates case_id', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      childFormWrapper.instance().handleChange('case_id')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').case_id).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates dob', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      childFormWrapper.instance().handleChange('dob')({
        target: { value: '2012/10/12' },
      });
      expect(childFormWrapper.state('childInfoValidation').dob).toEqual(true);
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates county', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      childFormWrapper.instance().handleChange('county')({
        target: { value: { id: '1' } },
      });
      expect(childFormWrapper.state('childInfoValidation').county).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('enables Save button when all validations are good', () => {
      const wrapper = getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      const childFormInstance = childFormWrapper.instance();
      childFormInstance.handleChange('first_name')({
        target: { value: 'John' },
      });
      childFormInstance.handleChange('last_name')({
        target: { value: 'Max' },
      });
      childFormInstance.handleChange('case_id')({
      target: { value: '879R34U7' },
      });
      childFormInstance.handleChange('external_id')({
        target: { value: '1234567891234567890' },
      });
      childFormInstance.handleChange('external_id')({
        target: { value: '1234-5678-9123-4567890' },
      });
      childFormInstance.handleChange('dob')({
        target: { value: '02/08/2002' },
      });
      childFormInstance.handleChange('county')({
        target: { value: { id: '5' } },
      });
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });
  });

  it('#handleSubmit()', () => {
    const simulateEvent = { preventDefault: () => {} };
    const wrapper = getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    expect(childFormWrapper.find('form').length).toBe(1);
    expect(getLength('TextField')).toEqual(6);
    expect(getLength('Button')).toEqual(2);
    childFormWrapper.find('form').simulate('submit', simulateEvent);
  });

  it('#handleCancel()', () => {
    const wrapper = getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    childFormWrapper.instance().handleCancel();
    expect(childFormWrapper.state('childInfo').person_role).toEqual('CLIENT')
    expect(childFormWrapper.state('childInfo').first_name).toEqual('')
    expect(childFormWrapper.state('childInfo').dob).toEqual('')
    expect(childFormWrapper.state('childInfo').case_id).toEqual('')
    expect(childFormWrapper.state('childInfo').external_id).toEqual('')
    expect(childFormWrapper.state('childInfo').county.id).toEqual(0)
    expect(childFormWrapper.state('childInfo').county.name).toEqual('')
  });

  it('renders counties drop down', () => {
    const wrapper = getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    const childFormInstance = childFormWrapper.instance();
    childFormInstance.onFetchCountiesSuccess([{ id: '1', name: 'Alameda' }]);
    childFormWrapper.update();
    const menuItems = childFormWrapper.find('span#county-name');
    expect(menuItems.length).toEqual(1);
    expect(menuItems.get(0).props.children).toEqual('Alameda');
  });
});
