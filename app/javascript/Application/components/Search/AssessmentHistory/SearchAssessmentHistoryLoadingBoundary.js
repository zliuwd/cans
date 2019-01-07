import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

class SearchAssessmentHistoryLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ loadingBoundaryKey: propsKey }, { key: stateKey }) {
    if (propsKey !== stateKey) {
      return {
        key: propsKey,
        fetch: () => AssessmentService.getAllAssessments(),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'assessments'} fetch={this.state.fetch} isHiddenWhileLoading={false}>
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

SearchAssessmentHistoryLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SearchAssessmentHistoryLoadingBoundary
