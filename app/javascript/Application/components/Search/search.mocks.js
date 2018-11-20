import { RESIDENCE_TYPES } from '../../enums/AddressType'

const sortAfterScore = 125.48025
const raceEthnicity = {
  hispanic_origin_code: 'Y',
  hispanic_unable_to_determine_code: 'Y',
  unable_to_determine_code: '',
  race_codes: [{ id: '1', description: 'Race 1' }],
  hispanic_codes: [{ description: 'Central American' }],
}
export const clientResponse = {
  sort: [sortAfterScore, 'person-summary#9GE4pyI0N3'],
  _source: {
    id: '1',
    first_name: 'Bart',
    last_name: 'Simpson',
    middle_name: 'Jacqueline',
    name_suffix: 'md',
    gender: 'female',
    languages: [{ id: '3', name: 'Italian' }, { id: '2', name: 'French' }],
    race_ethnicity: raceEthnicity,
    date_of_birth: '1990-02-13',
    date_of_death: '2000-02-18',
    ssn: '123456789',
    client_counties: [
      {
        description: 'SysCode Nowhere',
        id: '999',
      },
      {
        description: 'SysCode Places',
        id: '998',
      },
    ],
    addresses: [
      {
        id: '1',
        street_number: '234',
        street_name: 'Fake Street',
        city: 'Flushing',
        state_code: 'state',
        zip: '11344',
        type: { id: RESIDENCE_TYPES[0] },
        phone_numbers: [
          {
            number: '2126666666',
            type: 'Home',
          },
        ],
      },
    ],
    phone_numbers: [
      {
        id: '2',
        number: '9949076774',
        type: 'Home',
      },
    ],
    legacy_descriptor: {
      legacy_ui_id: '123-456-789',
      legacy_table_description: 'Client',
    },
    sensitivity_indicator: 'S',
    open_case_responsible_agency_code: 'P',
  },
}

export const searchResponse = {
  took: 31,
  timed_out: false,
  _shards: { total: 5, successful: 5, failed: 0 },
  hits: {
    total: 978,
    max_score: 125.48025,
    hits: [
      {
        _index: 'people-summary_2018.11.06.16.20.00',
        _type: 'person-summary',
        _id: '9GE4pyI0N3',
        _score: 125.48025,
        _source: {
          race_ethnicity: {
            hispanic_origin_code: 'U',
            unable_to_determine_code: '',
            race_codes: [],
            hispanic_codes: [{ description: 'Central American', id: '3163' }],
            hispanic_unable_to_determine_code: '',
          },
          addresses: [
            {
              zip: null,
              city: 'Sacramento',
              county: { description: 'Lake', id: '1084' },
              legacy_descriptor: {
                legacy_last_updated: '2018-04-02T19:24:59.836-0700',
                legacy_id: 'PKU7rHC0N3',
                legacy_ui_id: '1438-7737-0941-4001429',
                legacy_table_name: 'PLC_HM_T',
                legacy_table_description: 'Placement Home',
              },
              id: 'PKU7rHC0N3',
              type: { description: 'Residence', id: '32' },
              state_code: 'CA',
              street_name: '2nd street',
            },
            {
              zip: '0',
              city: 'SAC',
              county: { description: 'Lake', id: '1084' },
              legacy_descriptor: {
                legacy_last_updated: '2018-07-24T15:06:50.945-0700',
                legacy_id: 'TQCyu6o0N3',
                legacy_ui_id: '1671-2181-1696-6001429',
                legacy_table_name: 'ADDRS_T',
                legacy_table_description: 'Address',
              },
              id: 'TQCyu6o0N3',
              type: { description: 'Residence', id: '32' },
              state_code: 'CA',
              street_name: 'Bluestem Lane',
            },
          ],
          gender: 'female',
          languages: [{ name: 'English', id: '1253', primary: true }],
          date_of_birth: '2000-10-11',
          open_case_responsible_agency_code: 'C',
          legacy_descriptor: {
            legacy_last_updated: '2018-07-24T15:08:37.948-0700',
            legacy_id: '9GE4pyI0N3',
            legacy_ui_id: '0526-0682-6736-6001429',
            legacy_table_name: 'CLIENT_T',
            legacy_table_description: 'Client',
          },
          last_name: 'Fronek',
          id: '9GE4pyI0N3',
          first_name: 'Annie',
          sensitivity_indicator: 'N',
          client_counties: [{ description: 'Lake', id: '1084' }],
        },
        highlight: { autocomplete_search_bar: ['<em>Annie</em>'] },
        sort: [125.48025, 'person-summary#9GE4pyI0N3'],
        inner_hits: {
          addresses: { hits: { total: 0, max_score: null, hits: [] } },
        },
      },
      {
        _index: 'people-summary_2018.11.06.16.20.00',
        _type: 'person-summary',
        _id: 'Qnh1yct0DE',
        _score: 116.67191,
        _source: {
          race_ethnicity: {
            hispanic_origin_code: 'U',
            unable_to_determine_code: '',
            race_codes: [{ description: 'White*', id: '839' }],
            hispanic_codes: [],
            hispanic_unable_to_determine_code: '',
          },
          addresses: [
            {
              zip: '95818',
              city: 'Sacramento',
              county: {},
              legacy_descriptor: {
                legacy_last_updated: '2012-05-03T08:28:24.320-0700',
                legacy_id: 'KAck2mB0DE',
                legacy_ui_id: '1145-7385-1453-1000820',
                legacy_table_name: 'PLC_HM_T',
                legacy_table_description: 'Placement Home',
              },
              street_number: '458',
              id: 'KAck2mB0DE',
              type: { description: 'Residence', id: '32' },
              state_code: 'CA',
              street_name: 'Zoopey Doopey',
            },
          ],
          gender: 'female',
          languages: [],
          date_of_birth: '1981-01-05',
          legacy_descriptor: {
            legacy_last_updated: '2018-07-24T15:08:37.948-0700',
            legacy_id: 'Qnh1yct0DE',
            legacy_ui_id: '1522-3324-8777-9000820',
            legacy_table_name: 'CLIENT_T',
            legacy_table_description: 'Client',
          },
          last_name: 'Palfery',
          id: 'Qnh1yct0DE',
          first_name: 'Annie',
          sensitivity_indicator: 'N',
          client_counties: [{ id: '0' }],
        },
        highlight: { autocomplete_search_bar: ['<em>Annie</em>'] },
        sort: [116.67191, 'person-summary#Qnh1yct0DE'],
        inner_hits: {
          addresses: { hits: { total: 0, max_score: null, hits: [] } },
        },
      },
    ],
  },
}

export const bartSimpsonResponse = {
  _source: {
    id: '1',
    first_name: 'Bart',
    last_name: 'Simpson',
    date_of_birth: '1990-02-13',
    race_ethnicity: {},
    ssn: '123456789',
    client_counties: [
      {
        description: 'SysCode Nowhere',
        id: '999',
      },
    ],
    addresses: [
      {
        id: '1',
        street_number: '234',
        street_name: 'Fake Street',
        city: 'Flushing',
        state_code: 'state',
        zip: '11344',
        type: { id: RESIDENCE_TYPES[0] },
        phone_numbers: [
          {
            number: '2125550123',
            type: 'Home',
          },
        ],
      },
    ],
    phone_numbers: [
      {
        number: '9949076774',
        type: 'Home',
      },
    ],
    legacy_descriptor: {
      legacy_ui_id: '123-456-789',
      legacy_table_description: 'Client',
    },
  },
}
