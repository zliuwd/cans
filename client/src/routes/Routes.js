import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Assessment, ClientsContainer, Client } from '../components';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/assessments" component={Assessment} />
          <Route path="/clients/:id" component={Client} />
          <Route exact path="/" component={ClientsContainer}/>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
