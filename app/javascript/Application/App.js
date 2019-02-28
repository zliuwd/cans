import React, { Fragment } from 'react'
import { Router } from 'react-router-dom'
import { Routes } from './routes'
import TimeoutWarning from './components/common/TimeoutWarning'
import './style.sass'
import pageLockService from './components/common/PageLockService'
import { basePath } from './util/common'

const App = () => {
  return (
    <Router basename={basePath} history={pageLockService.history}>
      <Fragment>
        <TimeoutWarning />
        <Routes />
      </Fragment>
    </Router>
  )
}

export default App
