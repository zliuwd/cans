import { RESIDENCE_TYPES } from '../../enums/AddressType'

export const sortAfterScore = 125.48025

export const defaultProps = {
  id: 'client-search-autocompleter',
  onChange: () => {},
  onClear: () => {},
  results: [],
  totalResults: 0,
  totalPages: 0,
}

export const propsWithResults = {
  id: 'client-search-autocompleter',
  debounce: () => {},
  onClear: () => {},
  results: [
    {
      gender: 'female',
      races: [],
      isSealed: false,
      isSensitive: false,
      legacy_id: '9GE4pyI0N3',
      clientCounties: ['Lake'],
      address: {
        city: 'Sacramento',
        state: 'CA',
        zip: null,
        streetAddress: ' 2nd street',
        type: 'Placement Home',
      },
      phoneNumber: null,
      legacyDescriptor: {
        legacy_last_updated: '2018-07-24T15:08:37.948-0700',
        legacy_id: '9GE4pyI0N3',
        legacy_ui_id: '0526-0682-6736-6001429',
        legacy_table_name: 'CLIENT_T',
        legacy_table_description: 'Client',
      },
      isCsec: false,
      dateOfBirth: '2000-10-11',
      fullName: 'Fronek, <em>Annie</em>',
      languages: ['English'],
      isProbationYouth: false,
      sort: [sortAfterScore, 'person-summary#9GE4pyI0N3'],
      isDeceased: false,
    },
  ],
  totalResults: 1,
  totalPages: 1,
}

export const resultWithPhoneNumbers = {
  addresses: [
    {
      id: 'TSWY42i0V4',
      city: 'Sacramento',
      state: {
        id: '1828',
        description: 'California',
      },
      state_code: 'CA',
      state_name: 'California',
      county: {
        id: '1101',
        description: 'Sacramento',
      },
      zip: null,
      type: {
        id: '32',
        description: 'Residence',
      },
      street_number: '10',
      street_name: 'Main St',
      active: 'true',
      legacy_descriptor: {
        legacy_id: 'TSWY42i0V4',
        legacy_ui_id: '1673-3395-1268-0001926',
        legacy_last_updated: '2004-11-16T17:25:53.407-0800',
        legacy_table_name: 'PLC_HM_T',
        legacy_table_description: 'Placement Home',
      },
      phone_numbers: [
        {
          number: '9200002665',
          type: 'Home',
        },
        {
          number: '9230003403',
          type: 'Work',
        },
        {
          number: '8720007345',
          type: 'Cell',
        },
      ],
    },
  ],
}

export const resultWithTwoAddresses = {
  addresses: [
    {
      city: 'city',
      state_code: 'state',
      zip: 'zip',
      type: { id: RESIDENCE_TYPES[0] },
      street_number: '123',
      street_name: 'C Street',
    },
    {
      city: 'city2',
      state_code: 'state2',
      zip: 'zip2',
      type: { id: RESIDENCE_TYPES[0] },
      street_number: '12345',
      street_name: 'K Street',
    },
  ],
}

export const addressPlacementHome = {
  addresses: [
    {
      city: 'city',
      state_code: 'state',
      zip: 'zip',
      type: { id: RESIDENCE_TYPES[1] },
      street_number: '123',
      street_name: 'C Street',
      legacy_descriptor: {
        legacy_id: 'TSWY42i0V4',
        legacy_ui_id: '1673-3395-1268-0001926',
        legacy_last_updated: '2004-11-16T17:25:53.407-0800',
        legacy_table_name: 'PLC_HM_T',
        legacy_table_description: 'Placement Home',
      },
    },
  ],
}

export const addressCommon = {
  addresses: [
    {
      city: 'city',
      state_code: 'state',
      zip: 'zip',
      type: { id: RESIDENCE_TYPES[1] },
      street_number: '123',
      street_name: 'C Street',
    },
  ],
}

export const bartSimpsonResult = {
  legacy_id: '1',
  fullName: 'Simpson, MD, Bart Jacqueline',
  gender: 'female',
  legacyDescriptor: {
    legacy_ui_id: '123-456-789',
    legacy_table_description: 'Client',
  },
  languages: ['Italian', 'French'],
  races: ['Race 1'],
  dateOfBirth: '1990-02-13',
  isCsec: false,
  isDeceased: true,
  isProbationYouth: true,
  ssn: '123-45-6789',
  clientCounties: ['SysCode Nowhere', 'SysCode Places'],
  address: {
    city: 'Flushing',
    state: 'state',
    zip: '11344',
    type: 'address type',
    streetAddress: '234 Fake Street',
  },
  phoneNumber: {
    number: '(212) 666-6666',
    type: 'Home',
  },
  isSensitive: true,
  isSealed: false,
  sort: [sortAfterScore, 'person-summary#9GE4pyI0N3'],
}
