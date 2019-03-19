import React from 'react'
import PropTypes from 'prop-types'
import { CaresProvider, Page } from '@cwds/components'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { GlobalAlert } from '../common'
import UserMenu from '../Header/UserMenu'
import Sticker from 'react-stickyfill'
import { BRAND_NAME } from '../../util/constants'

const appBarUserMenu = (
  <CurrentUserLoadingBoundary>
    <UserMenu />
  </CurrentUserLoadingBoundary>
)

const FullWidthLayout = ({ breadcrumb, children, pageTitle, leftButton, rightButton }) => {
  const buttons = (
    <React.Fragment>
      {leftButton}
      {rightButton}
    </React.Fragment>
  )

  const main = (
    <React.Fragment>
      <Sticker>
        <div className="page-alerts">
          <GlobalAlert />
          <GlobalAlert id={'infoMessages'} />
        </div>
      </Sticker>
      {children}
    </React.Fragment>
  )
  return (
    <CaresProvider UserMenu={appBarUserMenu} Brand={BRAND_NAME}>
      <Page Breadcrumb={breadcrumb} title={pageTitle} main={main} PageActions={() => buttons} />
    </CaresProvider>
  )
}

FullWidthLayout.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.node,
  leftButton: PropTypes.node,
  pageTitle: PropTypes.string,
  rightButton: PropTypes.node,
}

FullWidthLayout.defaultProps = {
  breadcrumb: null,
  leftButton: null,
  children: null,
  pageTitle: 'CANS Assessment Application',
  rightButton: null,
}

export default FullWidthLayout
