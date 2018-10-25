import {
  List,
   Map,
 } from 'immutable'
import {
  selectCounties,
  systemCodeDisplayValue,
} from './SystemCodeSelectors'
// javascript/Application/components/Search/PeopleSearchSelectors.js
// javascript/Application/components/Search/SystemCodeSelectors.js
import {
  mapLanguages,
  mapIsSensitive,
  mapIsSealed,
  mapIsProbationYouth,
  mapRaces,
  mapEthnicities,
  mapAddress,
  mapPhoneNumber,
} from '../../util/PeopleSearchHelper'
// app/javascript/Application/util/PeopleSearchHelper.js
// import {isCommaSuffix, formatHighlightedSuffix} from 'utils/nameFormatter'
// import {phoneNumberFormatter} from 'utils/phoneNumberFormatter'
const isCommaSuffix = (suffix) => Boolean(
  (typeof suffix === 'string') && NAME_SUFFIXES[suffix.toLowerCase()]
)

const formatHighlightedSuffix = (highlightedSuffix) => {
  if (typeof highlightedSuffix !== 'string') { return null }

  const suffix = highlightedSuffix.replace(/<\/?em>/gi, '')
  const formattedSuffix = formatNameSuffix(suffix)
  if (!formattedSuffix) { return formattedSuffix }
  const rehighlightedSuffix = suffix === highlightedSuffix ?
    formattedSuffix : `<em>${formattedSuffix}</em>`

  return rehighlightedSuffix
}

const selectPeopleSearch = (state) => state.get('peopleSearch')
export const selectSearchTermValue = (state) => (
  selectPeopleSearch(state).get('searchTerm')
)
export const selectSearchAddressValue = (state) => (
  selectPeopleSearch(state).get('isAddressIncluded')
)
export const selectResultsTotalValue = (state) => (
  selectPeopleSearch(state).get('total')
)
export const selectLastResultsSortValue = (state) => {
  const lastResult = selectPeopleSearch(state).get('results').last()
  return lastResult.get('sort').toJS()
}

const formatSSN = (ssn) => ssn && ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
const formatDOB = (dob, highlight) => (highlight ? '<em>'.concat(dob, '</em>') : dob)
const formatPhoneNumber = (phoneNumber) => (phoneNumber ? Map({
  number: phoneNumberFormatter(phoneNumber.get('number')),
  type: phoneNumber.get('type'),
}) : null)

// Try to find a match from a list of highlights by stripping out <em> tags
const highlightNameField = (exactName, highlights) => (highlights.find(
  (highlight) => highlight.replace(/<(\/)?em>/g, '') === exactName
))

const maybeHighlightedField = (result, highlight, key) => highlight.getIn(
  [key, 0],
  highlightNameField(
    result.get(key),
    highlight.get('autocomplete_search_bar', List())
  )
)

const combineFullName = (firstName, middleName, lastName, nameSuffix, isCommaSuffix) => {
  const nameStem = [firstName, middleName, lastName].filter(Boolean).join(' ')

  if (nameSuffix) {
    return `${nameStem}${isCommaSuffix ? ',' : ''} ${nameSuffix}`
  }

  return nameStem
}

const formatFullName = (result, highlight) => combineFullName(
  maybeHighlightedField(result, highlight, 'first_name') || result.get('first_name'),
  maybeHighlightedField(result, highlight, 'middle_name') || result.get('middle_name'),
  maybeHighlightedField(result, highlight, 'last_name') || result.get('last_name'),
  formatHighlightedSuffix(maybeHighlightedField(result, highlight, 'name_suffix') || result.get('name_suffix')),
  isCommaSuffix(result.get('name_suffix'))
)

const mapCounties = (counties, countyCodes) => counties.map((county) =>
  systemCodeDisplayValue(county.get('id'), countyCodes)
)

const hasActiveCsec = (_result) => false

export const selectPeopleResults = (values) => values.map((fullResult) => {
    debugger
    ///const result = fullResult.get('_source', Map())
    //const highlight = fullResult.get('highlight', Map())
    return {
      legacy_id: "ftbeter dg",
      fullName: "Chirag",
      legacyDescriptor: "sjgydshd",
      gender: "Male",
      languages: "Hindi, English",
      races: "Asian",
      ethnicity: "ethnicity",
      dateOfBirth: "01/06/1991",
      isDeceased: "No",
      isCsec: "isCsec",
      ssn: "ssn456",
      clientCounties: "India",
      address: "0.23423, 0.23423",
      phoneNumber: "234546783",
      isSensitive: "No",
      isSealed: "No",
      isProbationYouth: "No",
    }
  })

export const selectStartTime = (state) => selectPeopleSearch(state)
  .get('startTime')

export const selectPersonCreatedAtTime = (state) =>
  state.get('relationshipsQueryCycleTime').toJS()
    .map((t) => t.personCreatedAtTime)
    .pop()

export const selectSearchAddress = (state) => selectPeopleSearch(state)
  .get('searchAddress')
export const selectSearchCity = (state) => selectPeopleSearch(state)
  .get('searchCity')
export const selectSearchCounty = (state) => selectPeopleSearch(state)
  .get('searchCounty')