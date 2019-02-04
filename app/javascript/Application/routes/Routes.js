/* eslint-disable react/no-multi-comp,react/no-children-prop */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { navigation } from '../util/constants'
import { Page } from '../components/Layout'
import { ChildListPage, ChildProfilePageWithClient, DashboardRedirectPage } from '../components/pages'
import SearchRoutes from './SearchRoutes'

const page = (route, navigateTo) => <Page navigateTo={navigateTo} {...route} />

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DashboardRedirectPage />
      </Route>
      <Route exact path="/clients" component={ChildListPage} />
      <Route exact path="/clients/:clientId" component={ChildProfilePageWithClient} />
      <Route exact path="/clients/:clientId/assessments" children={route => page(route, navigation.ASSESSMENT_ADD)} />
      <Route
        exact
        path="/clients/:clientId/assessments/:id"
        children={route => page(route, navigation.ASSESSMENT_EDIT)}
      />

      <Route exact path="/staff" children={route => page(route, navigation.STAFF_LIST)} />
      <Route exact path="/staff/:staffId" children={route => page(route, navigation.STAFF_READ)} />
      <Route
        exact
        path="/staff/:staffId/clients/:clientId"
        children={route => page(route, navigation.STAFF_CHILD_PROFILE)}
      />
      <Route
        exact
        path="/staff/:staffId/clients/:clientId/assessments/"
        children={route => page(route, navigation.STAFF_ASSESSMENT_ADD)}
      />
      <Route
        exact
        path="/staff/:staffId/clients/:clientId/assessments/:id"
        children={route => page(route, navigation.STAFF_ASSESSMENT_EDIT)}
      />
      <Route
        exact
        path="/staff/:staffId/clients/:clientId/assessments/:id/changelog/:status"
        children={route => page(route, navigation.STAFF_CHANGELOG)}
      />

      <Route
        exact
        path="/clients/:clientId/assessments/:id/changelog/:status"
        children={route => page(route, navigation.ASSESSMENT_CHANGELOG)}
      />
      <SearchRoutes />
    </Switch>
  )
}

export default Routes
