import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import ChildProfilePage from './ChildProfilePage'
import { Client } from '../Client'
import CurrentUserLoadingBoundary from './CurrentUserLoadingBoundary'
import BreadCrumbsBuilder from '../Layout/BreadCrumb/BreadCrumbsBuilder'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

describe('Child Profile Page', () => {
  const defaultProps = { match: { params: { staffId: 'ABC' }, url: '/my/url' } }
  const render = props => shallow(<ChildProfilePage {...props} />)

  it('renders a breadcrumb with current user info', () => {
    const breadcrumbElement = render(defaultProps)
      .find(FullWidthLayout)
      .props().breadcrumb
    expect(breadcrumbElement.type).toBe(CurrentUserLoadingBoundary)
    const breadcrumb = breadcrumbElement.props.children
    expect(breadcrumb.type).toBe(BreadCrumbsBuilder)
    expect(breadcrumb.props.navigateTo).toBe(navigation.CHILD_PROFILE)
  })

  it('renders a Search button', () => {
    const layout = render(defaultProps).find(FullWidthLayout)
    expect(layout.props().rightButton.type).toBe(SearchClientsButton)
  })

  describe('with a client loaded', () => {
    const fakeClient = { anyKey: 'any value' }
    const match = { params: { staffId: '123' }, url: '/path/to/left' }
    let wrapper

    beforeEach(() => {
      wrapper = render({ client: fakeClient, match })
    })

    it('renders a body of Client', () => {
      const body = wrapper.find(FullWidthLayout)
      expect(body.find(Client).exists()).toBe(true)
    })

    it('passes route params to Client child', () => {
      const client = wrapper.find(Client)
      expect(client.props().match).toBe(match)
    })

    it('passes the client to the breadcrumb', () => {
      const breadcrumbElement = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumbElement.type).toBe(CurrentUserLoadingBoundary)
      const breadcrumb = breadcrumbElement.props.children
      expect(breadcrumb.props.client).toBe(fakeClient)
    })

    it('passes the client to the Client page', () => {
      const clientComponent = wrapper.find(Client)
      expect(clientComponent.props().client).toBe(fakeClient)
    })
  })

  describe('without a client loaded', () => {
    it('renders a layout with an empty body', () => {
      const body = render(defaultProps).find(FullWidthLayout)
      expect(body.exists()).toBe(true)
      expect(body.find(Client).exists()).toBe(false)
      expect(body.props().children).toBe(null)
    })
  })
})
