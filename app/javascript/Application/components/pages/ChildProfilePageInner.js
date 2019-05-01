import React from 'react'
import PropTypes from 'prop-types'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { Client } from '../Client'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

class ChildProfilePageInner extends React.Component {
  constructor(props) {
    super()
    this.state = {}
  }

  setPrintButton = printButton => this.setState({ printButton })

  headerController = {
    setPrintButton: this.setPrintButton,
  }

  render() {
    const { client, match, navigateTo, staffInfo } = this.props
    const { printButton } = this.state
    return (
      <FullWidthLayout
        breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} client={client} subordinate={staffInfo} />}
        leftButton={<SearchClientsButton />}
        rightButton={printButton}
      >
        {client && (
          <Client navigateTo={navigateTo} client={client} match={match} headerController={this.headerController} />
        )}
      </FullWidthLayout>
    )
  }
}

ChildProfilePageInner.propTypes = {
  client: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.any.isRequired,
  staffInfo: PropTypes.object,
}

ChildProfilePageInner.defaultProps = {
  client: null,
  staffInfo: null,
}

export default ChildProfilePageInner
