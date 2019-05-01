import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

class ClientAssessmentHistoryLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ clientIdentifier: propsId, dataFetchCallback: callback }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () =>
          AssessmentService.search({
            client_identifier: propsId,
            include_deleted: true,
          }).then(data => {
            const assessments = { assessments: data }
            callback(assessments)
            return data
          }),
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

ClientAssessmentHistoryLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  clientIdentifier: PropTypes.string.isRequired,
  dataFetchCallback: PropTypes.func,
}

ClientAssessmentHistoryLoadingBoundary.defaultProps = {
  dataFetchCallback: () => {},
}

export default ClientAssessmentHistoryLoadingBoundary
