import React from 'react'
import PropTypes from 'prop-types'
import SubordinateProfilePageInner from './SubordinateProfilePageInner'
import { StaffLoadingBoundary } from '../Staff'

const SubordinateProfilePage = ({ match }) => (
  <StaffLoadingBoundary staffId={match.params.staffId}>
    <SubordinateProfilePageInner />
  </StaffLoadingBoundary>
)
SubordinateProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SubordinateProfilePage
