import React from 'react'
import { Redirect } from 'react-router'
import { dashboards } from '../util/constants'
import { userDashboardChecker } from '../util/userDashboardChecker'
import PropTypes from 'prop-types'

class PermissionRedirect extends React.PureComponent {
  render() {
    const user = this.props.user
    if (!user) {
      return null
    }
    switch (userDashboardChecker(user)) {
      case dashboards.STAFF_LIST:
        return <Redirect to={'/staff'} />
      case dashboards.CHILD_LIST:
        return <Redirect to={'/clients'} />
      default:
        return <Redirect to={'/search'} />
    }
  }
}

PermissionRedirect.propTypes = {
  user: PropTypes.object,
}

PermissionRedirect.defaultProps = {
  user: null,
}

export default PermissionRedirect
