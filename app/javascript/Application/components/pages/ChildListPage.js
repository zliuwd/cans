import React from 'react'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { navigation } from '../../util/constants'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { CurrentUserCaseLoadPage } from '../Staff'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import VisitLogger from './VisitLogger'
import FullWidthLayout from '../Layout/FullWidthLayout'

const navigateTo = navigation.CHILD_LIST

const ChildListPage = () => (
  <React.Fragment>
    <CurrentUserLoadingBoundary>
      <VisitLogger dashboard={navigateTo} />
    </CurrentUserLoadingBoundary>
    <FullWidthLayout
      breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} />}
      rightButton={<SearchClientsButton />}
    >
      <CurrentUserCaseLoadPage />
    </FullWidthLayout>
  </React.Fragment>
)

export default ChildListPage
