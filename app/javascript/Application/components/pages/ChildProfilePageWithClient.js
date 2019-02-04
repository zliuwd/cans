import React from 'react'
import PropTypes from 'prop-types'
import ChildProfilePage from './ChildProfilePage'
import ClientLoadingBoundary from './ClientLoadingBoundary'

const ChildProfilePageWithClient = ({ match }) => (
  <ClientLoadingBoundary clientId={match.params.clientId}>
    <ChildProfilePage match={match} />
  </ClientLoadingBoundary>
)
ChildProfilePageWithClient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string,
      clientId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default ChildProfilePageWithClient
