import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../index'

const fetchBoth = id => {
  const changeHistoryPromise = AssessmentService.getAllChanges(id)
  const assessmentPromise = AssessmentService.fetch(id)
  return Promise.all([changeHistoryPromise, assessmentPromise]).then(([changeHistory, assessment]) => ({
    changeHistory,
    assessment,
  }))
}

const ChangeLogLoadingBoundary = ({ id, children }) => (
  <LoadingBoundary childNodeFetchedPropName={'assessmentWithHistory'} fetch={() => fetchBoth(id)}>
    {children}
  </LoadingBoundary>
)

ChangeLogLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default ChangeLogLoadingBoundary
