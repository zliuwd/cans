import { SensitivityTypesService } from './SensitivityTypes.service';
import apiEndpoints from '../../App.api';

jest.mock('../../App.api');

describe('SensitivityTypesService', () => {
  describe('#fetch', () => {
    const apiGetSpy = jest.spyOn(apiEndpoints, 'apiGet');
    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns array of sensitivity types', async () => {
      const expected = [];
      apiGetSpy.mockReturnValue(expected);
      const actual = await SensitivityTypesService.fetch(42);
      expect(actual).toBe(expected);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/sensitivity_types?county=42`);
    });
  });
});
