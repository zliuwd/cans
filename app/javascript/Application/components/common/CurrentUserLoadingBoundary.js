import React from 'react'
import PropTypes from 'prop-types'
import UserAccountService from './UserAccountService'
import LoadingBoundary from './LoadingBoundary'

const fetch = () => UserAccountService.fetchCurrent()

const CurrentUserLoadingBoundary = ({ children }) => (
  <LoadingBoundary childNodeFetchedPropName="user" fetch={fetch}>
    {children}
  </LoadingBoundary>
)

CurrentUserLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CurrentUserLoadingBoundary
