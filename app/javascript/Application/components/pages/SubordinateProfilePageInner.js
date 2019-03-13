import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../util/constants'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { CaseLoadPage } from '../Staff'
import { buildSearchClientsButton as SearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import FullWidthLayout from '../Layout/FullWidthLayout'

const navigateTo = navigation.STAFF_READ

const SubordinateProfilePageInner = ({ staffInfo }) => (
  <FullWidthLayout
    breadcrumb={<ContextualBreadCrumb navigateTo={navigateTo} subordinate={staffInfo} />}
    rightButton={<SearchClientsButton />}
  >
    {staffInfo && staffInfo.staff_person && <CaseLoadPage staffId={staffInfo.staff_person.identifier} />}
  </FullWidthLayout>
)

SubordinateProfilePageInner.propTypes = {
  staffInfo: PropTypes.shape({
    staff_person: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

SubordinateProfilePageInner.defaultProps = {
  staffInfo: null,
}

export default SubordinateProfilePageInner
