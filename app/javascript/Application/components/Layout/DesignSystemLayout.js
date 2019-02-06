import React from 'react'
import PropTypes from 'prop-types'
import { Page, Utils } from '@cwds/components'
import { navigation } from '../../util/constants'
import CurrentUserLoadingBoundary from '../pages/CurrentUserLoadingBoundary'
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

const DesignSystemLayout = ({ breadcrumb, children, navigateTo, rightButton }) => {
  const title =
    navigateTo === navigation.ASSESSMENT_ADD || navigateTo === navigation.ASSESSMENT_EDIT
      ? 'CANS Communimetric Assessment Form'
      : 'CANS Assessment Application'

  return (
    <CaresProvider value={contextConfig}>
      <Page breadcrumb={breadcrumb} title={title} main={() => children} cta={() => rightButton} />
    </CaresProvider>
  )
}

DesignSystemLayout.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.node,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  rightButton: PropTypes.node,
}

DesignSystemLayout.defaultProps = {
  breadcrumb: null,
  children: null,
  rightButton: null,
}

export default DesignSystemLayout
