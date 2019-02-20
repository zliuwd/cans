import React from 'react'
import PropTypes from 'prop-types'

import '../style.sass'
import { disableUnsavedValidation } from '../../Assessment/AssessmentHelper'

export const breadCrumbOnClickHandler = {
  onClick: event => {},
}

export const onBreadCrumbClick = event => {
  disableUnsavedValidation()
  breadCrumbOnClickHandler.onClick(event)
}

const BreadCrumb = ({ navigationElements }) => (
  <div className="container" role="navigation">
    <div className="row">
      <div className="col-xs-7 row-padding">
        <span className={'breadcrumbs'}>
          <a onClick={onBreadCrumbClick} href="/dashboard">
            Dashboard
          </a>{' '}
          {navigationElements.map((nav, index) => (
            <span key={index}>
              <span className={'crumb-divider'}> &gt; </span>
              <span>{nav}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  </div>
)

BreadCrumb.propTypes = {
  navigationElements: PropTypes.array,
}

BreadCrumb.defaultProps = {
  navigationElements: [],
}

export default BreadCrumb
