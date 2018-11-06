import React from 'react'
import PropTypes from 'prop-types'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'

const CaseLoadPage = ({ staffId }) => (
  <ClientsLoadingBoundary staffId={staffId}>
    <ClientListCard />
  </ClientsLoadingBoundary>
)

CaseLoadPage.propTypes = {
  staffId: PropTypes.string.isRequired,
}

export default CaseLoadPage
