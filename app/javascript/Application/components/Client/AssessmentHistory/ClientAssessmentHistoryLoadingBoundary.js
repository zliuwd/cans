import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

class ClientAssessmentHistoryLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ clientIdentifier: propsId }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () => AssessmentService.search({ client_identifier: propsId }),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'assessments'} fetch={this.state.fetch}>
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

ClientAssessmentHistoryLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  clientIdentifier: PropTypes.string.isRequired,
}

export default ClientAssessmentHistoryLoadingBoundary
