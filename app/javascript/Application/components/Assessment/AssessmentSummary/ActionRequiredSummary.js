import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isNeedsDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'
import SummaryHeader from './SummaryHeader'

const hasTargetRating = item => item.rating === 2
const tooltip =
  'Ratings of 2 from all domains except Strengths. This rating indicates that this need interferes with functioning.'

const ActionRequiredSummary = ({ domains, i18n, getSummaryCode }) => (
  <SummaryGrid
    getSummaryCode={getSummaryCode}
    domainFilter={isNeedsDomain}
    domains={domains}
    header={<SummaryHeader title="Action Required" tooltip={tooltip} />}
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

ActionRequiredSummary.propTypes = {
  domains: DomainsPropType,
  getSummaryCode: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
}

ActionRequiredSummary.defaultProps = {
  domains: [],
}

export default ActionRequiredSummary
