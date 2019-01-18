import { RESIDENCE_CODES } from './AddressType'

export const addressTypes = RESIDENCE_CODES

export const unableToDetermineCodes = [
  { code: 'A', value: 'Abandoned' },
  { code: 'I', value: 'Unknown' },
  { code: 'K', value: 'Unknown' },
]

export const systemCodes = {
  addressTypes,
  unableToDetermineCodes,
}
