import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CardHeader, CardBody, CardTitle, DataGrid } from '@cwds/components'
import LoadableCard from '../common/loading/LoadableCard'
import { SocialWorkerCardTemplate } from './ClientSocialWorkerCardTemplate'
import './style.sass'
import { isInProgress, LoadingState, loadingStatePropType } from '../../util/loadingHelper'

class ClientSocialWorkerCard extends PureComponent {
  renderCardHeader = () => {
    const { clients, loadingState } = this.props
    const isLoading = isInProgress(loadingState)
    return (
      <CardHeader>
        <CardTitle className={'card-title-fix'}>
          Client List {!isLoading && <span className="client-list-records-amount">({(clients || []).length})</span>}
        </CardTitle>
      </CardHeader>
    )
  }

  renderCardBody = () => (
    <CardBody>
      <DataGrid
        data={this.props.clients}
        columns={SocialWorkerCardTemplate(this.props.navFrom, this.props.staffId)}
        sortable={true}
        className="client-grid"
        minRows={2}
        noDataText={'No records found'}
        pageSizeOptions={[10, 25, 50]}
        showPaginationBottom={true}
      />
    </CardBody>
  )

  render() {
    const isLoading = isInProgress(this.props.loadingState)
    return (
      <LoadableCard
        isLoading={isLoading}
        renderCardHeader={this.renderCardHeader}
        renderCardBody={this.renderCardBody}
        className={'card supervisor-card'}
        isHeaderLoadable={false}
        loadingGridRows={3}
        loadingGridColumns={4}
      />
    )
  }
}

ClientSocialWorkerCard.propTypes = {
  clients: PropTypes.array,
  loadingState: loadingStatePropType,
  navFrom: PropTypes.string,
  staffId: PropTypes.string,
}

ClientSocialWorkerCard.defaultProps = {
  clients: [],
  loadingState: LoadingState.waiting,
  navFrom: '',
  staffId: null,
}

export default ClientSocialWorkerCard
