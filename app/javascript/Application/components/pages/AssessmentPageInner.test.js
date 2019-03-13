import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import AssessmentPageInner from './AssessmentPageInner'
import { AssessmentContainer } from '../Assessment'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import FullWidthLayout from '../Layout/FullWidthLayout'

describe('Assessment Page Inner', () => {
  const render = props => shallow(<AssessmentPageInner {...props} />)

  it('renders a breadcrumb with current user info', () => {
    const breadcrumbElement = render({
      match: { params: {}, url: '/my/path' },
      history: {},
      navigateTo: navigation.ASSESSMENT_ADD,
    })
      .find(FullWidthLayout)
      .props().breadcrumb
    expect(breadcrumbElement.type).toBe(ContextualBreadCrumb)
  })

  it('handles navigateTo for a new assessment', () => {
    const wrapper = render({
      match: { params: {}, url: '/my/path' },
      history: {},
      navigateTo: navigation.ASSESSMENT_ADD,
    })
    const layout = wrapper.find(FullWidthLayout)
    const breadcrumb = layout.props().breadcrumb

    expect(breadcrumb.props.navigateTo).toBe(navigation.ASSESSMENT_ADD)
  })

  it('handles navigateTo for an existing assessment', () => {
    const wrapper = render({
      match: { params: {}, url: '/my/path' },
      history: {},
      navigateTo: navigation.ASSESSMENT_EDIT,
    })
    const layout = wrapper.find(FullWidthLayout)
    const breadcrumb = layout.props().breadcrumb

    expect(breadcrumb.props.navigateTo).toBe(navigation.ASSESSMENT_EDIT)
  })

  it('handles navigateTo for a supervisor view', () => {
    const wrapper = render({
      match: { params: {}, url: '/my/path' },
      history: {},
      navigateTo: navigation.STAFF_ASSESSMENT_EDIT,
    })
    const layout = wrapper.find(FullWidthLayout)
    const breadcrumb = layout.props().breadcrumb

    expect(breadcrumb.props.navigateTo).toBe(navigation.STAFF_ASSESSMENT_EDIT)
  })

  describe('with a client loaded', () => {
    const fakeClient = { anyKey: 'any value' }
    const match = { params: {}, url: '/path/to/left' }
    const history = { name: 'fake history object' }
    const staffInfo = { anyKey: 'staff info' }
    const navigateTo = navigation.ASSESSMENT_ADD
    let wrapper

    beforeEach(() => {
      wrapper = render({ client: fakeClient, match, history, navigateTo, staffInfo })
    })

    it('renders a body of AssessmentContainer', () => {
      const body = wrapper.find(FullWidthLayout)
      expect(body.find(AssessmentContainer).exists()).toBe(true)
    })

    it('passes route params to AssessmentContainer child', () => {
      const assessment = wrapper.find(AssessmentContainer)
      expect(assessment.props().match).toBe(match)
    })

    it('passes router history to AssessmentContainer child', () => {
      const assessment = wrapper.find(AssessmentContainer)
      expect(assessment.props().history).toBe(history)
    })

    it('passes the client to the breadcrumb', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.client).toBe(fakeClient)
    })

    it('passes staffInfo to the breadcrumb if present', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.subordinate).toBe(staffInfo)
    })

    it('passes the client to the AssessmentContainer page', () => {
      const assessment = wrapper.find(AssessmentContainer)
      expect(assessment.props().client).toBe(fakeClient)
    })

    it('updates header title when requested by AssessmentContainer', () => {
      const assessment = wrapper.find(AssessmentContainer)
      assessment.props().pageHeaderController.updateHeaderTitle('New Title')
      expect(wrapper.state().pageTitle).toBe('New Title')
    })

    it('updates header buttons when requested by AssessmentContainer', () => {
      const assessment = wrapper.find(AssessmentContainer)
      assessment.props().pageHeaderController.updateHeaderButtons('foo', 'bar')
      expect(wrapper.state().leftButton).toBe('foo')
      expect(wrapper.state().rightButton).toBe('bar')
    })

    it('provides a dummy default method for compatibility', () => {
      const assessment = wrapper.find(AssessmentContainer)
      expect(() => assessment.props().pageHeaderController.updateHeaderButtonsToDefault()).not.toThrow()
    })

    it('passes header buttons and title to the layout', () => {
      const state = {
        pageTitle: 'The Page Title',
        leftButton: 'To the Left, To the Left',
        rightButton: 'All right, all right, all right',
      }
      wrapper.setState(state)

      const layout = wrapper.find(FullWidthLayout)
      expect(layout.props().pageTitle).toBe(state.pageTitle)
      expect(layout.props().leftButton).toBe(state.leftButton)
      expect(layout.props().rightButton).toBe(state.rightButton)
    })
  })
})
