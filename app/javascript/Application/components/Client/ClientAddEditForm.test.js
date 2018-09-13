import React from 'react';
import { shallow } from 'enzyme';
import ClientAddEditForm from './ClientAddEditForm';
import { ClientService } from './Client.service';
import { childInfoJson } from './Client.helper.test';
import { SensitivityTypesService } from './SensitivityTypes.service';

jest.mock('./SensitivityTypes.service');

const defaultPropsEdit = {
  match: { params: { id: 1 } },
};

const defaultPropsAdd = {
  match: { params: { id: undefined } },
};

describe('<ClientAddEditForm />', () => {
  const getWrapperAdd = () => shallow(<ClientAddEditForm {...defaultPropsAdd} />);
  const getWrapperEdit = () => shallow(<ClientAddEditForm {...defaultPropsEdit} />);
  const client = {
    cases: [{ external_id: '' }],
    county: { id: 0, name: '' },
    dob: '',
    external_id: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    person_role: 'CLIENT',
    suffix: '',
  };

  describe('When isNewForm is true', () => {
    it('validates the form inputs are false', () => {
      const wrapper = shallow(<ClientAddEditForm isNewForm={true} />)
        .find('ClientAddEditForm')
        .dive();
      expect(wrapper.state('childInfo')).toEqual(client);
      expect(wrapper.state('childInfoValidation').first_name).toEqual(false);
      expect(wrapper.state('childInfoValidation').last_name).toEqual(false);
      expect(wrapper.state('childInfoValidation').dob).toEqual(false);
      expect(wrapper.state('childInfoValidation').external_id).toEqual(false);
      expect(wrapper.state('childInfoValidation').county).toEqual(false);
      expect(wrapper.state('childInfoValidation').cases[0].external_id).toEqual(true);
      expect(wrapper.state('isSaveButtonDisabled')).toEqual(true);
    });
  });

  describe('When isNewForm is false', () => {
    it('validates the form is populated', () => {
      const wrapper = shallow(<ClientAddEditForm isNewForm={false} client={childInfoJson} />)
        .find('ClientAddEditForm')
        .dive();
      expect(wrapper.state('childInfo')).toEqual(childInfoJson);
      expect(wrapper.state('childInfoValidation').first_name).toEqual(true);
      expect(wrapper.state('childInfoValidation').last_name).toEqual(true);
      expect(wrapper.state('childInfoValidation').dob).toEqual(true);
      expect(wrapper.state('childInfoValidation').external_id).toEqual(true);
      expect(wrapper.state('childInfoValidation').county).toEqual(true);
      expect(wrapper.state('childInfoValidation').cases[0].external_id).toEqual(true);
      expect(wrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('#handleSubmit() updates and set shouldRedirect to true', async () => {
      const clientServicePutSpy = jest.spyOn(ClientService, 'updateClient');
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientServicePutSpy.mockReturnValue(Promise.resolve(defaultPropsEdit.match.params.id, childInfoJson));
      await clientEditWrapper.instance().handleSubmit();
      expect(clientEditWrapper.state('redirection').shouldRedirect).toBe(true);
      clientServicePutSpy.mockClear();
    });
  });

  describe('When Editing inputs:', () => {
    it('validates first_name', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientEditWrapper.instance().handleChange('first_name')({
        target: { value: 'John' },
      });
    });

    it('validates last_name', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientEditWrapper.instance().handleChange('last_name')({
        target: { value: 'John' },
      });
      expect(clientEditWrapper.state('childInfoValidation').last_name).toEqual(true);
      expect(clientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates dob', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientEditWrapper.instance().handleChange('dob')({
        target: { value: '2012/10/12' },
      });
      expect(clientEditWrapper.state('childInfoValidation').dob).toEqual(true);
      expect(clientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates county', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientEditWrapper.instance().handleChange('county')({
        target: { value: { id: '1' } },
      });
      expect(clientEditWrapper.state('childInfoValidation').county).toEqual(true);
      expect(clientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('validates cases', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      clientEditWrapper.instance().handleChangeCaseNumber(0)({
        target: { value: '4321-321-4321-87654321' },
      });
      expect(clientEditWrapper.state('childInfoValidation').cases[0].external_id).toEqual(true);
      expect(clientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });

    it('enables Save button when all validations are good', () => {
      const wrapper = getWrapperEdit();
      const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
      const childFormInstance = clientEditWrapper.instance();
      childFormInstance.handleChange('first_name')({
        target: { value: 'John' },
      });
      childFormInstance.handleChange('last_name')({
        target: { value: 'Max' },
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
      childFormInstance.handleChangeCaseNumber(0)({
        target: { value: '4321-321-4321-87654321' },
      });
      expect(clientEditWrapper.state('isSaveButtonDisabled')).toEqual(false);
    });
  });

  describe('case numbers', () => {
    describe('#handleChangeCaseNumber()', () => {
      it('should update case external_id and validate it', () => {
        // given
        const clientForm = getWrapperAdd()
          .find('ClientAddEditForm')
          .first()
          .dive();

        // when
        clientForm.instance().handleChangeCaseNumber(0)({ target: { value: '4321-321-4321-87654321' } });

        // then
        expect(clientForm.state().childInfo.cases[0].external_id).toEqual('4321-321-4321-87654321');
        expect(clientForm.state().childInfoValidation.cases[0].external_id).toBeTruthy();
      });

      it('should validate duplicated case numbers', () => {
        // given
        const clientForm = getWrapperAdd()
          .find('ClientAddEditForm')
          .first()
          .dive();
        const clientFormInstance = clientForm.instance();
        clientFormInstance.handleAddCaseNumber({ type: 'click' });

        // when
        clientFormInstance.handleChangeCaseNumber(0)({ target: { value: '4321-321-4321-87654321' } });
        expect(clientForm.state().childInfoValidation.cases[0].external_id).toBeTruthy();
        clientFormInstance.handleChangeCaseNumber(1)({ target: { value: '4321-321-4321-87654321' } });

        // then
        clientForm.update();
        expect(clientForm.state().childInfoValidation.cases[0].external_id).toBeFalsy();
        expect(clientForm.state().childInfoValidation.cases[1].external_id).toBeFalsy();
      });
    });

    describe('initialization', () => {
      it('should initialize validation object with cases', () => {
        // given
        const inputClient = { ...client, cases: [{}, {}, {}] };

        // when
        const clientForm = shallow(<ClientAddEditForm client={inputClient} isNewForm={false} />)
          .find('ClientAddEditForm')
          .first()
          .dive();

        // then
        expect(clientForm.find('.case-numbers>InputElement').length).toEqual(3);
        const expectedCasesValidation = clientForm.state().childInfoValidation.cases;
        expect(expectedCasesValidation.length).toEqual(3);
        expect(expectedCasesValidation[0]).toEqual({ external_id: true });
        expect(expectedCasesValidation[1]).toEqual({ external_id: true });
        expect(expectedCasesValidation[2]).toEqual({ external_id: true });
      });

      it('should add an initial case if child has no cases', () => {
        // given
        const clientForm = getWrapperAdd()
          .find('ClientAddEditForm')
          .first()
          .dive();

        // when
        clientForm.instance().fetchCounties({ county: { id: 0, name: '0' }, cases: [] });
        clientForm.update();

        // then
        expect(clientForm.find('.case-numbers>InputElement').length).toEqual(1);
        const expectedCasesValidation = clientForm.state().childInfoValidation.cases;
        expect(expectedCasesValidation.length).toEqual(1);
        expect(expectedCasesValidation[0]).toEqual({ external_id: true });
      });
    });

    describe('#handleAddCaseNumber()', () => {
      it('should add new empty case number and update validation object with it', () => {
        // given
        const clientForm = getWrapperAdd()
          .find('ClientAddEditForm')
          .first()
          .dive();

        // when
        clientForm.instance().handleAddCaseNumber({ type: 'click' });
        clientForm.update();

        // then
        expect(clientForm.find('.case-numbers>InputElement').length).toEqual(2);
        const expectedCases = clientForm.state().childInfo.cases;
        expect(expectedCases.length).toEqual(2);
        expect(expectedCases[1]).toEqual({ external_id: '' });
        const expectedCasesValidation = clientForm.state().childInfoValidation.cases;
        expect(expectedCasesValidation.length).toEqual(2);
        expect(expectedCasesValidation[1]).toEqual({ external_id: true });
      });
    });

    describe('#prepareChildForSubmit()', () => {
      it('should remove all cases with no external_id', () => {
        // given
        const inputChildInfo = {
          cases: [{}, { external_id: '0' }, {}, { any: 'thing' }, { external_id: '1' }, {}],
        };
        const expectedChildInfo = {
          cases: [{ external_id: '0' }, { external_id: '1' }],
        };

        // when
        const actualChildInfo = getWrapperAdd()
          .find('ClientAddEditForm')
          .first()
          .dive()
          .instance()
          .prepareChildForSubmit(inputChildInfo);

        // then
        expect(actualChildInfo).toEqual(expectedChildInfo);
      });
    });
  });

  it('#handleSubmit()', async () => {
    const clientServicePutSpy = jest.spyOn(ClientService, 'updateClient');
    const wrapper = getWrapperEdit();
    const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
    clientServicePutSpy.mockReturnValue(Promise.resolve(childInfoJson));
    await clientEditWrapper.instance().handleSubmit();
    expect(clientEditWrapper.state().redirection.shouldRedirect).toBe(true);
    clientServicePutSpy.mockClear();
  });

  it('#handleCancel()', () => {
    const wrapper = getWrapperEdit();
    const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
    clientEditWrapper.instance().handleCancel();
    expect(clientEditWrapper.state('redirection').shouldRedirect).toBe(true);
  });

  it('renders counties drop down', () => {
    const wrapper = getWrapperEdit();
    const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
    const childFormInstance = clientEditWrapper.instance();
    childFormInstance.fetchCounties([{ id: '9', name: 'Fresno' }]);
    clientEditWrapper.update();
    const menuItems = clientEditWrapper.find('MenuItem');
    expect(menuItems.children.length).toEqual(1);
  });

  describe('SensitivityType dropdown', () => {
    const fetchSpy = jest.spyOn(SensitivityTypesService, 'fetch');
    describe('when no county selected', () => {
      it('does not render sensitivityType drop down', () => {
        fetchSpy.mockClear();
        const wrapper = getWrapperAdd();
        const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
        expect(fetchSpy).toHaveBeenCalledTimes(0);
        expect(clientEditWrapper.find('#sensitivity_type_dropdown').length).toEqual(0);
      });
    });

    describe('when county selected', () => {
      const clientEditWrapper = getWrapperAdd()
        .find('ClientAddEditForm')
        .first()
        .dive();
      describe('when no sensitivity types', () => {
        it('does not render sensitivity_type drop down', async () => {
          SensitivityTypesService.fetch.mockClear();
          SensitivityTypesService.fetch.mockReturnValue(Promise.resolve([]));
          const childFormInstance = clientEditWrapper.instance();
          childFormInstance.setState({ counties: [{ id: 1, name: 'county' }] });
          childFormInstance.handleCountyChange({ target: { value: 'county' } });
          await clientEditWrapper.update();
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(clientEditWrapper.find('#sensitivity_type_dropdown').length).toEqual(0);
        });
      });

      describe('when list of sensitivity types', () => {
        it('renders sensitivity_type dropdown and options', async () => {
          SensitivityTypesService.fetch.mockClear();
          SensitivityTypesService.fetch.mockReturnValue(Promise.resolve(['TIPE', 'TYPE1']));
          const childFormInstance = clientEditWrapper.instance();
          childFormInstance.setState({ counties: [{ id: 1, name: 'county' }] });
          childFormInstance.handleCountyChange({ target: { value: 'county' } });
          await clientEditWrapper.update();
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          expect(clientEditWrapper.find('#sensitivity_type_dropdown').length).toEqual(1);
          expect(clientEditWrapper.find('.sensitivity_type_option').length).toEqual(2);
        });
      });
    });

    describe('when sensitivityType changed', () => {
      const clientEditWrapper = getWrapperAdd()
        .find('ClientAddEditForm')
        .first()
        .dive();
      it('should set sensityvity_type to childInfo', () => {
        const childFormInstance = clientEditWrapper.instance();
        childFormInstance.setState({ sensitivityTypes: ['TYPE'] });
        childFormInstance.handleSensitivityTypeChange({ target: { value: 'TYPE' } });
        clientEditWrapper.update();
        expect(childFormInstance.state.childInfo.sensitivity_type).toEqual('TYPE');
      });
    });
  });

  describe('#renderNameInputs', () => {
    const wrapper = getWrapperAdd();
    const clientEditWrapper = wrapper.find('ClientAddEditForm').dive();
    describe.each`
      input             | isRequired
      ${'#first_name'}  | ${true}
      ${'#middle_name'} | ${false}
      ${'#last_name'}   | ${true}
      ${'#suffix'}      | ${false}
    `('$input', ({ input, isRequired }) => {
      test(`renders input with required: ${isRequired}`, () => {
        expect(clientEditWrapper.find(input).prop('required')).toBe(isRequired);
      });
    });
  });
});
