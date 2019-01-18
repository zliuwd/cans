import * as DataGridHelper from './DataGridHelper'

describe('DataGridHelper', () => {
  describe('pageSizes', () => {
    it('is 10, 25, 50', () => {
      expect(DataGridHelper.PAGE_SIZES).toEqual([10, 25, 50])
    })
  })
})
