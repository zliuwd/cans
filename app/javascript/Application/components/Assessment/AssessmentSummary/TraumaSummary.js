import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isTraumaDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'

const hasTargetRating = item => item.rating === 1

const TraumaSummary = ({ domains, i18n }) => (
  <SummaryGrid
    domainFilter={isTraumaDomain}
    domains={domains}
    header="Trauma"
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

TraumaSummary.propTypes = {
  domains: DomainsPropType,
  i18n: PropTypes.object.isRequired,
}

TraumaSummary.defaultProps = {
  domains: [],
}

export default TraumaSummary
