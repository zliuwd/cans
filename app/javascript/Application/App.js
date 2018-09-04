import React, { Fragment } from 'react';
import { PageHeader } from 'react-wood-duck';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
import { GlobalAlert } from './components/common';

import './style.sass';
import { Routes } from './routes';

const App = () => {
  const basePath = process.env.CANS_BASE_PATH || '/cans';
  return (
    <BrowserRouter basename={basePath}>
      <Fragment>
        <Header />
        <PageHeader pageTitle="CANS Assessment Application" button={null}>
          <Routes />
          <GlobalAlert />
        </PageHeader>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
