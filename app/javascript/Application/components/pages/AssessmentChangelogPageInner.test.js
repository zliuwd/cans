import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import AssessmentChangelogPageInner from './AssessmentChangelogPageInner'
import { ChangeLogPage } from '../Assessment'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import FullWidthLayout from '../Layout/FullWidthLayout'

describe('AssessmentChangelogPageInner', () => {
  const defaultProps = {
    match: { params: { staffId: 'ABC' }, url: '/my/url' },
    navigateTo: navigation.ASSESSMENT_CHANGELOG,
  }
  const render = props => shallow(<AssessmentChangelogPageInner {...props} />)

  const findBreadcrumb = wrapper => wrapper.find(FullWidthLayout).props().breadcrumb

  describe('with a client loaded', () => {
    const fakeClient = { anyKey: 'any value' }
    const match = { params: { staffId: '123', id: '1010' }, url: '/path/to/left' }
    const navigateTo = navigation.STAFF_CHILD_PROFILE
    const staffInfo = { key: 'value' }

    let wrapper

    beforeEach(() => {
      wrapper = render({ client: fakeClient, match, navigateTo, staffInfo })
    })

    it('renders a body of ChangeLogPage', () => {
      const body = wrapper.find(FullWidthLayout)
      expect(body.find(ChangeLogPage).exists()).toBe(true)
    })

    it('passes route params to ChangeLogPage child', () => {
      const client = wrapper.find(ChangeLogPage)
      expect(client.props().match).toBe(match)
    })

    it('renders a breadcrumb with current user info', () => {
      const breadcrumb = findBreadcrumb(wrapper)
      expect(breadcrumb.type).toBe(ContextualBreadCrumb)
    })

    it('passes navigateTo to the breadcrumb', () => {
      const breadcrumb = findBreadcrumb(wrapper)
      expect(breadcrumb.props.navigateTo).toBe(navigateTo)
    })

    it('passes staffInfo to the breadcrumb', () => {
      const breadcrumb = findBreadcrumb(wrapper)
      expect(breadcrumb.props.subordinate).toBe(staffInfo)
    })

    it('passes the client to the breadcrumb', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.client).toBe(fakeClient)
    })

    it('passes the assessment id to the breadcrumb', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.assessmentId).toBe(match.params.id)
    })

    it('passes the url to the breadcrumb', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.url).toBe(match.url)
    })

    it('passes the client to the ChangeLogPage', () => {
      const pageComponent = wrapper.find(ChangeLogPage)
      expect(pageComponent.props().client).toBe(fakeClient)
    })

    it('updates header buttons when requested by page content', () => {
      const page = wrapper.find(ChangeLogPage)
      page.props().pageHeaderButtonsController.updateHeaderButtons('foo', 'bar')
      expect(wrapper.state().leftButton).toBe('foo')
      expect(wrapper.state().rightButton).toBe('bar')
    })

    it('provides a dummy default method for compatibility', () => {
      const page = wrapper.find(ChangeLogPage)
      expect(() => page.props().pageHeaderButtonsController.updateHeaderButtonsToDefault()).not.toThrow()
    })

    it('passes header buttons to the layout', () => {
      const buttons = { leftButton: 'To the Left, To the Left', rightButton: 'All right, all right, all right' }
      wrapper.setState(buttons)

      const layout = wrapper.find(FullWidthLayout)
      expect(layout.props().leftButton).toBe(buttons.leftButton)
      expect(layout.props().rightButton).toBe(buttons.rightButton)
    })
  })

  describe('without a client loaded', () => {
    it('renders a layout with an empty body', () => {
      const body = render(defaultProps).find(FullWidthLayout)
      expect(body.exists()).toBe(true)
      expect(body.find(ChangeLogPage).exists()).toBe(false)
      expect(body.props().children).toBe(null)
    })

    it('renders no breadcrumb', () => {
      const breadcrumb = render(defaultProps)
        .find(FullWidthLayout)
        .props().breadcrumb
      expect(breadcrumb).toBe(null)
    })
  })
})
