import { getTitle, blankColFiller, domainRatingSwitcher, itemRatingSwitcher } from './comparisonTableHelper'
import * as I18n from '../../../common/I18nHelper'

const dashes = '--'

describe('getTitle', () => {
  it('getI18nByCode will be invoked when i18n is valid', () => {
    const getI18nByCodeSpy = jest.spyOn(I18n, 'getI18nByCode')
    const fakI18n = { key: 'value' }
    const code = 'someCode'
    getTitle(fakI18n, code)
    expect(getI18nByCodeSpy).toHaveBeenCalledTimes(1)
    getI18nByCodeSpy.mockReset()
  })

  it('getI18nByCode will not be invoked when i18n is not valid', () => {
    const getI18nByCodeSpy = jest.spyOn(I18n, 'getI18nByCode')
    const fakI18n = undefined
    const code = 'someCode'
    getTitle(fakI18n, code)
    expect(getI18nByCodeSpy).toHaveBeenCalledTimes(0)
    getI18nByCodeSpy.mockReset()
  })
})

describe('blankColFiller', () => {
  it('will push a blankCol to the end of the targetCols when requiredAmount is larger than targetCols length', () => {
    const targetCols = Array(4)
    const keyWords = 'domain'
    const requiredAmount = 5
    blankColFiller(targetCols, keyWords, requiredAmount)
    expect(targetCols.length).toBe(5)
    expect(targetCols[4]).toEqual({ header: null, id: 'domain-blank-column', sortable: false })
  })

  it('will not change the targetCols when requiredAmount is equal to targetCols length', () => {
    const targetCols = Array(4)
    const keyWords = 'domain'
    const requiredAmount = 4
    blankColFiller(targetCols, keyWords, requiredAmount)
    expect(targetCols.length).toBe(4)
  })
})

describe('domainRatingSwitcher', () => {
  it('will return -- if ratingTotal is not valid', () => {
    const fakeParams = [undefined, 'REGULAR']
    const expectedResult = dashes
    expect(domainRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })

  it('will return ratingTotal normally', () => {
    const fakeParams = [12, 'REGULAR']
    const expectedResult = 12
    expect(domainRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })
})

describe('itemRatingSwitcher', () => {
  const fakeItemRatings = [{ value: 3 }]
  it('will return according item rating value when have valid itemRatings', () => {
    const fakeParams = [fakeItemRatings, 0, 'REGULAR']
    const expectedResult = 3
    expect(itemRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })

  it('will return -- when have no valid itemRatings', () => {
    const fakeParams = [[], 0, 'REGULAR']
    const expectedResult = dashes
    expect(itemRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })
})
