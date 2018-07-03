import { CountiesService } from './Counties.service';
import appApi from '../../App.api';

jest.mock('../../App.api');

describe('CountiesService', () => {
  describe('#fetchCounties', () => {
    const apiGetSpy = jest.spyOn(appApi, 'get');
    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns array of Counties', async () => {
      const expectedCounties = [];
      apiGetSpy.mockReturnValue(Promise.resolve({ data: expectedCounties }));
      const actualCounties = await CountiesService.fetchCounties();
      expect(actualCounties).toBe(expectedCounties);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/counties`);
    });
  });
});
