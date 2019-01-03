import { isAction, isShowMoreResults, showMoreResults } from './SearchActions'

describe('Search Actions', () => {
  describe('isAction', () => {
    it('is true for action objects', () => {
      expect(isAction(showMoreResults())).toBe(true)
    })

    it('is false for other objects', () => {
      expect(isAction({})).toBe(false)
    })
  })

  describe('isShowMoreResults', () => {
    it('is true for Show More Results actions', () => {
      expect(isShowMoreResults(showMoreResults([0, 'A']))).toBe(true)
    })

    it('is false for other objects', () => {
      expect(isShowMoreResults({})).toBe(false)
    })

    it('is false for other actions', () => {
      expect(isShowMoreResults({ type: 'action', action: 'Show Fewer Results' })).toBe(false)
    })
  })
})
