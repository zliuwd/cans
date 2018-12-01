import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import ClientSocialWorkerCard from './ClientSocialWorkerCard'
import { SocialWorkerCardTemplate } from './ClientSocialWorkerCardTemplate'
import { LoadingState } from '../../util/loadingHelper'

const ClientListCard = ({ clients, loadingState }) => (
  <ClientSocialWorkerCard
    title={clients.length}
    columns={SocialWorkerCardTemplate()}
    data={clients}
    defaultSorted={[
      {
        id: 'fullName',
        asc: true,
      },
    ]}
    loading={loadingState === LoadingState.waiting}
  />
)

ClientListCard.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
}

ClientListCard.defaultProps = {
  clients: [],
  loadingState: LoadingState.waiting,
}
export default ClientListCard
