import { datesGenerator, domainBarsDataGenerator } from './comparisonGraphDataTransformations'
const fakeI18n = {
  'ECH._short_title_': 'Challenges',
  'EFX._short_title_': 'Functioning',
  'EST._short_title_': 'Strengths',
}
const rawDates = [
  {
    event_date: '2019-02-21',
    assessment_status: 'COMPLETED',
    assessment_id: 65005,
  },
  {
    event_date: '2019-02-21',
    assessment_status: 'COMPLETED',
    assessment_id: 65006,
  },
  {
    event_date: '2019-02-08',
    assessment_status: 'COMPLETED',
    assessment_id: 65007,
  },
]

const rawDomains = [
  {
    code: 'ECH',
    under_six: true,
    above_six: false,
    is_caregiver_domain: false,
    domain_ratings: [
      {
        value: 13,
        type: 'REGULAR',
        assessment_id: 65005,
      },
      {
        value: 13,
        type: 'REGULAR',
        assessment_id: 65006,
      },
      {
        assessment_id: 65007,
      },
    ],
  },
  {
    code: 'EFX',
    under_six: true,
    above_six: false,
    is_caregiver_domain: false,
    domain_ratings: [
      {
        value: 8,
        type: 'REGULAR',
        assessment_id: 65005,
      },
      {
        value: 8,
        type: 'REGULAR',
        assessment_id: 65006,
      },
      {
        assessment_id: 65007,
      },
    ],
  },
  {
    code: 'EST',
    under_six: true,
    above_six: false,
    is_caregiver_domain: false,
    domain_ratings: [
      {
        value: 10,
        type: 'REGULAR',
        assessment_id: 65005,
      },
      {
        value: 10,
        type: 'REGULAR',
        assessment_id: 65006,
      },
      {
        assessment_id: 65007,
      },
    ],
  },
]
describe('datesGenerator', () => {
  it('will transform the raw data to specific data structure', () => {
    const target = datesGenerator(rawDates)
    const expectedStructure = ['02/21/2019', '02/21/2019(1)', '02/08/2019']
    expect(target).toEqual(expectedStructure)
  })

  it('returns an array with same length as the rawDates', () => {
    const target = datesGenerator(rawDates)
    expect(target.length).toEqual(rawDates.length)
  })

  it('returns an empty array when got invalid data', () => {
    const target = datesGenerator(undefined)
    expect(target).toEqual([])
  })

  it('returns an array of strings', () => {
    const target = datesGenerator(rawDates)
    target.forEach(el => {
      expect(typeof el).toEqual('string')
    })
  })
})

describe('domainBarsDataGenerator', () => {
  it('will transform the raw data to specific data structure', () => {
    const target = domainBarsDataGenerator(rawDates, rawDomains, fakeI18n)
    const expectedStructure = [
      { '02/08/2019': 0, '02/21/2019': 13, '02/21/2019(1)': 13, name: 'Challenges' },
      { '02/08/2019': 0, '02/21/2019': 8, '02/21/2019(1)': 8, name: 'Functioning' },
      { '02/08/2019': 0, '02/21/2019': 10, '02/21/2019(1)': 10, name: 'Strengths' },
    ]
    expect(target).toEqual(expectedStructure)
  })

  it('will set the name to null if i18n is invalid', () => {
    const invalidI18n = undefined
    const target = domainBarsDataGenerator(rawDates, rawDomains, invalidI18n)
    target.forEach(el => {
      expect(el.name).toEqual(null)
    })
  })

  it('returns an empty array when got invalid data', () => {
    const target = domainBarsDataGenerator(undefined)
    expect(target).toEqual([])
  })

  it('returns an array with same length as the rawDates', () => {
    const target = domainBarsDataGenerator(rawDates, rawDomains, fakeI18n)
    expect(target.length).toEqual(rawDates.length)
  })

  it('returns an array of objects', () => {
    const target = domainBarsDataGenerator(rawDates, rawDomains, fakeI18n)
    target.forEach(el => {
      expect(typeof el).toEqual('object')
    })
  })

  it('returns second date with surffix (1), if there are two same dates in rawDates', () => {
    const target = domainBarsDataGenerator(rawDates, rawDomains, fakeI18n)
    const surffix = '(1)'
    expect(rawDates[0].event_date).toBe(rawDates[1].event_date)
    target.forEach(el => {
      expect(Object.keys(el)[2]).toBe(`${Object.keys(el)[1]}${surffix}`)
    })
  })
})
