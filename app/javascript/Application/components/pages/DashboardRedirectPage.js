import React from 'react'
import PermissionRedirectBoundary from '../../routes/PermissionRedirectBoundary'
import PermissionRedirect from '../../routes/PermissionRedirect'

const DashboardRedirectPage = () => (
  <PermissionRedirectBoundary>
    <PermissionRedirect />
  </PermissionRedirectBoundary>
)

export default DashboardRedirectPage
