/* eslint-disable react/no-multi-comp,react/no-children-prop */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  SearchAssessmentChangelogPage,
  SearchAssessmentPage,
  SearchChildProfilePage,
  SearchPage,
} from '../components/pages'

const SearchRoutes = () => {
  return (
    <Switch>
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/search/clients/:clientId/assessments/:id" component={SearchAssessmentPage} />
      <Route
        exact
        path="/search/clients/:clientId/assessments/:id/changelog/:status"
        component={SearchAssessmentChangelogPage}
      />
      <Route exact path="/search/clients/:clientId/assessments" component={SearchAssessmentPage} />
      <Route exact path="/search/clients/:clientId" component={SearchChildProfilePage} />
    </Switch>
  )
}

export default SearchRoutes
