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
      staffId: '',
      loadingState: LoadingState.waiting,
      clients: [],
      comeFrom: '',
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
        comeFrom: this.props.comeFrom,
      })
      handleError(failedFetching)
    } else {
      this.setState({
        staffId: this.props.staffId,
        loadingState: LoadingState.ready,
        clients,
        comeFrom: this.props.comeFrom,
      })
    }
  }

  render() {
    const children = this.props.children
    const { loadingState, clients, comeFrom, staffId } = this.state
    return loadingState === LoadingState.ready
      ? React.cloneElement(children, { loadingState, clients, comeFrom, staffId })
      : React.cloneElement(children, { loadingState })
  }
}

ClientsLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  comeFrom: PropTypes.string,
  staffId: PropTypes.string.isRequired,
}
ClientsLoadingBoundary.defaultProps = {
  comeFrom: undefined,
}
export default ClientsLoadingBoundary
