import { Map, List } from 'immutable'

export const systemCodeDisplayValue = (code, systemCodes = List()) =>
  systemCodes.find(systemCode => systemCode.get('code') === code, null, Map()).get('value')

const selectCodes = type => state => state.getIn(['systemCodes', type])

export const selectAddressTypes = selectCodes('addressTypes')
export const selectUnableToDetermineCodes = selectCodes('unableToDetermineCodes')
