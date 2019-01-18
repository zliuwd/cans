const ADDRESS_TYPE = Object.freeze([
  'Common',
  'Day Care',
  'Home',
  'Homeless',
  'Other',
  'Penal Institution',
  'Permanent Mailing Address',
  'Residence 2',
  'Work',
])

export const RESIDENCE_CODES = [
  { code: '32', value: 'Home' },
  { code: '29', value: 'Homeless' },
  { code: '112', value: 'Placement Home' },
  { code: '6273', value: 'Common' },
]

export const RESIDENCE_TYPES = RESIDENCE_CODES.map(syscode => syscode.code)

export default ADDRESS_TYPE
