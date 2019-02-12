import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import AssessmentPageInner from './AssessmentPageInner'
import ClientLoadingBoundary from './ClientLoadingBoundary'

const AssessmentPage = ({ match, navigateTo, ...props }) => {
  const navTo = navigateTo || (match.params.id ? navigation.ASSESSMENT_EDIT : navigation.ASSESSMENT_ADD)
  return (
    <ClientLoadingBoundary clientId={match.params.clientId}>
      <AssessmentPageInner match={match} navigateTo={navTo} {...props} />
    </ClientLoadingBoundary>
  )
}
AssessmentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string.isRequired,
      id: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string,
}

AssessmentPage.defaultProps = {
  navigateTo: null,
}

export default AssessmentPage
