import React, { Component, Fragment } from 'react';
import { GlobalHeader, PageHeader } from 'react-wood-duck';
import { Page } from './components/Layout';
import { BrowserRouter } from 'react-router-dom'

import './style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <GlobalHeader profileName="Username" profileId="profile.id"/>
          <PageHeader pageTitle="CANS Assessment Application" button={null}/>
          <Page/>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
