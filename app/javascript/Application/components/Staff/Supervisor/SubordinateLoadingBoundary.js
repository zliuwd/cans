import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import SubordinateService from './Subordinate.service'

const SubordinateLoadingBoundary = ({ children }) => (
  <LoadingBoundary childNodeFetchedPropName="staff" fetch={SubordinateService.fetch}>
    {children}
  </LoadingBoundary>
)

SubordinateLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubordinateLoadingBoundary
