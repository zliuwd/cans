import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from './LoadingBoundary'
import SecurityService from './Security.service'

class AuthBoundary extends React.PureComponent {
  disabled = permission => {
    return SecurityService.checkPermission(permission).then(isAuthorized => !isAuthorized)
  }

  render() {
    const { children, permission } = this.props
    return (
      <LoadingBoundary
        childNodeFetchedPropName={'disabled'}
        fetch={() => this.disabled(permission)}
        isHiddenWhileLoading={true}
      >
        {children}
      </LoadingBoundary>
    )
  }
}

AuthBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  permission: PropTypes.string.isRequired,
}

const buildCreateAssessmentPermission = clientIdentifier => {
  return `client:createAssessment:${clientIdentifier}`
}

export default AuthBoundary
export { buildCreateAssessmentPermission }
