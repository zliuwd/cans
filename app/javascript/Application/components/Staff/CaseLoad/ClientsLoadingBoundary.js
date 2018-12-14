import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../../util/loadingHelper'
import { handleError } from '../../../util/ApiErrorHandler'
import StaffService from '../Staff.service'
import { failedFetching } from '../StaffHelper'
import LoadingBoundary from '../../common/LoadingBoundary'

// class ClientsLoadingBoundary extends React.PureComponent {
//   constructor() {
//     super()
//     this.state = {
//       loadingState: LoadingState.waiting,
//       clients: [],
//     }
//   }
//
//   async componentDidMount() {
//     await this.fetch()
//   }
//
//   fetch = async () => {
//     const clients = await StaffService.clients(this.props.staffId)
//     if (!Array.isArray(clients)) {
//       this.setState({
//         loadingState: LoadingState.error,
//       })
//       handleError(failedFetching)
//     } else {
//       this.setState({
//         loadingState: LoadingState.ready,
//         clients,
//       })
//     }
//   }
//
//   render() {
//     const children = this.props.children
//     const { loadingState, clients } = this.state
//     return loadingState === LoadingState.ready
//       ? React.cloneElement(children, { loadingState, clients })
//       : React.cloneElement(children, { loadingState })
//   }
// }

const ClientsLoadingBoundary = ({ staffId, children }) => (
  <LoadingBoundary
    childNodeFetchedPropName={'clients'}
    fetch={() => StaffService.clients(staffId)}
    isHiddenWhileLoading={false}
  >
    {children}
  </LoadingBoundary>
)

ClientsLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  staffId: PropTypes.string.isRequired,
}

export default ClientsLoadingBoundary
