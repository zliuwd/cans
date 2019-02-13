import { isFeatureActive, isCans2 } from './features'

describe('Features', () => {
  let originalWindowOrg
  beforeEach(() => {
    originalWindowOrg = window.org
  })

  afterEach(() => {
    window.org = originalWindowOrg
  })

  describe('isFeatureActive', () => {
    beforeEach(() => {
      window.org = Object.freeze({ cans: { active_features: ['Feature One', 'Feature Two'] } })
    })

    it('is true if the feature is in window config', () => {
      expect(isFeatureActive('Feature One')).toBe(true)
      expect(isFeatureActive('Feature Two')).toBe(true)
    })

    it('is false if the feature is not in window config', () => {
      expect(isFeatureActive('Feature Three')).toBe(false)
    })
  })

  describe('isCans2', () => {
    it('is true if the feature is in window config', () => {
      window.org = Object.freeze({ cans: { active_features: ['Feature One', 'cans2'] } })
      expect(isCans2()).toBe(true)
    })

    it('is false if the feature is not in window config', () => {
      window.org = Object.freeze({ cans: { active_features: ['Feature One', 'Feature Two'] } })
      expect(isCans2()).toBe(false)
    })
  })
})
