import { SecurityService } from './Security.service';
import apiEndpoints from '../../App.api';

jest.mock('../../App.api');

describe('SecurityService', () => {
  describe('checkPermission', () => {
    const apiGetSpy = jest.spyOn(apiEndpoints, 'apiGet');

    it('returns assessment', async () => {
      const permission = 'assessment:write:1';
      const expectedResult = 'true';
      apiGetSpy.mockReturnValue('true');
      const actualResult = await SecurityService.checkPermission(permission);
      expect(actualResult).toBe(expectedResult);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/security/check_permission/${permission}`);
    });
  });
});
