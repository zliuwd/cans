import React from 'react'
import PropTypes from 'prop-types'
import UserAccountService from '../components/common/UserAccountService'
import LoadingBoundary from '../components/common/LoadingBoundary'

const PermissionRedirectBoundary = ({ children }) => (
  <LoadingBoundary childNodeFetchedPropName={'user'} fetch={() => UserAccountService.fetchCurrent()}>
    {children}
  </LoadingBoundary>
)

PermissionRedirectBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PermissionRedirectBoundary
