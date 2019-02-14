import React from 'react'
import PropTypes from 'prop-types'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { Client } from '../Client'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

const ChildProfilePageInner = ({ client, match, navigateTo, staffInfo }) => (
  <FullWidthLayout
    breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} client={client} subordinate={staffInfo} />}
    navigateTo={navigateTo}
    rightButton={<SearchClientsButton />}
  >
    {client && <Client navigateTo={navigateTo} client={client} match={match} />}
  </FullWidthLayout>
)

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
