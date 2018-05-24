import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Assessment } from '../components/Assessment';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/assessment" component={Assessment} />
      </Router>
    );
  }
}

export default Routes;
