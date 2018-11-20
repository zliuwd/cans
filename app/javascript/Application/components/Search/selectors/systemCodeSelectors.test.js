import { selectAddressTypes, selectUnableToDetermineCodes, systemCodeDisplayValue } from './systemCodeSelectors'
import { fromJS } from 'immutable'

describe('systemCodeSelectors', () => {
  describe('systemCodeDisplayValue', () => {
    const systemCodes = fromJS([{ code: '007', value: 'James Bond' }, { code: '006', value: 'Alec Trevelyan' }])

    it('finds the value with matching code', () => {
      expect(systemCodeDisplayValue('007', systemCodes)).toEqual('James Bond')
      expect(systemCodeDisplayValue('006', systemCodes)).toEqual('Alec Trevelyan')
    })

    it('returns a undefined when none is found', () => {
      expect(systemCodeDisplayValue('009', systemCodes)).toBeUndefined()
    })
  })

  describe('selectAddressTypes', () => {
    it('returns a list of address types', () => {
      const addressTypes = [{ code: '1', value: 'ABC' }]
      const otherSystemCodes = [{ code: '2', value: 'invalid' }]
      const state = fromJS({ systemCodes: { addressTypes, otherSystemCodes } })
      expect(selectAddressTypes(state).toJS()).toEqual(addressTypes)
    })

    it('returns an empty list when address types are empty', () => {
      const addressTypes = []
      const otherSystemCodes = [{ code: '2', value: 'invalid' }]
      const state = fromJS({ systemCodes: { addressTypes, otherSystemCodes } })
      expect(selectAddressTypes(state).toJS()).toEqual([])
    })
  })

  describe('selectUnableToDetermineCodes', () => {
    it('returns a list of relationship types', () => {
      const unableToDetermineCodes = [{ county_code: '99', value: 'State Of California' }]
      const state = fromJS({ systemCodes: { unableToDetermineCodes } })
      expect(selectUnableToDetermineCodes(state).toJS()).toEqual(unableToDetermineCodes)
    })

    it('returns an empty list when relationship types are empty', () => {
      const unableToDetermineCodes = []
      const state = fromJS({ systemCodes: { unableToDetermineCodes } })
      expect(selectUnableToDetermineCodes(state).toJS()).toEqual([])
    })
  })
})
