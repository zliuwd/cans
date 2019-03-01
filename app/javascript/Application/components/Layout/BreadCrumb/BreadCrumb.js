import React from 'react'
import PropTypes from 'prop-types'
import '../style.sass'
import ExternalLink from '../../common/ExternalLink'

const BreadCrumb = ({ navigationElements }) => (
  <span className={'breadcrumbs'}>
    <ExternalLink href={'/dashboard'} text={'Dashboard'} />{' '}
    {navigationElements.map((nav, index) => (
      <span key={index}>
        <span className={'crumb-divider'}> &gt; </span>
        <span>{nav}</span>
      </span>
    ))}
  </span>
)

BreadCrumb.propTypes = {
  navigationElements: PropTypes.array,
}

BreadCrumb.defaultProps = {
  navigationElements: [],
}

export default BreadCrumb
