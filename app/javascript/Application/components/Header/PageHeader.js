import React from 'react'
import PropTypes from 'prop-types'
import Sticker from 'react-stickyfill'
import { PageHeader as WoodDuckHeader } from 'react-wood-duck'
import { GlobalAlert } from '../common'
import { navigation } from '../../util/constants'

import './style.sass'

const determinePageTitle = navigateTo =>
  navigateTo === navigation.ASSESSMENT_ADD || navigateTo === navigation.ASSESSMENT_EDIT
    ? 'CANS Communimetric Assessment Form'
    : 'CANS Assessment Application'

const PageHeader = ({ navigateTo, leftButton, rightButton }) => {
  const buttons = (
    <div className={'header-buttons-block'}>
      {leftButton}
      {rightButton}
    </div>
  )
  return (
    <Sticker>
      <div role="contentinfo" className="sticky page-header-container">
        <WoodDuckHeader pageTitle={determinePageTitle(navigateTo)} button={buttons}>
          <GlobalAlert />
        </WoodDuckHeader>
      </div>
    </Sticker>
  )
}

PageHeader.propTypes = {
  leftButton: PropTypes.node,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  rightButton: PropTypes.node,
}

PageHeader.defaultProps = {
  leftButton: null,
  rightButton: null,
}

export default PageHeader
