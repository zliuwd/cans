import { isCommaSuffix, formatNameSuffix, formatHighlightedSuffix, phoneNumberFormatter } from './searchFormatters'

describe('isCommaSuffix', () => {
  it('should be true for name suffixes', () => {
    expect(isCommaSuffix('jr')).toEqual(true)
    expect(isCommaSuffix('jd')).toEqual(true)
    expect(isCommaSuffix('md')).toEqual(true)
    expect(isCommaSuffix('phd')).toEqual(true)
  })

  it('should be false for number suffixes', () => {
    expect(isCommaSuffix('ii')).toEqual(false)
    expect(isCommaSuffix('iii')).toEqual(false)
    expect(isCommaSuffix('ix')).toEqual(false)
    expect(isCommaSuffix('2')).toEqual(false)
    expect(isCommaSuffix('3')).toEqual(false)
    expect(isCommaSuffix('9')).toEqual(false)
  })

  it('should downcase the suffix', () => {
    expect(isCommaSuffix('Jr')).toEqual(true)
    expect(isCommaSuffix('PhD')).toEqual(true)
    expect(isCommaSuffix('III')).toEqual(false)
    expect(isCommaSuffix('iIi')).toEqual(false)
  })

  it('should be false for unknown values', () => {
    expect(isCommaSuffix('OFM')).toEqual(false)
    expect(isCommaSuffix('Primate of Italy')).toEqual(false)
    expect(isCommaSuffix(null)).toEqual(false)
    expect(isCommaSuffix(3)).toEqual(false)
  })
})

describe('formatNameSuffix', () => {
  it('should format number suffixes', () => {
    expect(formatNameSuffix('2')).toEqual('II')
    expect(formatNameSuffix('3')).toEqual('III')
    expect(formatNameSuffix('37')).toEqual('XXXVII')
  })

  it('should format roman numeral suffixes', () => {
    expect(formatNameSuffix('II')).toEqual('II')
    expect(formatNameSuffix('III')).toEqual('III')
    expect(formatNameSuffix('XXXVII')).toEqual('XXXVII')
  })

  it('should handle mixed case numerals', () => {
    expect(formatNameSuffix('iii')).toEqual('III')
    expect(formatNameSuffix('III')).toEqual('III')
    expect(formatNameSuffix('iIi')).toEqual('III')
  })

  it('should be falsy for invalid suffixes', () => {
    expect(Boolean(formatNameSuffix('OFM'))).toEqual(false)
    expect(Boolean(formatNameSuffix('Primate of Italy'))).toEqual(false)
    expect(Boolean(formatNameSuffix(null))).toEqual(false)
    expect(Boolean(formatNameSuffix(3))).toEqual(false)
  })
})

describe('formatHighlightedSuffix', () => {
  it('should format number suffixes', () => {
    expect(formatHighlightedSuffix('2')).toEqual('II')
    expect(formatHighlightedSuffix('<em>3</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>3</em>7')).toEqual('<em>XXXVII</em>')
  })

  it('should format roman numeral suffixes', () => {
    expect(formatHighlightedSuffix('<em>II</em>')).toEqual('<em>II</em>')
    expect(formatHighlightedSuffix('III')).toEqual('III')
    expect(formatHighlightedSuffix('<em>XX</em>XVII')).toEqual('<em>XXXVII</em>')
  })

  it('should handle mixed case numerals', () => {
    expect(formatHighlightedSuffix('<em>iii</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>III</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>iIi</em>')).toEqual('<em>III</em>')
  })

  it('should handle mixed case emphasis', () => {
    expect(formatHighlightedSuffix('<em>iii</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<EM>iii</EM>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<Em>iii</eM>')).toEqual('<em>III</em>')
  })

  it('should be falsy for invalid suffixes', () => {
    expect(Boolean(formatHighlightedSuffix('OF'))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix('Primate of Italy'))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix(null))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix(3))).toEqual(false)
  })
})

describe('phoneNumberFormatter ', () => {
  it('processes an empty string', () => {
    expect(phoneNumberFormatter('')).toEqual(null)
  })

  it('should return formatted number when given a 10 digit number', () => {
    expect(phoneNumberFormatter('1234567890')).toEqual('(123) 456-7890')
  })

  it('should return null when given a 5 digit number', () => {
    expect(phoneNumberFormatter('12345')).toEqual(null)
  })

  it('should return null when given a 11 digit number', () => {
    expect(phoneNumberFormatter('12345678901')).toEqual(null)
  })

  it('should return null when used alphabets', () => {
    expect(phoneNumberFormatter('abcd')).toEqual(null)
  })
})
