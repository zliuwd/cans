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
      navFrom: '',
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
        navFrom: this.props.navFrom,
      })
      handleError(failedFetching)
    } else {
      this.setState({
        staffId: this.props.staffId,
        loadingState: LoadingState.ready,
        clients,
        navFrom: this.props.navFrom,
      })
    }
  }

  render() {
    const children = this.props.children
    const { loadingState, clients, navFrom, staffId } = this.state
    return loadingState === LoadingState.ready
      ? React.cloneElement(children, { loadingState, clients, navFrom, staffId })
      : React.cloneElement(children, { loadingState })
  }
}

ClientsLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  navFrom: PropTypes.string,
  staffId: PropTypes.string.isRequired,
}
ClientsLoadingBoundary.defaultProps = {
  navFrom: undefined,
}
export default ClientsLoadingBoundary
