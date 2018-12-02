import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import ClientSocialWorkerCard from './ClientSocialWorkerCard'
import { SocialWorkerCardTemplate } from './ClientSocialWorkerCardTemplate'
import { LoadingState } from '../../util/loadingHelper'

const ClientListCard = ({ clients, loadingState, comeFrom, staffId }) => (
  <ClientSocialWorkerCard
    title={clients.length}
    columns={SocialWorkerCardTemplate(comeFrom, staffId)}
    data={clients}
    defaultSortSetting={[
      {
        id: 'fullName',
        asc: true,
      },
    ]}
    loading={loadingState === LoadingState.waiting}
    comeFrom={comeFrom}
  />
)

ClientListCard.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  comeFrom: PropTypes.string,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  staffId: PropTypes.string,
}

ClientListCard.defaultProps = {
  clients: [],
  comeFrom: null,
  loadingState: LoadingState.waiting,
  staffId: '',
}
export default ClientListCard
