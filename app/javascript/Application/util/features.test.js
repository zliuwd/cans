import { isFeatureActive, isCans2, isDesignSystemLayoutEnabled } from './features'

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

  describe('isDesignSystemLayoutEnabled', () => {
    it('is true when turned on and cans2.0 is enabled', () => {
      window.org = Object.freeze({ cans: { active_features: ['enable_design_system_layout', 'cans2'] } })
      expect(isDesignSystemLayoutEnabled()).toBe(true)
    })

    it('is false if turned off', () => {
      window.org = Object.freeze({ cans: { active_features: ['cans2'] } })
      expect(isDesignSystemLayoutEnabled()).toBe(false)
    })

    it('is false if cans2.0 is disabled', () => {
      window.org = Object.freeze({ cans: { active_features: ['enable_design_system_layout'] } })
      expect(isDesignSystemLayoutEnabled()).toBe(false)
    })
  })
})
