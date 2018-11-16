import React from 'react'
import { Redirect } from 'react-router'
import UserAccountService from '../components/common/UserAccountService'
import { LoadingState } from '../util/loadingHelper'
import { permissions } from '../util/constants'

class PermissionRedirect extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      loadingState: LoadingState.updating,
      user: null,
    }
  }
  async componentDidMount() {
    const user = await UserAccountService.fetchCurrent()
    this.setState({
      loadingState: LoadingState.ready,
      user,
    })
  }

  userPermissionChk = permission => {
    const { user } = this.state
    return user && user.privileges && user.privileges.includes(permission)
  }

  render() {
    const { loadingState } = this.state

    if (loadingState !== LoadingState.ready && loadingState !== LoadingState.error) {
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

export default PermissionRedirect
