import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import ChildProfilePageInner from './ChildProfilePageInner'
import { Client } from '../Client'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

describe('Child Profile Page Inner', () => {
  const defaultProps = { match: { params: { staffId: 'ABC' }, url: '/my/url' }, navigateTo: navigation.CHILD_PROFILE }
  const render = props => shallow(<ChildProfilePageInner {...props} />)

  const findBreadcrumb = wrapper => wrapper.find(FullWidthLayout).props().breadcrumb

  it('renders a breadcrumb with current user info', () => {
    const breadcrumb = findBreadcrumb(render(defaultProps))
    expect(breadcrumb.type).toBe(ContextualBreadCrumb)
    expect(breadcrumb.props.navigateTo).toBe(navigation.CHILD_PROFILE)
  })

  it('renders a Search button', () => {
    const layout = render(defaultProps).find(FullWidthLayout)
    expect(layout.props().rightButton.type).toBe(SearchClientsButton)
  })

  it('passes navigateTo to the breadcrumb', () => {
    const navigateTo = navigation.STAFF_CHILD_PROFILE
    const breadcrumb = findBreadcrumb(render({ ...defaultProps, navigateTo }))
    expect(breadcrumb.props.navigateTo).toBe(navigateTo)
  })

  it('passes staffInfo to the breadcrumb', () => {
    const staffInfo = { key: 'value' }
    const breadcrumb = findBreadcrumb(render({ ...defaultProps, staffInfo }))
    expect(breadcrumb.props.subordinate).toBe(staffInfo)
  })

  describe('with a client loaded', () => {
    const fakeClient = { anyKey: 'any value' }
    const match = { params: { staffId: '123' }, url: '/path/to/left' }
    const navigateTo = navigation.STAFF_CHILD_PROFILE

    let wrapper

    beforeEach(() => {
      wrapper = render({ client: fakeClient, match, navigateTo })
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
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.client).toBe(fakeClient)
    })

    it('passes the client to the Client page', () => {
      const clientComponent = wrapper.find(Client)
      expect(clientComponent.props().client).toBe(fakeClient)
    })

    it('passes navigateTo to the Client page', () => {
      const clientComponent = wrapper.find(Client)
      expect(clientComponent.props().navigateTo).toBe(navigateTo)
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
