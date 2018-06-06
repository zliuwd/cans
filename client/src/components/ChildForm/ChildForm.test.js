import React from 'react';
import { mount, shallow } from 'enzyme';
import ChildForm from './ChildForm';

describe('<ChildForm />', () => {
  const getWrapper =  () =>  shallow(<ChildForm />);
  const getMountWrapper = async () => await mount(<ChildForm />);
  const getLength = async component => {
    const wrapper = await getMountWrapper();
    const length = wrapper.find(component).length;
    wrapper.unmount();
    return length;
  };

  it('verifies the numbers of Cards, CardHeader, CardContent, and CardActions', async () => {
    expect(await getLength('Card')).toEqual(1);
    expect(await getLength('CardHeader')).toEqual(1);
    expect(await getLength('CardContent')).toEqual(1);
    expect(await getLength('CardActions')).toEqual(1);
  });

  describe('input validation', () => {
    it('validates first_name', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      await childFormWrapper.instance().handleChange('first_name')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').first_name).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates last_name', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      await childFormWrapper.instance().handleChange('last_name')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').last_name).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates case_id', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      await childFormWrapper.instance().handleChange('case_id')({
        target: { value: 'John' },
      });
      expect(childFormWrapper.state('childInfoValidation').case_id).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates dob', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      await childFormWrapper.instance().handleChange('dob')({
        target: { value: '2012/10/12' },
      });
      expect(childFormWrapper.state('childInfoValidation').dob).toEqual(true);
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('validates county', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      await childFormWrapper.instance().handleChange('county')({
        target: { value: { id: '1' } },
      });
      expect(childFormWrapper.state('childInfoValidation').county).toEqual(
        true
      );
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(true);
    });

    it('enables Save button when all validations are good', async () => {
      const wrapper = await getWrapper();
      const childFormWrapper = wrapper.find('ChildForm').dive();
      const childFormInstance = childFormWrapper.instance();
      await childFormInstance.handleChange('first_name')({
        target: { value: 'John' },
      });
      await childFormInstance.handleChange('last_name')({
        target: { value: 'John' },
      });
      await childFormInstance.handleChange('case_id')({
        target: { value: 'John' },
      });
      await childFormInstance.handleChange('dob')({
        target: { value: 'John' },
      });
      await childFormInstance.handleChange('county')({
        target: { value: { id: '1' } },
      });
      expect(childFormWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });
  });

  it('#handleSubmit()', async () => {
    const simulateEvent = { preventDefault: () => {} };
    const wrapper = await getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    expect(childFormWrapper.find('form').length).toBe(1);
    expect(await getLength('TextField')).toEqual(5);
    expect(await getLength('Button')).toEqual(2);
    childFormWrapper.find('form').simulate('submit', simulateEvent);
  });

  it('#handleCancel()', async () => {
    const wrapper = await getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    await childFormWrapper.instance().handleCancel();
    expect(childFormWrapper.state('childInfo')).toEqual({
      person_role: 'CLIENT',
      first_name: '',
      last_name: '',
      dob: '',
      case_id: '',
      county: {
        id: 0,
        name: '',
      },
    });
  });

  it('renders counties drop down', async () => {
    const wrapper = await getWrapper();
    const childFormWrapper = wrapper.find('ChildForm').dive();
    const childFormInstance = childFormWrapper.instance();
    childFormInstance.onFetchCountiesSuccess([{ id: '1', name: 'Alameda' }]);
    childFormWrapper.update();
    const menuItems = childFormWrapper.find('span#county-name');
    expect(menuItems.length).toEqual(1);
    expect(menuItems.get(0).props.children).toEqual('Alameda');
  });
});
