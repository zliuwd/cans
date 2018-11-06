import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../../util/loadingHelper'
import { handleError } from '../../../util/ApiErrorHandler'
import StaffService from '../Staff.service'
import { failedFetching } from '../StaffHelper'

class ClientsLoadingBoundary extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      loadingState: LoadingState.waiting,
      clients: [],
    }
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const clients = await StaffService.clients(this.props.staffId)
    if (!Array.isArray(clients)) {
      this.setState({
        loadingState: LoadingState.error,
      })
      handleError(failedFetching)
    } else {
      this.setState({
        loadingState: LoadingState.ready,
        clients,
      })
    }
  }

  render() {
    const children = this.props.children
    const { loadingState, clients } = this.state
    return loadingState === LoadingState.ready
      ? React.cloneElement(children, { loadingState, clients })
      : React.cloneElement(children, { loadingState })
  }
}

ClientsLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  staffId: PropTypes.string.isRequired,
}

export default ClientsLoadingBoundary
