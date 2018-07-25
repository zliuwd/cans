import React from 'react';
import { shallow } from 'enzyme';
import ClientEditForm from './ClientEditForm';
import { ClientService } from './Client.service';
import { childInfoJson } from './Client.helper.test';

const defaultProps = {
  location: { childId: 1 },
  match: { params: { id: 1 } },
};

describe('<ClientEditForm />', () => {
  const getWrapper = () => shallow(<ClientEditForm {...defaultProps} />);

  describe('input validation', () => {
    it('validates first_name', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      ClientEditWrapper.instance().handleChange('first_name')({
        target: { value: 'John' },
      });
      expect(ClientEditWrapper.state('childInfoValidation').first_name).toEqual(true);
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates last_name', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      ClientEditWrapper.instance().handleChange('last_name')({
        target: { value: 'John' },
      });
      expect(ClientEditWrapper.state('childInfoValidation').last_name).toEqual(true);
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates case_id', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      ClientEditWrapper.instance().handleChange('case_id')({
        target: { value: 'John' },
      });
      expect(ClientEditWrapper.state('childInfoValidation').case_id).toEqual(true);
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates dob', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      ClientEditWrapper.instance().handleChange('dob')({
        target: { value: '2012/10/12' },
      });
      expect(ClientEditWrapper.state('childInfoValidation').dob).toEqual(true);
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates county', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      ClientEditWrapper.instance().handleChange('county')({
        target: { value: { id: '1' } },
      });
      expect(ClientEditWrapper.state('childInfoValidation').county).toEqual(true);
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('enables Save button when all validations are good', () => {
      const wrapper = getWrapper();
      const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
      const childFormInstance = ClientEditWrapper.instance();
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
      expect(ClientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });
  });

  it('#handleSubmit()', async () => {
    const ClientServicePutSpy = jest.spyOn(ClientService, 'updateClient');
    const wrapper = getWrapper();
    const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
    ClientServicePutSpy.mockReturnValue(Promise.resolve(childInfoJson));
    await ClientEditWrapper.instance().handleSubmit();
    expect(ClientEditWrapper.state().redirection.shouldRedirect).toBe(true);
    ClientServicePutSpy.mockClear();
  });

  it('#handleCancel()', () => {
    const wrapper = getWrapper();
    const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
    ClientEditWrapper.instance().handleCancel();
    expect(ClientEditWrapper.state('redirection').shouldRedirect).toBe(true);
  });

  it('renders counties drop down', () => {
    const wrapper = getWrapper();
    const ClientEditWrapper = wrapper.find('ClientEditForm').dive();
    const childFormInstance = ClientEditWrapper.instance();
    childFormInstance.onFetchCountiesSuccess([{ id: '9', name: 'Fresno' }]);
    ClientEditWrapper.update();
    const menuItems = ClientEditWrapper.find('MenuItem');
    expect(menuItems.children.length).toEqual(1);
  });
});
