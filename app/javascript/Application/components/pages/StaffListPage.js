import React from 'react'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { navigation } from '../../util/constants'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { SupervisorDashboard } from '../Staff'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import VisitLogger from './VisitLogger'
import FullWidthLayout from '../Layout/FullWidthLayout'

const navigateTo = navigation.STAFF_LIST

const StaffListPage = () => (
  <React.Fragment>
    <CurrentUserLoadingBoundary>
      <VisitLogger dashboard={navigateTo} />
    </CurrentUserLoadingBoundary>
    <FullWidthLayout
      breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} />}
      navigateTo={navigateTo}
      rightButton={<SearchClientsButton />}
    >
      <SupervisorDashboard />
    </FullWidthLayout>
  </React.Fragment>
)

export default StaffListPage
