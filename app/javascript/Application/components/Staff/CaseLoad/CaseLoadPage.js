import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import StaffLoadingBoundary from './SubordinateInfoCard/StaffLoadingBoundary'
import SubordinateInfoCard from './SubordinateInfoCard/SubordinateInfoCard'
import { navigation } from '../../../util/constants'
import ClientSocialWorkerCard from '../../Client/ClientSocialWorkerCard'
const CaseLoadPage = ({ staffId }) => (
  <Fragment>
    <StaffLoadingBoundary staffId={staffId}>
      <SubordinateInfoCard />
    </StaffLoadingBoundary>

    <ClientsLoadingBoundary staffId={staffId}>
      <ClientSocialWorkerCard navFrom={navigation.STAFF_LIST} staffId={staffId} />
    </ClientsLoadingBoundary>
  </Fragment>
)

CaseLoadPage.propTypes = {
  staffId: PropTypes.string.isRequired,
}

export default CaseLoadPage
