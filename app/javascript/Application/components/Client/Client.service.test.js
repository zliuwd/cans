import ClientService from './Client.service';
import apiEndpoints from '../../App.api';

jest.mock('../../App.api');

describe('ClientService', () => {
  describe('#fetch', () => {
    const apiGetSpy = jest.spyOn(apiEndpoints, 'apiGet');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns client data', async () => {
      const clientId = 1;
      const mockClientData = { id: clientId, name: 'test user' };
      apiGetSpy.mockReturnValue(mockClientData);
      const clientData = await ClientService.fetch(clientId);
      expect(clientData).toBe(mockClientData);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/people/${clientId}`);
    });
  });

  describe('#fetchAllClients', () => {
    const apiPostSpy = jest.spyOn(apiEndpoints, 'apiPost');

    it('returns clients', async () => {
      const expectedClients = [{ id: 1 }];
      apiPostSpy.mockReturnValue(expectedClients);
      const actualClients = await ClientService.fetchAllClients();
      expect(actualClients).toBe(expectedClients);
      expect(apiPostSpy).toHaveBeenCalledTimes(1);
      expect(apiPostSpy).toHaveBeenCalledWith('/people/_search', {
        person_role: 'CLIENT',
      });
    });
  });

  describe('#addClient', () => {
    const apiGetSpy = jest.spyOn(apiEndpoints, 'apiPost');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('posts ChildInfo Object', async () => {
      const childInfo = {};
      const expectedChildForm = `/people`;
      apiGetSpy.mockReturnValue(`/people`);
      const actualChildForm = await ClientService.addClient(childInfo);
      expect(actualChildForm).toBe(expectedChildForm);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/people`, {});
    });
  });

  describe('#updateClient', () => {
    const apiGetSpy = jest.spyOn(apiEndpoints, 'apiPut');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('Updates ChildInfo Object', async () => {
      const childInfo = {};
      const childId = 1;
      const expectedChildForm = `/people`;
      apiGetSpy.mockReturnValue(`/people`);
      const actualChildForm = await ClientService.updateClient(childId, childInfo);
      expect(actualChildForm).toBe(expectedChildForm);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/people/1`, {});
    });
  });
});
