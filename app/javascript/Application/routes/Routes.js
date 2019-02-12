/* eslint-disable react/no-multi-comp,react/no-children-prop */
import React from 'react'
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

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DashboardRedirectPage />
      </Route>
      <Route exact path="/clients" component={ChildListPage} />
      <Route exact path="/clients/:clientId" component={ChildProfilePage} />
      <Route exact path="/clients/:clientId/assessments" component={AssessmentPage} />
      <Route exact path="/clients/:clientId/assessments/:id" component={AssessmentPage} />
      <Route exact path="/staff" component={StaffListPage} />
      <Route exact path="/staff/:staffId" component={SubordinateProfilePage} />
      <Route exact path="/staff/:staffId/clients/:clientId" component={SubordinateChildProfilePage} />
      <Route exact path="/staff/:staffId/clients/:clientId/assessments/" component={SubordinateAssessmentPage} />
      <Route exact path="/staff/:staffId/clients/:clientId/assessments/:id" component={SubordinateAssessmentPage} />
      <Route
        exact
        path="/staff/:staffId/clients/:clientId/assessments/:id/changelog/:status"
        component={SubordinateAssessmentChangelogPage}
      />

      <Route exact path="/clients/:clientId/assessments/:id/changelog/:status" component={AssessmentChangelogPage} />
      <SearchRoutes />
    </Switch>
  )
}

export default Routes
