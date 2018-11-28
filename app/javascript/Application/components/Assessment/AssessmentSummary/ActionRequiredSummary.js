import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isNeedsDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'

const hasTargetRating = item => item.rating === 2

const ActionRequiredSummary = ({ domains, i18n }) => (
  <SummaryGrid
    domainFilter={isNeedsDomain}
    domains={domains}
    header="Action Required"
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

ActionRequiredSummary.propTypes = {
  domains: DomainsPropType,
  i18n: PropTypes.object.isRequired,
}

ActionRequiredSummary.defaultProps = {
  domains: [],
}

export default ActionRequiredSummary
