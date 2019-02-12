import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import AssessmentChangelogPageInner from './AssessmentChangelogPageInner'
import ClientLoadingBoundary from './ClientLoadingBoundary'

const AssessmentChangelogPage = ({ match, navigateTo, staffInfo }) => (
  <ClientLoadingBoundary clientId={match.params.clientId}>
    <AssessmentChangelogPageInner match={match} navigateTo={navigateTo} staffInfo={staffInfo} />
  </ClientLoadingBoundary>
)

AssessmentChangelogPage.propTypes = {
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

AssessmentChangelogPage.defaultProps = {
  staffInfo: null,
  navigateTo: navigation.ASSESSMENT_CHANGELOG,
}

export default AssessmentChangelogPage
