import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import { CardHeader, CardBody, CardTitle } from '@cwds/components'
import StaffTable from '../StaffTable'
import { isInProgress, LoadingState } from '../../../util/loadingHelper'
import { staffPropType } from '../StaffHelper'
import LoadableCard from '../../common/loading/LoadableCard'
import LoadableButton from '../../common/loading/LoadableButton'
import SubordinateLoadingBoundary from './SubordinateLoadingBoundary'

class SubordinateCard extends PureComponent {
  renderCardHeader = () => {
    const isLoading = isInProgress(this.props.loadingState)
    return (
      <CardHeader className={'card-header-fix'}>
        <CardTitle className={'card-title-fix'}>Assigned Staff</CardTitle>
        <SubordinateLoadingBoundary>
          <LoadableButton color={'primary'} caption={'Hello'} isLoading={isLoading} />
        </SubordinateLoadingBoundary>
      </CardHeader>
    )
  }

  renderCardBody = () => (
    <CardBody>
      <StaffTable staff={this.props.staff} />
    </CardBody>
  )

  render() {
    const isLoading = this.props.loadingState === LoadingState.updating
    return (
      <LoadableCard
        isLoading={isLoading}
        renderCardHeader={this.renderCardHeader}
        renderCardBody={this.renderCardBody}
        className={'card supervisor-card'}
        isHeaderLoadable={false}
        loadingGridColumns={5}
      />
    )
  }
}

SubordinateCard.propTypes = {
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  staff: PropTypes.arrayOf(staffPropType),
}

SubordinateCard.defaultProps = {
  loadingState: LoadingState.updating,
  staff: [],
}

export default SubordinateCard
