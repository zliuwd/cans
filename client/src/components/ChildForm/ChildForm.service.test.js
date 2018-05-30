import { ChildFormService } from './ChildForm.service';
import appApi from '../../App.api';

jest.mock('../../App.api');

describe('ChildFormService', () => {
  describe('#createChild', () => {
    const apiGetSpy = jest.spyOn(appApi, 'post');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('posts ChildInfo Object', async () => {
      const childInfo = {}
      const expectedChildForm = `/people` ;
      apiGetSpy.mockReturnValue(Promise.resolve({ data: `/people`}));
      const actualChildForm = await ChildFormService.createChild(childInfo);
      expect(actualChildForm).toBe(expectedChildForm);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/people`, {});
    });
  });
});
