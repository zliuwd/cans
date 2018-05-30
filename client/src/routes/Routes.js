import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Assessment, ClientsContainer } from '../components';

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={ClientsContainer}/>
        <Route exact path="/assessments" component={Assessment}/>
      </Fragment>
    );
  }
}

export default Routes;
