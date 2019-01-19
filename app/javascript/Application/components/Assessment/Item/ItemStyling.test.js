import { ieStyleFixer, ieFixedStyle, noneIeFixedStyle } from './ItemStyling'

describe('#ieStyleFixer', () => {
  it('ieStyleFixer return correct value with the browser which is not IE', () => {
    const actualResult = ieStyleFixer(false)

    const expectedResult = noneIeFixedStyle
    expect(actualResult).toEqual(expectedResult)
  })

  it('ieStyleFixer return correct value with the IE', () => {
    const actualResult = ieStyleFixer(true)
    const expectedResult = ieFixedStyle
    expect(actualResult).toEqual(expectedResult)
  })
})
