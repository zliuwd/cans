import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import ChildProfilePageInner from './ChildProfilePageInner'
import ClientLoadingBoundary from './ClientLoadingBoundary'

const ChildProfilePage = ({ match, navigateTo, staffInfo }) => (
  <ClientLoadingBoundary clientId={match.params.clientId}>
    <ChildProfilePageInner match={match} navigateTo={navigateTo} staffInfo={staffInfo} />
  </ClientLoadingBoundary>
)

ChildProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string,
      clientId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.any,
  staffInfo: PropTypes.any,
}

ChildProfilePage.defaultProps = {
  staffInfo: null,
  navigateTo: navigation.CHILD_PROFILE,
}

export default ChildProfilePage
