import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from './LoadingBoundary'
import SecurityService from './Security.service'

class AuthBoundary extends React.PureComponent {
  isDisabled = (permission, andCondition, orCondition) => {
    return SecurityService.checkPermission(permission).then(
      isAuthorized => !((isAuthorized && andCondition) || orCondition)
    )
  }

  render() {
    const { children, permission, andCondition, orCondition } = this.props
    return (
      <LoadingBoundary
        childNodeFetchedPropName={'disabled'}
        fetch={() => this.isDisabled(permission, andCondition, orCondition)}
        isHiddenWhileLoading={true}
        eagerRefreshFlagObject={{ andCondition, orCondition }}
      >
        {children}
      </LoadingBoundary>
    )
  }
}

AuthBoundary.propTypes = {
  andCondition: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.node.isRequired,
  orCondition: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  permission: PropTypes.string.isRequired,
}

AuthBoundary.defaultProps = {
  andCondition: true,
  orCondition: false,
}

const buildCreateAssessmentPermission = clientIdentifier => {
  return `client:createAssessment:${clientIdentifier}`
}

const buildCompleteAssessmentPermission = clientIdentifier => {
  return `client:completeAssessment:${clientIdentifier}`
}

export default AuthBoundary
export { buildCreateAssessmentPermission, buildCompleteAssessmentPermission }
