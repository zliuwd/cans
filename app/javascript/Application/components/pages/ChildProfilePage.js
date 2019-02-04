import React from 'react'
import PropTypes from 'prop-types'
import CurrentUserLoadingBoundary from './CurrentUserLoadingBoundary'
import { navigation } from '../../util/constants'
import BreadCrumbsBuilder from '../Layout/BreadCrumb/BreadCrumbsBuilder'
import { Client } from '../Client'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import ReactWoodDuckLayout from '../Layout/ReactWoodDuckLayout'

const navigateTo = navigation.CHILD_PROFILE

const ChildProfilePage = ({ client, match }) => {
  const breadcrumb = (
    <CurrentUserLoadingBoundary>
      <BreadCrumbsBuilder navigateTo={navigateTo} client={client} />
    </CurrentUserLoadingBoundary>
  )

  return (
    <ReactWoodDuckLayout breadcrumb={breadcrumb} navigateTo={navigateTo} rightButton={<SearchClientsButton />}>
      <Client navigateTo={navigateTo} client={client} match={match} />
    </ReactWoodDuckLayout>
  )
}

ChildProfilePage.propTypes = {
  client: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

ChildProfilePage.defaultProps = {
  client: null,
}

export default ChildProfilePage
