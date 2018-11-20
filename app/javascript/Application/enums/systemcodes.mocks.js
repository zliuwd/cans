import { RESIDENCE_TYPES } from './AddressType'

export const languages = [
  { code: '1', value: 'English' },
  { code: '2', value: 'French' },
  { code: '3', value: 'Italian' },
]

export const ethnicityTypes = [
  { code: '1', value: 'European' },
  { code: '2', value: 'French' },
  { code: '3', value: 'Romanian' },
]

export const raceTypes = [
  { code: '1', value: 'Race 1' },
  { code: '2', value: 'Race 2' },
  { code: '3', value: 'Race 3' },
]

export const hispanicOriginCodes = [{ code: 'Y', value: 'yes' }, { code: 'N', value: 'no' }]

export const addressTypes = [
  { code: RESIDENCE_TYPES[0], value: 'address type' },
  { code: RESIDENCE_TYPES[1], value: 'address type 2' },
  { code: '5', value: 'non-residence address type' },
]

export const counties = [{ code: '999', value: 'SysCode Nowhere' }, { code: '998', value: 'SysCode Places' }]
