import { selectPeopleResults } from './SearchSelectors'
import { unableToDetermineCodes } from '../../../enums/SystemCodes'
import {
  languages,
  ethnicityTypes,
  raceTypes,
  hispanicOriginCodes,
  addressTypes,
  counties,
} from '../../../enums/systemcodes.mocks'
import { clientResponse, bartSimpsonResponse } from '../search.mocks'
import { bartSimpsonResult } from '../clientresults.mocks'

const systemCodes = {
  addressTypes,
  counties,
  ethnicityTypes,
  hispanicOriginCodes,
  languages,
  raceTypes,
  unableToDetermineCodes,
}

const autoCompleteSearchBar = ['<em>Bar</em>t', 'Sim<em>pson</em>', '<em>123456789</em>', '<em>1990</em>']

describe('SearchSelectors', () => {
  describe('selectPeopleResults', () => {
    it('maps person search attributes to suggestion attributes', () => {
      const peopleSearch = {
        results: [clientResponse],
      }
      const response = {
        ...peopleSearch,
        systemCodes,
      }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults).toEqual([bartSimpsonResult])
    })

    it('maps the first address and its phone number result to address and phone number', () => {
      const peopleSearch = {
        results: [clientResponse],
      }
      const response = {
        ...peopleSearch,
        systemCodes,
      }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].address).toEqual({
        city: 'Flushing',
        state: 'state',
        zip: '11344',
        type: 'address type',
        streetAddress: '234 Fake Street',
      })
      expect(peopleResults[0].phoneNumber).toEqual({
        number: '(212) 666-6666',
        type: 'Home',
      })
    })

    it('maps person search attributes when phone numbers and addresses are empty', () => {
      const peopleSearch = {
        results: [
          {
            _source: {
              phone_numbers: [],
              addresses: [],
              race_ethnicity: {},
            },
          },
        ],
      }
      const response = {
        ...peopleSearch,
        systemCodes,
      }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].address).toEqual(null)
      expect(peopleResults[0].phoneNumber).toEqual(null)
    })

    it('does not flag csec status when the person has no csec items', () => {
      const clientWithNoCsecInfo = JSON.parse(JSON.stringify(clientResponse))
      clientWithNoCsecInfo._source.csec = []
      const peopleSearch = {
        results: [clientWithNoCsecInfo],
      }
      const response = { ...peopleSearch, systemCodes }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].isCsec).toEqual(false)
    })

    it('does not flag csec status when the person has only ended csec items', () => {
      const clientWithCsecInfo = JSON.parse(JSON.stringify(clientResponse))
      clientWithCsecInfo._source.csec = [
        { start_date: '2018-01-01', end_date: '2018-02-02' },
        { start_date: '2018-01-01', end_date: '2018-02-02' },
      ]
      const peopleSearch = { results: [clientWithCsecInfo] }
      const response = { ...peopleSearch, systemCodes }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].isCsec).toEqual(false)
    })

    describe('when highlighting', () => {
      function personWithHighlights(highlight) {
        return {
          results: [
            {
              ...bartSimpsonResponse,
              highlight,
            },
          ],
        }
      }
      it('should use exact highlighted fields if available', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          last_name: ['Sim<em>pson</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: autoCompleteSearchBar,
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('Sim<em>pson</em>, <em>Bar</em>t')
        expect(peopleResults[0].ssn).toEqual('<em>123-45-6789</em>')
        expect(peopleResults[0].dateOfBirth).toEqual('<em>1990-02-13</em>')
      })

      it('should use exact highlighted and suffixes should return empty for invalid suffixes', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          last_name: ['Sim<em>pson</em>'],
          name_suffix: ['<em>cccv</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: [
            '<em>Bar</em>t',
            'Sim<em>pson</em>',
            '<em>123456789</em>',
            '<em>1990</em>',
            '<em>cccv</em>',
          ],
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('Sim<em>pson</em>, <em>Bar</em>t')
        expect(peopleResults[0].ssn).toEqual('<em>123-45-6789</em>')
        expect(peopleResults[0].dateOfBirth).toEqual('<em>1990-02-13</em>')
      })

      it('should check autocomplete_search_bar if no exact first_name', () => {
        const peopleSearch = personWithHighlights({
          last_name: ['Sim<em>pson</em>'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: autoCompleteSearchBar,
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('Sim<em>pson</em>, <em>Bar</em>t')
      })

      it('should check autocomplete_search_bar if no exact last_name', () => {
        const peopleSearch = personWithHighlights({
          first_name: ['<em>Bar</em>t'],
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: autoCompleteSearchBar,
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('Sim<em>pson</em>, <em>Bar</em>t')
      })

      it('should find autocomplete fields in any order', () => {
        const peopleSearch = personWithHighlights({
          autocomplete_search_bar: ['<em>123456789</em>', '<em>Simpson</em>', '<em>1990</em>', '<em>Annie</em>'],
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('<em>Simpson</em>, Bart')
      })

      it('should use exact names if no highlight', () => {
        const peopleSearch = personWithHighlights({
          ssn: ['<em>123456789</em>'],
          searchable_date_of_birth: ['<em>1990</em>'],
          autocomplete_search_bar: ['<em>123456789</em>', '<em>1990</em>'],
        })
        const response = {
          ...peopleSearch,
          systemCodes,
        }
        const peopleResults = selectPeopleResults({ response })
        expect(peopleResults[0].fullName).toEqual('Simpson, Bart')
      })
    })

    it('formats ssn', () => {
      const peopleSearch = {
        results: [clientResponse],
      }
      const response = {
        ...peopleSearch,
        systemCodes,
      }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].ssn).toEqual('123-45-6789')
    })

    it('formats highlighted ssn', () => {
      const peopleSearch = {
        results: [
          {
            highlight: {
              ssn: ['<em>123456789</em>'],
            },
            ...clientResponse,
          },
        ],
      }
      const response = {
        ...peopleSearch,
        systemCodes,
      }
      const peopleResults = selectPeopleResults({ response })
      expect(peopleResults[0].ssn).toEqual('<em>123-45-6789</em>')
    })
  })

  it('maps the matching aka', () => {
    const peopleSearch = {
      results: [clientResponse],
    }
    const response = {
      ...peopleSearch,
      systemCodes,
    }
    const peopleResults = selectPeopleResults({ response, searchTerm: 'James Doolittle' })
    expect(peopleResults[0].matchingAka).toEqual({
      id: 'MYl4QKc0Ki',
      name_type: 'AKA',
      first_name: 'James',
      last_name: 'Doolittle',
    })
  })
})
