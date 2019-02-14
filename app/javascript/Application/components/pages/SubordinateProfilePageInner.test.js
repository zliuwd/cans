import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SubordinateProfilePageInner from './SubordinateProfilePageInner'
import { CaseLoadPage } from '../Staff'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

describe('Subordinate Profile Page Inner', () => {
  const render = props => shallow(<SubordinateProfilePageInner {...props} />)

  it('renders a breadcrumb with current user info', () => {
    const breadcrumb = render({})
      .find(FullWidthLayout)
      .props().breadcrumb
    expect(breadcrumb.type).toBe(ContextualBreadCrumb)
    expect(breadcrumb.props.navigateTo).toBe(navigation.STAFF_READ)
  })

  it('renders a Search button', () => {
    const layout = render().find(FullWidthLayout)
    expect(layout.props().rightButton.type).toBe(SearchClientsButton)
  })

  describe('with a staff person loaded', () => {
    const fakeStaff = { staff_person: { identifier: 'aao' } }
    let wrapper

    beforeEach(() => {
      wrapper = render({ staffInfo: fakeStaff })
    })

    it('renders a body of CaseLoadPage', () => {
      const body = wrapper.find(FullWidthLayout)
      expect(body.find(CaseLoadPage).exists()).toBe(true)
    })

    it('passes staffId to CaseLoadPage child', () => {
      const caseLoadPage = wrapper.find(CaseLoadPage)
      expect(caseLoadPage.props().staffId).toBe(fakeStaff.staff_person.identifier)
    })

    it('passes the staff to the breadcrumb', () => {
      const breadcrumb = wrapper.find(FullWidthLayout).props().breadcrumb
      expect(breadcrumb.props.subordinate).toBe(fakeStaff)
    })
  })

  describe('without a staff person loaded', () => {
    it('renders a layout with an empty body', () => {
      const body = render({}).find(FullWidthLayout)
      expect(body.exists()).toBe(true)
      expect(body.find(CaseLoadPage).exists()).toBe(false)
      expect(body.props().children).toBe(null)
    })
  })
})
