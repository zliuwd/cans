import { I18nService } from './i18n.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('I18nService', () => {
  describe('#fetch', () => {
    const apiGetSpy = jest.spyOn(ApiService, 'get');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns i18n by instrument id', async () => {
      const instrumentId = 1;
      const expectedI18n = { "_title_": "abc" };
      apiGetSpy.mockReturnValue(Promise.resolve({ data: expectedI18n }));
      const actualI18n = await I18nService.fetchByInstrumentId(instrumentId);
      expect(actualI18n).toBe(expectedI18n);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/instruments/${instrumentId}/i18n`);
    });
  });
});
