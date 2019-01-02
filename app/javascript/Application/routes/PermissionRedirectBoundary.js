import React from 'react'
import PropTypes from 'prop-types'
import UserAccountService from '../components/common/UserAccountService'
import LoadingBoundary from '../components/common/LoadingBoundary'

const fetch = () => UserAccountService.fetchCurrent()

const PermissionRedirectBoundary = ({ children }) => (
  <LoadingBoundary childNodeFetchedPropName={'user'} fetch={fetch}>
    {children}
  </LoadingBoundary>
)

PermissionRedirectBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PermissionRedirectBoundary
