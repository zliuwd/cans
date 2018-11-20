import { Map, List } from 'immutable'
import {
  selectAddressTypes,
  selectUnableToDetermineCodes,
  systemCodeDisplayValue,
} from './selectors/systemCodeSelectors'
import { RESIDENCE_TYPES } from '../../enums/AddressType'
import { isPlacementHome } from './util/isPlacementHome'
import { zipFormatter } from './util/zipFormatter'
import { Maybe } from '../../util/maybe'

export const mapCounties = result => {
  return result.get('client_counties') ? result.get('client_counties').map(county => county.get('description')) : List()
}
export const mapLanguages = result => {
  return result.get('languages')
    ? result
        .get('languages')
        .sort((first, second) => second.get('primary') - first.get('primary'))
        .map(language => language.get('name'))
    : List()
}
export const mapIsSensitive = result => result.get('sensitivity_indicator', '').toUpperCase() === 'S'
export const mapIsSealed = result => result.get('sensitivity_indicator', '').toUpperCase() === 'R'
export const mapIsProbationYouth = result => result.get('open_case_responsible_agency_code', '').toUpperCase() === 'P'
const getStreetAddress = address => `${address.get('street_number') || ''} ${address.get('street_name') || ''}`
const getDisplayType = (address, addressTypes) => {
  if (isPlacementHome(address)) {
    return 'Placement Home'
  } else {
    return systemCodeDisplayValue(address.getIn(['type', 'id']), addressTypes) || ''
  }
}
export const mapRaces = (result = List(), systemCodes) => {
  const unableToDetermineCodes = selectUnableToDetermineCodes(systemCodes)

  if (result.get('race_ethnicity').get('unable_to_determine_code')) {
    const clientUnableToDetermineCode = result.get('race_ethnicity').get('unable_to_determine_code')

    return List([systemCodeDisplayValue(clientUnableToDetermineCode, unableToDetermineCodes)])
  } else if (result.get('race_ethnicity').get('race_codes')) {
    return result
      .get('race_ethnicity')
      .get('race_codes')
      .map(race => race.get('description'))
  } else {
    return List()
  }
}
const isResidence = address => RESIDENCE_TYPES.includes(address.getIn(['type', 'id']))
const addressMaybe = result =>
  Maybe.of(result.get('addresses'))
    .map(as => as.first())
    .filter(isResidence)
export const mapAddress = (result, systemCodes) => {
  const addressTypes = selectAddressTypes(systemCodes)

  return addressMaybe(result)
    .map(address =>
      Map({
        city: address.get('city'),
        state: address.get('state_code'),
        zip: zipFormatter(address.get('zip')),
        streetAddress: getStreetAddress(address),
        type: getDisplayType(address, addressTypes),
      })
    )
    .valueOrElse(null)
}
export const mapPhoneNumber = result =>
  addressMaybe(result)
    .map(address => address.get('phone_numbers'))
    .valueOrElse(List())
