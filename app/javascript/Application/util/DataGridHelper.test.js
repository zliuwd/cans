import * as DataGridHelper from './DataGridHelper'

describe('DataGridHelper', () => {
  describe('pageSizes', () => {
    it('is 10, 25, 50', () => {
      expect(DataGridHelper.PAGE_SIZES).toEqual([10, 25, 50])
    })
  })
})

describe('gridMinRows', () => {
  const gridMinRows = DataGridHelper.gridMinRows
  const threeLines = 3
  const oneLineData = new Array(1)
  const twoLinesData = new Array(2)
  const threeLinesData = new Array(3)
  const tenLinesData = new Array(10)
  it('will set to three line when data is undefined', () => {
    const minRows = gridMinRows(undefined)
    expect(minRows).toEqual(threeLines)
  })

  it('will set to the data length when data length less than 3', () => {
    const minRows1 = gridMinRows(oneLineData)
    const minRows2 = gridMinRows(twoLinesData)
    expect(minRows1).toEqual(1)
    expect(minRows2).toEqual(2)
  })

  it('will set to the 3 when data length more than or equal to 3', () => {
    const minRows10 = gridMinRows(tenLinesData)
    const minRows3 = gridMinRows(threeLinesData)
    expect(minRows10).toEqual(threeLines)
    expect(minRows3).toEqual(threeLines)
  })
})
