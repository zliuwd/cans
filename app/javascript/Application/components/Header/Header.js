import React from 'react'
import PropTypes from 'prop-types'
import { GlobalHeader } from 'react-wood-duck'
import { formatUserName } from '../../util/formatters'
import { logoutUrl } from '../../util/navigationUtil'
import UserAccountService from '../common/UserAccountService'
import { Icon } from '@cwds/components'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      staffId: '',
    }
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = () => {
    return UserAccountService.fetchCurrent()
      .then(this.onFetchSuccess)
      .catch(() => {})
  }

  onFetchSuccess = staffPerson => {
    this.updateName(staffPerson)
    this.invokeCallback(staffPerson.staff_id)
  }

  updateName = staffPerson => {
    const userName = formatUserName(staffPerson)
    this.setState({
      userName,
      staffId: staffPerson.staff_id,
    })
  }

  invokeCallback = staffId => {
    const { onUserFetchedCallback } = this.props
    if (onUserFetchedCallback) {
      onUserFetchedCallback(staffId)
    }
  }

  logout() {
    window.location.href = logoutUrl()
  }

  render = () => {
    const { userName, staffId } = this.state
    return (
      <GlobalHeader
        profileName={userName}
        profileId={staffId}
        profileAvatar={<Icon name="user" color="white" />}
        logoutCallback={this.logout}
      />
    )
  }
}

Header.propTypes = {
  /** callback to be invoked when user info is successfully fetched,
   * should accept staffId as a parameter */
  onUserFetchedCallback: PropTypes.func,
}

Header.defaultProps = {
  onUserFetchedCallback: null,
}

export default Header
