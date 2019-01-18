import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, CardTitle, DataGrid } from '@cwds/components'
import { PAGE_SIZES } from '../../util/DataGridHelper'
import './style.sass'

const ClientSocialWorkerCard = props => {
  return (
    <Card className="card-cans-client-list">
      <CardHeader>
        <CardTitle className={'card-title-fix'}>
          Client List<span className="client-list-records-amount">({props.title})</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <DataGrid
          {...props}
          sortable={true}
          className="client-grid"
          minRows={2}
          noDataText={'No records found'}
          pageSizeOptions={PAGE_SIZES}
          showPaginationBottom={true}
        />
      </CardBody>
    </Card>
  )
}

ClientSocialWorkerCard.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.number.isRequired,
}

export default ClientSocialWorkerCard
