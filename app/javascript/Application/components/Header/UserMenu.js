import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@cwds/components'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from '@cwds/reactstrap'
import { formatUserName } from '../../util/formatters'
import { logoutUrl } from '../../util/navigationUtil'

const logout = () => window.location.assign(logoutUrl())

const UserMenu = ({ user }) => {
  const name = user ? formatUserName(user) : 'Not Available'
  return (
    <UncontrolledDropdown>
      <DropdownToggle className="bg-transparent border-0 text-white" tag="button">
        <span className="mr-2 text-capitalize">{name}</span>
        <Avatar invert size="sm" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

UserMenu.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }),
}

UserMenu.defaultProps = {
  user: null,
}

export default UserMenu
