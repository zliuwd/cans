import React from 'react'
import { PersonSearchForm } from './index'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import { Redirect } from 'react-router-dom'
import { ClientFetcher, ClientSearch } from './ClientSearch'

const SEARCH_TITLE = 'This is a search card!'
const SEARCH_PROMPT = 'Search CWS-CMS for clients only. Or other things.'

describe('<PersonSearchForm />', () => {
  describe('before a client is selected', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />)
    })

    it('renders with a <Card /> component', () => {
      expect(wrapper.find(Card).exists()).toBe(true)
    })

    it('renders with a <CardHeader /> component', () => {
      expect(wrapper.find(CardHeader).exists()).toBe(true)
    })

    it('renders with a <CardTitle /> component with the configured title', () => {
      expect(wrapper.find(CardTitle).props().children).toBe(SEARCH_TITLE)
    })

    it('renders with a <CardBody /> component', () => {
      expect(wrapper.find(CardBody).exists()).toBe(true)
    })

    it('renders a ClientSearch within a ClientFetcher', () => {
      expect(
        wrapper
          .find(ClientFetcher)
          .find(ClientSearch)
          .exists()
      ).toBe(true)
    })

    it('uses the search prompt for the ClientSearch labelText', () => {
      expect(wrapper.find(ClientSearch).props().labelText).toBe(SEARCH_PROMPT)
    })

    it('sets the selected client in state when a client item is selected', () => {
      const item = { legacy_id: '9876543zyx' }
      wrapper
        .find(ClientSearch)
        .props()
        .onSelect(item)
      expect(wrapper.state()).toEqual({ selectedClientId: '9876543zyx' })
    })
  })

  describe('when a client is selected', () => {
    it('redirects to that client page', () => {
      const wrapper = shallow(<PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />)
      wrapper.setState({ selectedClientId: '1234567abc' })
      const redirect = wrapper.find(Redirect)
      expect(redirect.exists()).toBe(true)
      expect(redirect.props().push).toBeDefined()
      expect(redirect.props().to).toBe('search/clients/1234567abc')
    })
  })
})
