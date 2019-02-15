import React from 'react'
import { shallow } from 'enzyme'
import ClientFetcher from './ClientFetcher'
import { SearchService } from '../Search.service'
import * as SearchSelectors from '../selectors/SearchSelectors'
import { systemCodes } from '../../../enums/SystemCodes'

jest.mock('../Search.service')
jest.mock('../selectors/SearchSelectors')

const MyComponent = () => 'Hello!'

describe('<ClientFetcher />', () => {
  const render = () =>
    shallow(
      <ClientFetcher>
        <MyComponent />
      </ClientFetcher>
    )

  it('renders the children passed in', () => {
    const wrapper = render()
    expect(wrapper.find(MyComponent).exists()).toBe(true)
  })

  it('passes a fetch function to the child', () => {
    const wrapper = render()
    expect(wrapper.find(MyComponent).props().fetch).toBeDefined()
  })

  describe('fetch method', () => {
    const items = ['a', 'b', 'c']
    const expectedItems = [0, 1, 2]
    const getClients = jest.spyOn(SearchService, 'getClients')
    const selectPeopleResults = jest.spyOn(SearchSelectors, 'selectPeopleResults')

    let wrapper
    let actualResults

    beforeEach(async () => {
      jest.resetAllMocks()
      getClients.mockReturnValue(Promise.resolve({ hits: { hits: items, total: 500 } }))
      selectPeopleResults.mockReturnValue(expectedItems)
      wrapper = render()
    })

    it('fetches clients from Search Service', async () => {
      actualResults = await wrapper.props().fetch({ searchTerm: 'Johnny McRealPerson' })
      expect(actualResults.items).toEqual(expectedItems)
      expect(selectPeopleResults).toHaveBeenCalledWith({
        response: { results: items, systemCodes },
        searchTerm: 'Johnny McRealPerson',
      })
      expect(getClients).toHaveBeenCalledWith({ searchTerm: 'Johnny McRealPerson' })
    })

    it('fetches with searchAfter if provided', async () => {
      const searchAfter = ['my search after']
      actualResults = await wrapper.props().fetch({ searchTerm: 'Johnny McRealPerson', searchAfter })
      expect(getClients).toHaveBeenCalledWith({ searchTerm: 'Johnny McRealPerson', sortAfter: searchAfter })
    })
  })
})
