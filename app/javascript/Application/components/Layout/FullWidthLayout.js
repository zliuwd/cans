import React from 'react'
import PropTypes from 'prop-types'
import { Page, Utils } from '@cwds/components'
import { navigation } from '../../util/constants'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { GlobalAlert } from '../common'
import UserMenu from '../Header/UserMenu'

import './rwd_overrides.sass'

const { CaresProvider, defaultConfig } = Utils
const id = x => x

const appBarUserMenu = (
  <CurrentUserLoadingBoundary>
    <UserMenu />
  </CurrentUserLoadingBoundary>
)

const contextConfig = {
  ...defaultConfig,
  appBarUserMenu: () => appBarUserMenu,
  breadcrumbRenderer: id,
}

const FullWidthLayout = ({ breadcrumb, children, leftButton, navigateTo, rightButton }) => {
  const title =
    navigateTo === navigation.ASSESSMENT_ADD || navigateTo === navigation.ASSESSMENT_EDIT
      ? 'CANS Communimetric Assessment Form'
      : 'CANS Assessment Application'

  const buttons = (
    <React.Fragment>
      {leftButton}
      {rightButton}
    </React.Fragment>
  )

  const main = (
    <React.Fragment>
      <GlobalAlert />
      <GlobalAlert id={'infoMessages'} /> {children}
    </React.Fragment>
  )
  return (
    <CaresProvider value={contextConfig}>
      <Page breadcrumb={breadcrumb} title={title} main={main} cta={() => buttons} />
    </CaresProvider>
  )
}

FullWidthLayout.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.node,
  leftButton: PropTypes.node,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  rightButton: PropTypes.node,
}

FullWidthLayout.defaultProps = {
  breadcrumb: null,
  leftButton: null,
  children: null,
  rightButton: null,
}

export default FullWidthLayout
