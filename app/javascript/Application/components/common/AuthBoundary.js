import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from './LoadingBoundary'
import SecurityService from './Security.service'

const permissionsCache = new Map()

class AuthBoundary extends React.PureComponent {
/*
  isDisabled = (permission, andCondition, orCondition) => {
    return SecurityService.checkPermission(permission).then(
      isAuthorized => !((isAuthorized && andCondition) || orCondition)
    )
  }*/

  clearCache = () => {
    permissionsCache.clear()
  }

  isDisabled = permission => {
    if (!this.props.andCondition) {
      return Promise.resolve(true)
    }

    if (this.props.orCondition) {
      return Promise.resolve(false)
    }

    const cachedAuthResult = permissionsCache.get(permission)
    if (cachedAuthResult !== undefined) {
      return Promise.resolve(!cachedAuthResult)
    }

    return SecurityService.checkPermission(permission).then(isAuthorized => {
      permissionsCache.set(permission, isAuthorized)
      return !isAuthorized
    })
  }

/*
  isDisabled = permission => {
    return Promise.resolve(false)
  }
*/

  render() {
    const { children, permission, andCondition, orCondition } = this.props
    return (
      <LoadingBoundary
        childNodeFetchedPropName={'disabled'}
        fetch={() => this.isDisabled(permission)}
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

const buildCompleteAssessmentPermission = assessment => {
  let permission
  if (assessment && assessment.id !== null && assessment.id !== undefined) {
    permission = `assessment:complete:${assessment.id}`
  } else if (assessment && assessment.person !== null && assessment.person !== undefined) {
    permission = `client:completeAssessment:${assessment.person.identifier}`
  }
  return permission
}

export default AuthBoundary
export { buildCreateAssessmentPermission, buildCompleteAssessmentPermission }
