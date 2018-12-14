import React, { Fragment } from 'react'
import SubordinateCard from './SubordinateCard'
import SubordinateLoadingBoundary from './SubordinateLoadingBoundary'
import LoadableButton from '../../common/loading/LoadableButton'

const SupervisorDashboard = () => (
  <Fragment>
    <SubordinateLoadingBoundary>
      <SubordinateCard />
    </SubordinateLoadingBoundary>
  </Fragment>
)

export default SupervisorDashboard
