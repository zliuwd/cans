import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { permissions } from './constants'
import UserFeaturesContext from './UserFeaturesContext'

const checkPrivilege = (user, permission) => Boolean(user.privileges && user.privileges.includes(permission))

class UserFeatures extends PureComponent {
  state = { userFeatures: null }

  static getDerivedStateFromProps({ user }) {
    if (user !== null && user !== undefined) {
      return {
        userFeatures: {
          reassessment: checkPrivilege(user, permissions.REASSESSMENT_CREATE),
        },
      }
    }
    return null
  }

  render() {
    const userFeatures = this.state.userFeatures
    return (
      userFeatures && (
        <UserFeaturesContext.Provider value={userFeatures}>{this.props.children}</UserFeaturesContext.Provider>
      )
    )
  }
}

UserFeatures.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
}

UserFeatures.defaultProps = {
  user: null,
}

export default UserFeatures
