import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'
import StaffLoadingBoundary from './SubordinateInfoCard/StaffLoadingBoundary'
import SubordinateInfoCard from './SubordinateInfoCard/SubordinateInfoCard'

const CaseLoadPage = ({ staffId }) => (
  <Fragment>
    <StaffLoadingBoundary staffId={staffId}>
      <SubordinateInfoCard />
    </StaffLoadingBoundary>

    <ClientsLoadingBoundary staffId={staffId}>
      <ClientListCard />
    </ClientsLoadingBoundary>
  </Fragment>
)

CaseLoadPage.propTypes = {
  staffId: PropTypes.string.isRequired,
}

export default CaseLoadPage
