import { RESIDENCE_TYPES } from './AddressType'

export const addressTypes = [
  { code: RESIDENCE_TYPES[0], value: 'Home' },
  { code: RESIDENCE_TYPES[1], value: 'Homeless' },
  { code: RESIDENCE_TYPES[2], value: 'Placement Home' },
  { code: RESIDENCE_TYPES[3], value: 'Common' },
]

export const unableToDetermineCodes = [
  { code: 'A', value: 'Abandoned' },
  { code: 'I', value: 'Unknown' },
  { code: 'K', value: 'Unknown' },
]

export const systemCodes = {
  addressTypes,
  unableToDetermineCodes,
}
