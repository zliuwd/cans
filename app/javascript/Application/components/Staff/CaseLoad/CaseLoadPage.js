import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'
import StaffLoadingBoundary from './SubordinateInfoCard/StaffLoadingBoundary'
import SubordinateInfoCard from './SubordinateInfoCard/SubordinateInfoCard'
import { navigation } from '../../../util/constants'
const CaseLoadPage = ({ staffId }) => (
  <Fragment>
    <StaffLoadingBoundary staffId={staffId}>
      <SubordinateInfoCard />
    </StaffLoadingBoundary>

    <ClientsLoadingBoundary staffId={staffId}>
      <ClientListCard staffId={staffId} navFrom={navigation.STAFF_LIST} />
    </ClientsLoadingBoundary>
  </Fragment>
)

CaseLoadPage.propTypes = {
  staffId: PropTypes.string.isRequired,
}

export default CaseLoadPage
