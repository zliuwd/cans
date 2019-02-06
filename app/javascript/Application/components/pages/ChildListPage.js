import React from 'react'
import CurrentUserLoadingBoundary from './CurrentUserLoadingBoundary'
import { navigation } from '../../util/constants'
import BreadCrumbsBuilder from '../Layout/BreadCrumb/BreadCrumbsBuilder'
import { CurrentUserCaseLoadPage } from '../Staff'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import VisitLogger from './VisitLogger'
import FullWidthLayout from '../Layout/FullWidthLayout'

const navigateTo = navigation.CHILD_LIST

const ChildListPage = () => {
  const breadcrumb = (
    <CurrentUserLoadingBoundary>
      <BreadCrumbsBuilder navigateTo={navigateTo} />
    </CurrentUserLoadingBoundary>
  )

  return (
    <React.Fragment>
      <CurrentUserLoadingBoundary>
        <VisitLogger dashboard={navigateTo} />
      </CurrentUserLoadingBoundary>
      <FullWidthLayout breadcrumb={breadcrumb} navigateTo={navigateTo} rightButton={<SearchClientsButton />}>
        <CurrentUserCaseLoadPage />
      </FullWidthLayout>
    </React.Fragment>
  )
}

export default ChildListPage
