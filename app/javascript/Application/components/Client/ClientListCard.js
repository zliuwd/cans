import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import ClientSocialWorkerCard from './ClientSocialWorkerCard'
import { LoadingState } from '../../util/loadingHelper'

// TODO: delete
const ClientListCard = ({ clients, loadingState, navFrom }) => (
  <ClientSocialWorkerCard clients={clients} loadingState={loadingState} navFrom={navFrom} />
)

ClientListCard.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  navFrom: PropTypes.string,
}

ClientListCard.defaultProps = {
  clients: [],
  navFrom: null,
  loadingState: LoadingState.waiting,
}
export default ClientListCard
