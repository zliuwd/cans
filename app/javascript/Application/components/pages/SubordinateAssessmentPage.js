import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import AssessmentPage from './AssessmentPage'
import { StaffLoadingBoundary } from '../Staff'

const SubordinateAssessmentPage = ({ match, ...props }) => {
  const navigateTo = match.params.id ? navigation.STAFF_ASSESSMENT_EDIT : navigation.STAFF_ASSESSMENT_ADD
  return (
    <StaffLoadingBoundary staffId={match.params.staffId}>
      <AssessmentPage match={match} navigateTo={navigateTo} {...props} />
    </StaffLoadingBoundary>
  )
}

SubordinateAssessmentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string.isRequired,
      clientId: PropTypes.string.isRequired,
      id: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default SubordinateAssessmentPage
