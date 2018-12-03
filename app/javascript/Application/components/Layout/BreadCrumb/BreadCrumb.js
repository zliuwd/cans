import React from 'react'
import PropTypes from 'prop-types'

import '../style.sass'

const BreadCrumb = ({ navigationElements }) => (
  <div className="container" role="navigation">
    <div className="row">
      <div className="col-xs-7 row-padding">
        <span className={'breadcrumbs'}>
          <a href="/dashboard">DashBoard</a>{' '}
          {navigationElements.map((nav, index) => (
            <span key={index}>
              <span className={'crumbDivider'}> &gt; </span>
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
