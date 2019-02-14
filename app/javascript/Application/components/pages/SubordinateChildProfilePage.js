import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import ChildProfilePage from './ChildProfilePage'
import { StaffLoadingBoundary } from '../Staff'

const SubordinateChildProfilePage = ({ match }) => (
  <StaffLoadingBoundary staffId={match.params.staffId}>
    <ChildProfilePage match={match} navigateTo={navigation.STAFF_CHILD_PROFILE} />
  </StaffLoadingBoundary>
)

SubordinateChildProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string.isRequired,
      clientId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default SubordinateChildProfilePage
