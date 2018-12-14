import React from 'react'
import PropTypes from 'prop-types'
import StaffService from '../../Staff.service'
import LoadingBoundary from '../../../common/LoadingBoundary'

const StaffLoadingBoundary = ({ staffId, children }) => (
  <LoadingBoundary
    childNodeFetchedPropName={'staffInfo'}
    fetch={() => StaffService.fetch(staffId)}
    isHiddenWhileLoading={false}
  >
    {children}
  </LoadingBoundary>
)

StaffLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  staffId: PropTypes.string.isRequired,
}

export default StaffLoadingBoundary
