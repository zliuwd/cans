import React from 'react'
import PropTypes from 'prop-types'
import StaffService from '../../Staff.service'
import LoadingBoundary from '../../../common/LoadingBoundary'

class StaffLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ staffId: propsId }, { staffId: stateId }) {
    if (propsId !== stateId) {
      return {
        staffId: propsId,
        fetch: () => StaffService.fetch(propsId),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'staffInfo'} fetch={this.state.fetch}>
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

StaffLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  staffId: PropTypes.string.isRequired,
}

export default StaffLoadingBoundary
