import React from 'react'
import { shallow } from 'enzyme'
import { Route } from 'react-router-dom'
import {
  SearchAssessmentChangelogPage,
  SearchAssessmentPage,
  SearchChildProfilePage,
  SearchPage,
} from '../components/pages'
import SearchRoutes from './SearchRoutes'

describe('#render', () => {
  const getWrapper = () => shallow(<SearchRoutes />)

  const getRoute = path =>
    getWrapper()
      .find(Route)
      .find({ path })

  const expectExactComponent = (route, component) => {
    expect(route.exists()).toBe(true)
    expect(route.props().exact).toBe(true)
    expect(route.props().component).toBe(component)
  }

  it('renders a search route', () => {
    expectExactComponent(getRoute('/search'), SearchPage)
  })

  it('renders route when use search to access assessment edit', () => {
    expectExactComponent(getRoute('/search/clients/:clientId/assessments/:id'), SearchAssessmentPage)
  })

  it('renders route when use search to access assessment add', () => {
    expectExactComponent(getRoute('/search/clients/:clientId/assessments'), SearchAssessmentPage)
  })

  it('renders route when use search to access client list', () => {
    expectExactComponent(getRoute('/search/clients/:clientId'), SearchChildProfilePage)
  })

  it('renders a route when use search to access changelog', () => {
    expectExactComponent(
      getRoute('/search/clients/:clientId/assessments/:id/changelog/:status'),
      SearchAssessmentChangelogPage
    )
  })
})
