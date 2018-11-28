import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isStrengthsDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'

const hasTargetRating = item => item.rating === 0 || item.rating === 1

const StrengthsSummary = ({ domains, i18n }) => (
  <SummaryGrid
    domainFilter={isStrengthsDomain}
    domains={domains}
    header="Strengths"
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

StrengthsSummary.propTypes = {
  domains: DomainsPropType,
  i18n: PropTypes.object.isRequired,
}

StrengthsSummary.defaultProps = {
  domains: [],
}

export default StrengthsSummary
