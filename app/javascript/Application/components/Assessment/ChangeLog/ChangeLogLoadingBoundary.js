import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import AssessmentService from '../Assessment.service'

class ChangeLogLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ id: propsId }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () => AssessmentService.getAllChanges(propsId),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'assessmentHistory'} fetch={this.state.fetch}>
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

ChangeLogLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

export default ChangeLogLoadingBoundary
