import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Assessment, ClientsContainer, Client } from '../components';
import { ChildForm } from '../components/ChildForm';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/assessments" component={Assessment} />
          <Route exact path="/clients/new" component={ChildForm} />
          <Route path="/clients/:id" component={Client} />
          <Route exact path="/" component={ClientsContainer}/>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
