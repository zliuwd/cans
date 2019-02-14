import React from 'react'
import { shallow } from 'enzyme'
import { Routes } from './'
import { Route, Switch } from 'react-router-dom'
import {
  AssessmentChangelogPage,
  AssessmentPage,
  ChildListPage,
  ChildProfilePage,
  DashboardRedirectPage,
  StaffListPage,
  SubordinateAssessmentChangelogPage,
  SubordinateAssessmentPage,
  SubordinateProfilePage,
  SubordinateChildProfilePage,
} from '../components/pages'
import SearchRoutes from './SearchRoutes'

describe('<Router />', () => {
  describe('#render', () => {
    const getWrapper = () => shallow(<Routes />)
    const getLength = component => getWrapper().find(component).length
    const getRoute = path =>
      getWrapper()
        .find(Route)
        .find({ path })

    const expectExactComponent = (route, component) => {
      expect(route.exists()).toBe(true)
      expect(route.props().exact).toBe(true)
      expect(route.props().component).toBe(component)
    }

    it('renders with 1 <Switch /> component', () => {
      expect(getLength(Switch)).toBe(1)
    })

    it('renders a root route that redirects based on Role', () => {
      const route = getWrapper()
        .find(Route)
        .find({ path: '/' })
      expect(route.exists()).toBe(true)
      expect(route.props().exact).toBe(true)
      expect(route.find(DashboardRedirectPage).exists()).toBe(true)
    })

    it('renders with 1 <SearchRoutes /> component', () => {
      expect(getLength(SearchRoutes)).toBe(1)
    })

    it('renders a client list route', () => {
      expectExactComponent(getRoute('/clients'), ChildListPage)
    })

    it('renders a child profile route', () => {
      expectExactComponent(getRoute('/clients/:clientId'), ChildProfilePage)
    })

    it('renders a child assessments route', () => {
      expectExactComponent(getRoute('/clients/:clientId/assessments'), AssessmentPage)
    })

    it('renders a child assessment edit route', () => {
      expectExactComponent(getRoute('/clients/:clientId/assessments/:id'), AssessmentPage)
    })

    it('renders a supervisor dashboard route', () => {
      expectExactComponent(getRoute('/staff'), StaffListPage)
    })

    it('renders a route for staff case load pages', () => {
      expectExactComponent(getRoute('/staff/:staffId'), SubordinateProfilePage)
    })

    it('renders a route for staff access client list', () => {
      expectExactComponent(getRoute('/staff/:staffId/clients/:clientId'), SubordinateChildProfilePage)
    })

    it('renders a route for staff access assessment edit', () => {
      expectExactComponent(getRoute('/staff/:staffId/clients/:clientId/assessments/:id'), SubordinateAssessmentPage)
    })

    it('renders a route for staff access assessment add', () => {
      expectExactComponent(getRoute('/staff/:staffId/clients/:clientId/assessments/'), SubordinateAssessmentPage)
    })

    it('renders a route for supervisor to access changelog', () => {
      expectExactComponent(
        getRoute('/staff/:staffId/clients/:clientId/assessments/:id/changelog/:status'),
        SubordinateAssessmentChangelogPage
      )
    })

    it('renders a route for access changelog', () => {
      expectExactComponent(getRoute('/clients/:clientId/assessments/:id/changelog/:status'), AssessmentChangelogPage)
    })
  })
})
