import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isNeedsDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'

const target = 3
const hasTargetRating = item => item.rating === target

const ImmediateActionRequiredSummary = ({ domains, i18n }) => (
  <SummaryGrid
    domainFilter={isNeedsDomain}
    domains={domains}
    header="Immediate Action Required"
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

ImmediateActionRequiredSummary.propTypes = {
  domains: DomainsPropType,
  i18n: PropTypes.object.isRequired,
}

ImmediateActionRequiredSummary.defaultProps = {
  domains: [],
}

export default ImmediateActionRequiredSummary
