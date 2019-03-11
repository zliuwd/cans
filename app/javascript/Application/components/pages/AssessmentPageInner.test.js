import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import AssessmentPageInner from './AssessmentPageInner'
import { AssessmentForm } from '../Assessment'
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
    expect(layout.props().navigateTo).toBe(navigation.ASSESSMENT_ADD)
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
    expect(layout.props().navigateTo).toBe(navigation.ASSESSMENT_EDIT)
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
    expect(layout.props().navigateTo).toBe(navigation.STAFF_ASSESSMENT_EDIT)
  })

  describe('with a client loaded', () => {
    const fakeClient = { identifier: 'my client' }
    const match = { params: {}, url: '/path/to/left' }
    const history = { name: 'fake history object' }
    const staffInfo = { anyKey: 'staff info' }
    const navigateTo = navigation.ASSESSMENT_ADD
    let wrapper

    beforeEach(() => {
      wrapper = render({ client: fakeClient, match, history, navigateTo, staffInfo })
    })

    it('renders a body of AssessmentForm', () => {
      const body = wrapper.find(FullWidthLayout)
      expect(body.find(AssessmentForm).exists()).toBe(true)
    })

    it('passes route params to AssessmentForm child', () => {
      const assessment = wrapper.find(AssessmentForm)
      expect(assessment.props().match).toBe(match)
    })

    it('passes router history to AssessmentForm child', () => {
      const assessment = wrapper.find(AssessmentForm)
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

    it('passes the client to the AssessmentForm page', () => {
      const assessment = wrapper.find(AssessmentForm)
      expect(assessment.props().client).toBe(fakeClient)
    })

    it('updates header buttons when requested by AssessmentForm', () => {
      const assessment = wrapper.find(AssessmentForm)
      assessment.props().pageHeaderButtonsController.updateHeaderButtons('foo', 'bar')
      expect(wrapper.state().leftButton).toBe('foo')
      expect(wrapper.state().rightButton).toBe('bar')
    })

    it('provides a dummy default method for compatibility', () => {
      const assessment = wrapper.find(AssessmentForm)
      expect(() => assessment.props().pageHeaderButtonsController.updateHeaderButtonsToDefault()).not.toThrow()
    })

    it('passes header buttons to the layout', () => {
      const buttons = { leftButton: 'To the Left, To the Left', rightButton: 'All right, all right, all right' }
      wrapper.setState(buttons)

      const layout = wrapper.find(FullWidthLayout)
      expect(layout.props().leftButton).toBe(buttons.leftButton)
      expect(layout.props().rightButton).toBe(buttons.rightButton)
    })
  })
})
