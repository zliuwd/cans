import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

const fetch = () => AssessmentService.getLatestInProgress()

const SearchAssessmentHistoryLoadingBoundary = props => (
  <LoadingBoundary childNodeFetchedPropName={'assessments'} fetch={fetch} isHiddenWhileLoading={false}>
    {props.children}
  </LoadingBoundary>
)

SearchAssessmentHistoryLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SearchAssessmentHistoryLoadingBoundary
