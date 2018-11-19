import React from 'react'
import { Redirect } from 'react-router'
import { permissions } from '../util/constants'
import PropTypes from 'prop-types'

class PermissionRedirect extends React.PureComponent {
  userPermissionChk = permission => {
    const user = this.props.user
    return user && user.privileges && user.privileges.includes(permission)
  }

  render() {
    if (!this.props.user) {
      return null
    }
    if (this.userPermissionChk(permissions.SUBORDINATES_READ)) {
      return <Redirect to={'/staff'} />
    } else if (this.userPermissionChk(permissions.CLIENTS_READ)) {
      return <Redirect to={'/clients'} />
    }
    return <Redirect to={'/search'} />
  }
}

PermissionRedirect.propTypes = {
  user: PropTypes.object,
}

PermissionRedirect.defaultProps = {
  user: null,
}

export default PermissionRedirect
