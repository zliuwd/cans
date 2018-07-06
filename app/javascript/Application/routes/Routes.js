import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AssessmentContainer, Client, ClientsContainer } from '../components';
import { ChildForm } from '../components/ChildForm';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/clients/:childId/assessments/:id?" component={AssessmentContainer} />
        <Route exact path="/clients/new" component={ChildForm} />
        <Route path="/clients/:id" component={Client} />
        <Route exact path="/" component={ClientsContainer} />
      </Switch>
    );
  }
}

export default Routes;
