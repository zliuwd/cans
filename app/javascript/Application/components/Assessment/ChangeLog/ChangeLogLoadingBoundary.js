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

class ChangeLogLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ id: propsId }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () => fetchBoth(propsId),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'assessmentWithHistory'} fetch={this.state.fetch}>
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
