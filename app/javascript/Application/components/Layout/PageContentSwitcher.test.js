import React from 'react'
import { navigation } from '../../util/constants'
import { SupervisorDashboard, CaseLoadPage, CurrentUserCaseLoadPage } from '../Staff'
import { Client, ClientAddEditForm } from '../Client'
import { AssessmentContainer, ChangeLogPage } from '../Assessment'
import { SearchContainer } from '../Search'
import PageContentSwitcher from './PageContentSwitcher'
import { shallow } from 'enzyme'

describe('PageContentSwitcher', () => {
  const params = {
    navigateTo: 'CHILD_PROFILE_OVERALL',
    client: { person_role: 'CLIENT', first_name: 'See', last_name: 'Abbott' },
    currentUser: {
      privileges: ['some-permissions'],
      staff_id: '0X5',
    },
    header: { leftButton: null },
    history: { length: 21, action: 'PUSH' },
    location: { pathname: '/clients/AdE0PWu0X5', search: '', hash: '' },
    match: { url: '/clients/AdE0PWu0X5', isExact: true, params: { key: 'value' } },
    pageHeaderButtonsController: { updateHeaderButtons: () => {}, updateHeaderButtonsToDefault: () => {} },
  }
  const getWrapper = navigateTo => {
    return shallow(
      <PageContentSwitcher params={params} client={{ clientId: '1001' }} staffId={'101'} navigateTo={navigateTo} />
    )
  }

  it('will switch to CurrentUserCaseLoadPage when nav to navigation.CHILD_LIST />', () => {
    const wrapper = getWrapper(navigation.CHILD_LIST)
    expect(wrapper.find(CurrentUserCaseLoadPage).length).toBe(1)
  })

  it('will switch to Client when nav to navigation.CHILD_PROFILE/>', () => {
    const wrapper = getWrapper(navigation.CHILD_PROFILE)
    expect(wrapper.find(Client).length).toBe(1)
  })

  it('will switch to ClientAddEditForm when nav to navigation.CHILD_PROFILE_ADD/>', () => {
    const wrapper = getWrapper(navigation.CHILD_PROFILE_ADD)
    expect(wrapper.find(ClientAddEditForm).length).toBe(1)
  })

  it('will switch to ClientAddEditForm  when nav to navigation.CHILD_PROFILE_EDIT/>', () => {
    const wrapper = getWrapper(navigation.CHILD_PROFILE_EDIT)
    expect(wrapper.find(ClientAddEditForm).length).toBe(1)
  })

  it('will switch to AssessmentContainer  when nav to navigation.ASSESSMENT_ADD/>', () => {
    const wrapper = getWrapper(navigation.ASSESSMENT_ADD)
    expect(wrapper.find(AssessmentContainer).length).toBe(1)
  })

  it('will switch to AssessmentContainer when nav to navigation.ASSESSMENT_EDIT/>', () => {
    const wrapper = getWrapper(navigation.ASSESSMENT_EDIT)
    expect(wrapper.find(AssessmentContainer).length).toBe(1)
  })

  it('will switch to ChangeLogPage when nav to navigation.ASSESSMENT_CHANGELOG/>', () => {
    const wrapper = getWrapper(navigation.ASSESSMENT_CHANGELOG)
    expect(wrapper.find(ChangeLogPage).length).toBe(1)
  })

  it('will switch to SearchContainer when nav to navigation.CLIENT_SEARCH/>', () => {
    const wrapper = getWrapper(navigation.CLIENT_SEARCH)
    expect(wrapper.find(SearchContainer).length).toBe(1)
  })

  it('will switch to Client when nav to navigation.SEARCH_CHILD_PROFILE/>', () => {
    const wrapper = getWrapper(navigation.SEARCH_CHILD_PROFILE)
    expect(wrapper.find(Client).length).toBe(1)
  })

  it('will switch to AssessmentContainer when nav to navigation.SEARCH_ASSESSMENT_EDIT/>', () => {
    const wrapper = getWrapper(navigation.SEARCH_ASSESSMENT_EDIT)
    expect(wrapper.find(AssessmentContainer).length).toBe(1)
  })

  it('will switch to SupervisorDashboard when nav to navigation.STAFF_LIST/>', () => {
    const wrapper = getWrapper(navigation.STAFF_LIST)
    expect(wrapper.find(SupervisorDashboard).length).toBe(1)
  })

  it('will switch to CaseLoadPage when nav to navigation.STAFF_READ/>', () => {
    const wrapper = getWrapper(navigation.STAFF_READ)
    expect(wrapper.find(CaseLoadPage).length).toBe(1)
  })

  it('will switch to Client when nav to navigation.STAFF_CHILD_PROFILE/>', () => {
    const wrapper = getWrapper(navigation.STAFF_CHILD_PROFILE)
    expect(wrapper.find(Client).length).toBe(1)
  })

  it('will switch to AssessmentContainer when nav to navigation.STAFF_ASSESSMENT_EDIT/>', () => {
    const wrapper = getWrapper(navigation.STAFF_ASSESSMENT_EDIT)
    expect(wrapper.find(AssessmentContainer).length).toBe(1)
  })

  it('will switch to null when navigateTo empty row', () => {
    const wrapper = getWrapper(undefined)
    expect(wrapper.text()).toEqual('<Row />')
  })
})
