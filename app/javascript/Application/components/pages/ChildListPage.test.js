import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import ChildListPage from './ChildListPage'
import { CurrentUserCaseLoadPage } from '../Staff'
import CurrentUserLoadingBoundary from './CurrentUserLoadingBoundary'
import BreadCrumbsBuilder from '../Layout/BreadCrumb/BreadCrumbsBuilder'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import VisitLogger from './VisitLogger'
import ReactWoodDuckLayout from '../Layout/ReactWoodDuckLayout'

describe('Child List Page', () => {
  const render = () => shallow(<ChildListPage />)

  it('renders a body of CurrentUserCaseLoadPage', () => {
    const body = render().find(ReactWoodDuckLayout)
    expect(body.find(CurrentUserCaseLoadPage).exists()).toBe(true)
  })

  it('renders a breadcrumb with current user info', () => {
    const breadcrumbElement = render()
      .find(ReactWoodDuckLayout)
      .props().breadcrumb
    expect(breadcrumbElement.type).toBe(CurrentUserLoadingBoundary)
    const breadcrumb = breadcrumbElement.props.children
    expect(breadcrumb.type).toBe(BreadCrumbsBuilder)
    expect(breadcrumb.props.navigateTo).toBe(navigation.CHILD_LIST)
  })

  it('renders a Search button', () => {
    const layout = render().find(ReactWoodDuckLayout)
    expect(layout.props().rightButton.type).toBe(SearchClientsButton)
  })

  it('logs the dashboard visit to NewRelic', () => {
    const page = render()
    expect(page.find(VisitLogger).exists()).toBe(true)
  })
})
