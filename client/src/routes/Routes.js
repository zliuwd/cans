import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Assessment } from '../components/Assessment';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/assessment" component={Assessment} />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
