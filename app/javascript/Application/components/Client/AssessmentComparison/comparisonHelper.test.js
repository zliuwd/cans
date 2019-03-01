import {
  getTitle,
  blankColFiller,
  domainTitleSwitcher,
  domainRatingSwitcher,
  itemRatingSwitcher,
} from './comparisonHelper'
import * as I18n from '../../common/I18nHelper'

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

describe('domainTitleSwitcher', () => {
  const domainTitle = 'someTitle'
  const domains = [
    { code: 'TRM' },
    { code: 'STR' },
    { code: 'EST' },
    { is_caregiver_domain: true, caregiver_name: 'firstCaregiver', caregiver_index: 'a' },
    { is_caregiver_domain: true, caregiver_index: 'b' },
    { code: 'DEFAULT' },
  ]
  it('will get correct results based on different domains code', () => {
    const actualResults = []
    const expectResults = [
      'PTACE',
      'someTitle ( 6 to 21 )',
      'someTitle ( 0 to 5 )',
      'Caregiver Domain-a-firstCaregiver',
      'Caregiver Domain-b',
      'someTitle',
    ]
    domains.forEach(domain => {
      actualResults.push(domainTitleSwitcher(domain, domainTitle))
    })
    expect(actualResults).toEqual(expectResults)
  })
})

describe('domainRatingSwitcher', () => {
  it('will return -- if ratingTotal is not valid', () => {
    const fakeParams = [undefined, 'REGULAR']
    const expectedResult = dashes
    expect(domainRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })

  it('will return # ratingTotal-Y# if rating type is BOOLEAN with some YES rating', () => {
    const fakeParams = [10, 'BOOLEAN']
    const expectedResult = '10-Y'
    expect(domainRatingSwitcher(...fakeParams)).toBe(expectedResult)
  })

  it('will return # 0-Y# if rating type is BOOLEAN with no YES rating', () => {
    const fakeParams = [0, 'BOOLEAN']
    const expectedResult = '0-Y'
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
  const fakeBoolRatings = [{ value: 1 }, { value: 0 }]
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

  it('will return Yes or No when has valid item rating and type is BOOLEAN', () => {
    const fakeParamsYes = [fakeBoolRatings, 0, 'BOOLEAN']
    const fakeParamsNo = [fakeBoolRatings, 1, 'BOOLEAN']
    expect(itemRatingSwitcher(...fakeParamsYes)).toBe('Yes')
    expect(itemRatingSwitcher(...fakeParamsNo)).toBe('No')
  })

  it('will return -- when has no valid item rating and type is BOOLEAN', () => {
    const fakeParamsYes = [fakeBoolRatings, 8, 'BOOLEAN']
    const fakeParamsNo = [fakeBoolRatings, -1, 'BOOLEAN']
    expect(itemRatingSwitcher(...fakeParamsYes)).toBe(dashes)
    expect(itemRatingSwitcher(...fakeParamsNo)).toBe(dashes)
  })
})
