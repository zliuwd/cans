export const defaultState = {
  allResults: [],
  results: [],
  totalResults: 0,
  page: 0,
  lastPageFetched: 0,
}

export const mockClientResult = [
  {
    address: null,
    clientCounties: ['Monterey'],
    dateOfBirth: '1998-11-18',
    fullName: 'Maylour, <em>Casey</em>',
    gender: undefined,
    isCsec: false,
    isDeceased: false,
    isProbationYouth: false,
    isSealed: false,
    isSensitive: false,
    languages: [],
    legacyDescriptor: {
      legacy_id: 'NDUqtoG0Py',
      legacy_last_updated: '2018-07-24T15:08:37.948-0700',
      legacy_table_description: 'Client',
      legacy_table_name: 'CLIENT_T',
      legacy_ui_id: '1318-7710-4292-0001610',
    },
    legacy_id: 'NDUqtoG0Py',
    phoneNumber: null,
    races: [],
    sort: [154.06438, 'person-summary#NDUqtoG0Py'],
    ssn: undefined,
  },
]

export const mockDoraResult = {
  _index: 'people-summary_2018.11.06.16.20.00',
  _type: 'person-summary',
  _id: 'NDUqtoG0Py',
  _score: 154.06438,
  _source: {
    race_ethnicity: {
      hispanic_origin_code: 'U',
      unable_to_determine_code: '',
      race_codes: [],
      hispanic_codes: [],
      hispanic_unable_to_determine_code: '',
    },
    languages: [],
    date_of_birth: '1998-11-18',
    legacy_descriptor: {
      legacy_last_updated: '2018-07-24T15:08:37.948-0700',
      legacy_id: 'NDUqtoG0Py',
      legacy_ui_id: '1318-7710-4292-0001610',
      legacy_table_name: 'CLIENT_T',
      legacy_table_description: 'Client',
    },
    last_name: 'Maylour',
    id: 'NDUqtoG0Py',
    first_name: 'Casey',
    sensitivity_indicator: 'N',
    client_counties: [{ description: 'Monterey', id: '1094' }],
  },
  highlight: { autocomplete_search_bar: ['<em>Casey</em>'] },
  sort: [154.06438, 'person-summary#NDUqtoG0Py'],
}

export const mockResults = [
  { result: 1 },
  { result: 2 },
  { result: 3 },
  { result: 4 },
  { result: 5 },
  { result: 6 },
  { result: 7 },
  { result: 8 },
  { result: 9 },
  { result: 10 },
]

export const sortAfter = [124.60154, 'person-summary#HcjXq5Q0SR']

export const defaultMockClientResultData = {
  allResults: mockResults.concat({ result: 11 }),
  totalResults: 11,
}
