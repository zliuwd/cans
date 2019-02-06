import React from 'react'
import PropTypes from 'prop-types'
import { ClientService } from '../Client'
import LoadingBoundary from '../common/LoadingBoundary'

class ClientLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ clientId: propsId }, { clientId: stateId }) {
    if (propsId !== stateId) {
      return {
        clientId: propsId,
        fetch: () => ClientService.fetch(propsId),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName="client" fetch={this.state.fetch} isHiddenWhileLoading={false}>
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

ClientLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  clientId: PropTypes.string.isRequired,
}

export default ClientLoadingBoundary
