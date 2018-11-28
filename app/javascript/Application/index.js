import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { timeoutService } from './util/TimeoutService'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@cwds/core/dist/styles.css'
import 'react-wood-duck/dist/styles/application.css'
import 'react-widgets/dist/css/react-widgets.css'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('root')
  const data = JSON.parse(node.getAttribute('data'))
  render(<App {...data} />, node)
})

timeoutService.run()
