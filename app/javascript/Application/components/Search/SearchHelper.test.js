import { fromJS } from 'immutable'
import { mapLanguages, mapRaces, mapIsSensitive, mapIsSealed, mapPhoneNumber, mapAddress } from './SearchHelper'
import {
  resultWithPhoneNumbers,
  resultWithTwoAddresses,
  addressPlacementHome,
  addressCommon,
} from './clientresults.mocks'
import { RESIDENCE_TYPES } from '../../enums/AddressType'
import { unableToDetermineCodes } from '../../enums/SystemCodes'
import { languages, ethnicityTypes, raceTypes, hispanicOriginCodes, addressTypes } from '../../enums/systemcodes.mocks'

describe('SearchHelper', () => {
  const systemCodes = {
    addressTypes,
    ethnicityTypes,
    hispanicOriginCodes,
    languages,
    raceTypes,
    unableToDetermineCodes,
  }
  describe('mapLanguages', () => {
    it('maps languages object to values, sorting by primary', () => {
      const result = fromJS({
        languages: [
          { id: '3', name: 'Italian', primary: true }, // Italian
          { id: '2', name: 'French', primary: false }, // French
          { id: '1', name: 'English', primary: true }, // English
        ],
      })
      const languageResult = mapLanguages(result)

      expect(languageResult.toJS()).toEqual(['Italian', 'English', 'French'])
    })
  })

  describe('mapIsSensitive', () => {
    it('returns true if the result is sensitive', () => {
      const result = fromJS({
        sensitivity_indicator: 'S',
      })
      const sensitiveResult = mapIsSensitive(result)

      expect(sensitiveResult).toEqual(true)
    })

    it('returns false if the result is not sensitive', () => {
      const result = fromJS({
        sensitivity_indicator: 'R',
      })
      const sensitiveResult = mapIsSensitive(result)

      expect(sensitiveResult).toEqual(false)
    })
  })

  describe('mapIsSealed', () => {
    it('returns true if the result is sealed', () => {
      const result = fromJS({
        sensitivity_indicator: 'R',
      })
      const sensitiveResult = mapIsSealed(result)

      expect(sensitiveResult).toEqual(true)
    })

    it('returns false if the result is not sealed', () => {
      const result = fromJS({
        sensitivity_indicator: 'S',
      })
      const sensitiveResult = mapIsSealed(result)

      expect(sensitiveResult).toEqual(false)
    })
  })

  describe('mapPhoneNumber', () => {
    it('returns phone numbers', () => {
      const result = fromJS(resultWithPhoneNumbers)

      expect(mapPhoneNumber(result).toJS()).toEqual([
        { number: '9200002665', type: 'Home' },
        { number: '9230003403', type: 'Work' },
        { number: '8720007345', type: 'Cell' },
      ])
    })
  })

  describe('mapAddress', () => {
    it('returns the city, state, zip, type, and a joined street address', () => {
      const result = fromJS({
        addresses: [
          {
            city: 'city',
            state_code: 'state',
            zip: 'zip',
            type: { id: RESIDENCE_TYPES[0] },
            street_number: '123',
            street_name: 'C Street',
          },
        ],
      })
      const systemCodesImmutable = fromJS({ systemCodes })
      const addressResult = mapAddress(result, systemCodesImmutable)

      expect(addressResult.toJS()).toEqual({
        city: 'city',
        state: 'state',
        zip: 'zip',
        type: 'address type',
        streetAddress: '123 C Street',
      })
    })

    it('returns null list when typeId is not one of the whitelisted Residences', () => {
      const result = fromJS({
        addresses: [
          {
            city: 'city',
            state_code: 'state',
            zip: 'zip',
            type: { id: '5' },
            street_number: '123',
            street_name: 'C Street',
          },
        ],
      })
      const systemCodesImmutable = fromJS({ systemCodes })
      const addressResult = mapAddress(result, systemCodesImmutable)

      expect(addressResult).toEqual(null)
    })

    it('returns the first address from addresses object', () => {
      const result = fromJS(resultWithTwoAddresses)
      const systemCodesImmutable = fromJS({ systemCodes })
      const addressResult = mapAddress(result, systemCodesImmutable)

      expect(addressResult.toJS()).toEqual({
        city: 'city',
        state: 'state',
        zip: 'zip',
        type: 'address type',
        streetAddress: '123 C Street',
      })
    })

    it('returns the first address if it is another Residence type', () => {
      const result = fromJS(addressCommon)
      const systemCodesImmutable = fromJS({ systemCodes })
      const addressResult = mapAddress(result, systemCodesImmutable)

      expect(addressResult.toJS()).toEqual({
        city: 'city',
        state: 'state',
        zip: 'zip',
        type: 'address type 2',
        streetAddress: '123 C Street',
      })
    })

    it('returns address type Placement Home if the legacy table name is PLC_HM_T', () => {
      const result = fromJS(addressPlacementHome)
      const systemCodesImmutable = fromJS({ systemCodes })
      const addressResult = mapAddress(result, systemCodesImmutable)

      expect(addressResult.toJS()).toEqual({
        city: 'city',
        state: 'state',
        zip: 'zip',
        type: 'Placement Home',
        streetAddress: '123 C Street',
      })
    })
  })

  describe('mapRaces', () => {
    it('maps race objects to values', () => {
      const result = fromJS({
        race_ethnicity: {
          race_codes: [
            { id: '3', description: 'Romanian' },
            { id: '2', description: 'French' },
            { id: '1', description: 'European' },
          ],
        },
      })
      const systemCodesImmutable = fromJS({
        systemCodes: { unableToDetermineCodes },
      })
      const racesResult = mapRaces(result, systemCodesImmutable)

      expect(racesResult.toJS()).toEqual(['Romanian', 'French', 'European'])
    })

    it('maps races to "Abandoned" if unableToDetermineCode is "A"', () => {
      const result = fromJS({
        race_ethnicity: {
          unable_to_determine_code: 'A',
        },
      })
      const systemCodesImmutable = fromJS({
        systemCodes: { unableToDetermineCodes },
      })
      const racesResult = mapRaces(result, systemCodesImmutable)

      expect(racesResult.toJS()).toEqual(['Abandoned'])
    })

    it('maps races to "Unknown" if unableToDetermineCode is "I"', () => {
      const result = fromJS({
        race_ethnicity: {
          unable_to_determine_code: 'I',
        },
      })
      const systemCodesImmutable = fromJS({
        systemCodes: { unableToDetermineCodes },
      })
      const racesResult = mapRaces(result, systemCodesImmutable)

      expect(racesResult.toJS()).toEqual(['Unknown'])
    })

    it('maps races to "Unknown" if unableToDetermineCode is "K"', () => {
      const result = fromJS({
        race_ethnicity: {
          unable_to_determine_code: 'K',
        },
      })
      const systemCodesImmutable = fromJS({
        systemCodes: { unableToDetermineCodes },
      })
      const racesResult = mapRaces(result, systemCodesImmutable)

      expect(racesResult.toJS()).toEqual(['Unknown'])
    })
  })
})
