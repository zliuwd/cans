import { buildCompleteAssessmentPermission, buildCreateAssessmentPermission } from './AuthHelper'

describe('AuthHelper', () => {
  describe('buildCreateAssessmentPermission', () => {
    it('returns correct value', () => {
      const clientIdentifier = 'aaa'
      expect(buildCreateAssessmentPermission(clientIdentifier)).toEqual('client:createAssessment:aaa')
    })
  })

  describe('buildCompleteAssessmentPermission', () => {
    it('returns client:completeAssessment when assessment.id = null', () => {
      const assessment = {
        id: null,
        person: { identifier: 'aaa' },
      }
      expect(buildCompleteAssessmentPermission(assessment)).toEqual('client:completeAssessment:aaa')
    })

    it('returns client:completeAssessment when assessment.id = undefined', () => {
      const assessment = {
        person: { identifier: 'aaa' },
      }
      expect(buildCompleteAssessmentPermission(assessment)).toEqual('client:completeAssessment:aaa')
    })

    it('returns assessment:complete when assessment.id defined', () => {
      const assessment = {
        id: 1,
        person: { identifier: 'aaa' },
      }
      expect(buildCompleteAssessmentPermission(assessment)).toEqual('assessment:complete:1')
    })

    it('returns undefined when assessment is undefined', () => {
      expect(buildCompleteAssessmentPermission(undefined)).toEqual(undefined)
    })

    it('returns undefined when object is not an assessment object', () => {
      expect(buildCompleteAssessmentPermission({})).toEqual(undefined)
    })
  })
})
