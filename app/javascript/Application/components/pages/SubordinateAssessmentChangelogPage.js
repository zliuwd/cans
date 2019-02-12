import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import AssessmentChangelogPage from './AssessmentChangelogPage'
import { StaffLoadingBoundary } from '../Staff'

const SubordinateAssessmentChangelogPage = ({ match }) => (
  <StaffLoadingBoundary staffId={match.params.staffId}>
    <AssessmentChangelogPage match={match} navigateTo={navigation.STAFF_CHANGELOG} />
  </StaffLoadingBoundary>
)

SubordinateAssessmentChangelogPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string.isRequired,
      clientId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default SubordinateAssessmentChangelogPage
