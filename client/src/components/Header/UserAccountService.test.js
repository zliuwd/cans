import UserAccountService from './UserAccountService';

describe('UserAccountService', () => {
  describe('#fetchCurrent', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(UserAccountService.httpClient, 'get');
    });

    it('calls backend service', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      UserAccountService.fetchCurrent();
      expect(getSpy).toHaveBeenCalledWith('/user/account');
    });

    describe('when could not fetch data', () => {
      it('returns empty object', () => {
        getSpy.mockReturnValue(Promise.reject(new Error('e')));
        UserAccountService.fetchCurrent().catch(
          actualResult => {
            expect(actualResult).toEqual({});
          }
        )
      });
    });
  });
});
