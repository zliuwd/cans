import React, { Fragment } from 'react';
import { PageHeader } from 'react-wood-duck';
import Header from './components/Header';
import { Page } from './components/Layout';
import { BrowserRouter } from 'react-router-dom';

import './style.sass';

const App = () => {
  const basePath = process.env.CANS_BASE_PATH || '/cans';
  return (
    <BrowserRouter basename={basePath}>
      <Fragment>
        <Header />
        <PageHeader pageTitle="CANS Assessment Application" button={null} />
        <Page />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
