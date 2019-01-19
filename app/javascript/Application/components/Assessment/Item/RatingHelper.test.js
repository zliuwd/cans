import { UNSET_RATING, NA_RATING, isNARating } from './RatingHelper'

describe('RatingHelper', () => {
  describe('UNSET_RATING', () => {
    it('is -1', () => {
      expect(UNSET_RATING).toBe(-1)
    })
  })

  describe('NA_RATING', () => {
    it('is 8', () => {
      expect(NA_RATING).toBe(8)
    })
  })

  describe('isNotApplicableRating', () => {
    it('is true if the rating is the magic constant', () => {
      expect(isNARating(8)).toBe(true)
    })

    it('is false for other ratings', () => {
      expect(isNARating('8')).toBe(false)
      expect(isNARating(-1)).toBe(false)
      expect(isNARating(0)).toBe(false)
      expect(isNARating(1)).toBe(false)
      expect(isNARating(2)).toBe(false)
      expect(isNARating(3)).toBe(false)
    })
  })
})
