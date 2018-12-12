import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import ClientSocialWorkerCard from './ClientSocialWorkerCard'
import { SocialWorkerCardTemplate } from './ClientSocialWorkerCardTemplate'
import { LoadingState } from '../../util/loadingHelper'

const ClientListCard = ({ clients, loadingState, navFrom, staffId }) => (
  <ClientSocialWorkerCard
    title={clients.length}
    columns={SocialWorkerCardTemplate(navFrom, staffId)}
    data={clients}
    defaultSorted={[
      {
        id: 'fullName',
        asc: true,
      },
    ]}
    loading={loadingState === LoadingState.waiting}
    navFrom={navFrom}
  />
)

ClientListCard.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  navFrom: PropTypes.string,
  staffId: PropTypes.string,
}

ClientListCard.defaultProps = {
  clients: [],
  navFrom: null,
  loadingState: LoadingState.waiting,
  staffId: '',
}
export default ClientListCard
