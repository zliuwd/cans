import { isAuthorized, isCompleteAssessmentAuthorized } from './AuthHelper'

describe('AuthHelper', () => {
  describe('isAuthorized', () => {
    const entity = {
      metadata: { allowed_operations: ['operation1', 'operation2', 'operation3'] },
    }

    it('returns true when allowed_operations contains operation ', () => {
      expect(isAuthorized(entity, 'operation1')).toBe(true)
    })

    it('returns false when allowed_operations does not contains operation', () => {
      expect(isAuthorized(entity, 'operation4')).toBe(false)
    })

    it('returns false when no metadata ', () => {
      expect(isAuthorized({}, 'operation4')).toBe(false)
    })
  })

  describe('isCompleteAssessmentAuthorized', () => {
    const assessment = {
      id: 1,
      metadata: { allowed_operations: ['complete'] },
    }

    const client = {
      identifier: 'aaaaaaaaaa',
      metadata: { allowed_operations: ['completeAssessment'] },
    }

    it('should return true when assessment has complete in allowed_operation', () => {
      expect(isCompleteAssessmentAuthorized(assessment, client)).toBe(true)
    })

    it('should return true when client has completeAssessment in allowed_operation', () => {
      const assessmentWithNoId = { ...assessment, id: null }
      expect(isCompleteAssessmentAuthorized(null, client)).toBe(true)
      expect(isCompleteAssessmentAuthorized(undefined, client)).toBe(true)
      expect(isCompleteAssessmentAuthorized(assessmentWithNoId, client)).toBe(true)
    })

    it('should return false when assessment does not have complete in allowed_operation', () => {
      const assessmentWithNoOperation = { ...assessment, metadata: null }
      expect(isCompleteAssessmentAuthorized(assessmentWithNoOperation, client)).toBe(false)
    })
  })
})
