import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../index'

const ChangeLogLoadingBoundary = ({ id, children }) => (
  <LoadingBoundary childNodeFetchedPropName={'changeHistory'} fetch={() => AssessmentService.getAllChanges(id)}>
    {children}
  </LoadingBoundary>
)

ChangeLogLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default ChangeLogLoadingBoundary
