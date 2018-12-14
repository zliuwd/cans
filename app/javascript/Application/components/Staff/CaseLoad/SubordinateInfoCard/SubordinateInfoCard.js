import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CardHeader, CardBody, CardTitle } from '@cwds/components'
import SubordinateInfoTable from './SubordinateInfoTable'
import { staffInfoDefaultProps, staffInfoShape } from '../../StaffHelper'
import { formatClientName } from '../../../Client/Client.helper'
import { LoadingState, loadingStatePropType, isInProgress } from '../../../../util/loadingHelper'
import LoadableCard from '../../../common/loading/LoadableCard'

class SubordinateInfoCard extends PureComponent {
  renderCardHeader = () => (
    <CardHeader>
      <CardTitle className={'card-title-fix'}>{formatClientName(this.props.staffInfo.staff_person)}</CardTitle>
    </CardHeader>
  )

  renderCardBody = () => (
    <CardBody>
      <SubordinateInfoTable staffInfo={this.props.staffInfo} />
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
        isHeaderLoadable={true}
        loadingGridRows={3}
        loadingGridColumns={3}
      />
    )
  }
}

SubordinateInfoCard.propTypes = {
  loadingState: loadingStatePropType,
  staffInfo: PropTypes.shape(staffInfoShape),
}

SubordinateInfoCard.defaultProps = {
  loadingState: LoadingState.waiting,
  staffInfo: staffInfoDefaultProps,
}

export default SubordinateInfoCard
