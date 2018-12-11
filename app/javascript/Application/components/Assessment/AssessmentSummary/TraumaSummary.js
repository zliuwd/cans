import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isTraumaDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'
import SummaryHeader from './SummaryHeader'

const hasTargetRating = item => item.rating === 1
const tooltip = 'Includes all "Yes" ratings from the Potentially Traumatic/Adverse Childhood Experiences module.'

const TraumaSummary = ({ domains, i18n, getSummaryCode }) => (
  <SummaryGrid
    getSummaryCode={getSummaryCode}
    domainFilter={isTraumaDomain}
    domains={domains}
    header={<SummaryHeader title="Trauma" tooltip={tooltip} />}
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

TraumaSummary.propTypes = {
  domains: DomainsPropType,
  getSummaryCode: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
}

TraumaSummary.defaultProps = {
  domains: [],
}

export default TraumaSummary
