import React from 'react'
import PropTypes from 'prop-types'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { navigation } from '../../util/constants'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { SearchContainer } from '../Search'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import VisitLogger from './VisitLogger'
import FullWidthLayout from '../Layout/FullWidthLayout'

const navigateTo = navigation.CLIENT_SEARCH

const SearchPage = ({ match }) => (
  <React.Fragment>
    <CurrentUserLoadingBoundary>
      <VisitLogger dashboard={navigateTo} />
    </CurrentUserLoadingBoundary>
    <FullWidthLayout
      breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} />}
      rightButton={<SearchClientsButton />}
    >
      <SearchContainer match={match} navigateTo={navigateTo} />
    </FullWidthLayout>
  </React.Fragment>
)

SearchPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}
export default SearchPage
