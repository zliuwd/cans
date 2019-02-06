import { isNeedsDomain, isStrengthsDomain, isTraumaDomain, isBehavioralNeedsDomain, itemsValue } from './DomainHelper'

const N = 500
const i18nNumbers = new Array(N).fill().reduce((mapping, _item, i) => {
  mapping[`${i}._title_`] = `(${i})`
  return mapping
}, {})
export const i18n = {
  'SURPRISE._title_': 'Surprise',
  'FEAR._title_': 'Fear',
  'RUTHLESS_EFFICIENCY._title_': 'Ruthless Efficiency',
  'NICE_RED_UNIFORMS._title_': 'Nice Red Uniforms',
  'FANATICAL_DEVOTION._title_': 'Fanatical Devotion',
  'COMFY_CHAIRS._title_': 'Comfy Chairs',
  ...i18nNumbers,
}

describe('DomainHelper', () => {
  describe('isStrengthsDomain', () => {
    it('is true for STR domain', () => {
      expect(isStrengthsDomain({ code: 'STR' })).toBe(true)
    })

    it('is true for EST domain', () => {
      expect(isStrengthsDomain({ code: 'EST' })).toBe(true)
    })

    it('is false for other domains', () => {
      expect(isStrengthsDomain({ code: 'BEN' })).toBe(false)
      expect(isStrengthsDomain({ code: 'TRM' })).toBe(false)
      expect(isStrengthsDomain({ code: '' })).toBe(false)
    })
  })

  describe('isTraumaDomain', () => {
    it('is true for TRM domain', () => {
      expect(isTraumaDomain({ code: 'TRM' })).toBe(true)
    })

    it('is false for strength domains', () => {
      expect(isTraumaDomain({ code: 'STR' })).toBe(false)
      expect(isTraumaDomain({ code: 'EST' })).toBe(false)
    })

    it('is false for other domains', () => {
      expect(isTraumaDomain({ code: 'BEN' })).toBe(false)
      expect(isTraumaDomain({ code: '' })).toBe(false)
    })
  })

  describe('isNeedsDomain', () => {
    it('is false for strength domains', () => {
      expect(isNeedsDomain({ code: 'STR' })).toBe(false)
      expect(isNeedsDomain({ code: 'EST' })).toBe(false)
    })

    it('is false for trauma domains', () => {
      expect(isNeedsDomain({ code: 'TRM' })).toBe(false)
    })

    it('is true for other domains', () => {
      expect(isNeedsDomain({ code: 'BEN' })).toBe(true)
      expect(isNeedsDomain({ code: 'OTHER' })).toBe(true)
      expect(isNeedsDomain({ code: '' })).toBe(true)
    })
  })

  describe('isBehavioralNeedsDomain', () => {
    it('is true for the Behavior/Emotional Needs Domain', () => {
      expect(isBehavioralNeedsDomain({ code: 'BEN' })).toBe(true)
    })

    it('is false for other domains', () => {
      expect(isBehavioralNeedsDomain({ code: 'OTHER' })).toBe(false)
      expect(isBehavioralNeedsDomain({ code: 'STR' })).toBe(false)
    })
  })

  describe('itemsValue', () => {
    it('filters domains and returns values', () => {
      const domains = [
        {
          code: 'BEN',
          items: [
            { code: 'SURPRISE', rating: 1 },
            { code: 'FEAR', rating: 2 },
            { code: 'RUTHLESS_EFFICIENCY', rating: 2 },
            { code: 'NICE_RED_UNIFORMS', rating: -1 },
            { code: 'FANATICAL_DEVOTION', rating: 3 },
          ],
        },
      ]
      const expectedResult = [
        { code: 'SURPRISE', rating: 1 },
        { code: 'FEAR', rating: 2 },
        { code: 'RUTHLESS_EFFICIENCY', rating: 2 },
        { code: 'NICE_RED_UNIFORMS', rating: -1 },
        { code: 'FANATICAL_DEVOTION', rating: 3 },
      ]
      const domainFilter = isNeedsDomain
      const itemFilter = el => true
      expect(itemsValue(domains, domainFilter, itemFilter)).toEqual(expectedResult)
    })
  })
})
