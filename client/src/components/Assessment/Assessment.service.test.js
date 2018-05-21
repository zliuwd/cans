import { AssessmentService } from './assessment.service';
import { api } from '../../index';

jest.mock('../api');

describe('I18nService', () => {
  describe('#fetch', () => {
    const apiGetSpy = jest.spyOn(api, 'get');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns assessment', async () => {
      const assessmentId = 50000;
      const expectedAssessment = { id: assessmentId };
      apiGetSpy.mockReturnValue(Promise.resolve({ data: expectedAssessment }));
      const actualAssessment = await AssessmentService.fetch(assessmentId);
      expect(actualAssessment).toBe(expectedAssessment);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith(`/assessments/${assessmentId}`);
    });
  });
});
