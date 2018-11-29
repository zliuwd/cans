import React from 'react'
import { Button } from '@cwds/components'
import { Link } from 'react-router-dom'

import './style.sass'

const buildButton = (caption, icon, callback, isEnabled = true) => (
  <Button color={'primary'} className={'header-button'} onClick={callback} disabled={!isEnabled}>
    <i className={`header-button-icon fa ${icon}`} />
    <span className={'header-button-caption'}>{caption}</span>
  </Button>
)

const searchClientsButton = (
  <Link to={'/search'} id={'search-link'}>
    {buildButton('Client Search', 'fa-search')}
  </Link>
)

export const buildSaveAssessmentButton = (onButtonClick, isEnabled) =>
  buildButton('Save', 'fa-save', onButtonClick, isEnabled)

export const buildPrintAssessmentButton = onButtonClick => buildButton('Print', 'fa-print', onButtonClick)

export const buildSearchClientsButton = () => searchClientsButton
