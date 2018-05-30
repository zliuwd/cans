import PersonService from './person.service';
import appApi from '../../App.api';

jest.mock('../../App.api');

describe('PersonService', () => {
  describe('#fetchAllClients', () => {
    const apiPostSpy = jest.spyOn(appApi, 'post');

    it('returns clients', async () => {
      const expectedClients = [{ id: 1 }];
      apiPostSpy.mockReturnValue(Promise.resolve({ data: expectedClients }));
      const actualClients = await PersonService.fetchAllClients();
      expect(actualClients).toBe(expectedClients);
      expect(apiPostSpy).toHaveBeenCalledTimes(1);
      expect(apiPostSpy).toHaveBeenCalledWith('/people/_search', {
        person_role: 'CLIENT',
      });
    });
  });
});
