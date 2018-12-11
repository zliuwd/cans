import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, isNeedsDomain } from './DomainHelper'
import SummaryGrid from './SummaryGrid'
import SummaryHeader from './SummaryHeader'

const target = 3
const hasTargetRating = item => item.rating === target
const tooltip =
  'Ratings of 3 from all domains except Strengths. This rating indicates that the need is dangerous or disabling.'

const ImmediateActionRequiredSummary = ({ domains, i18n, getSummaryCode }) => (
  <SummaryGrid
    getSummaryCode={getSummaryCode}
    domainFilter={isNeedsDomain}
    domains={domains}
    header={<SummaryHeader title="Immediate Action Required" tooltip={tooltip} />}
    i18n={i18n}
    itemFilter={hasTargetRating}
  />
)

ImmediateActionRequiredSummary.propTypes = {
  domains: DomainsPropType,
  getSummaryCode: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
}

ImmediateActionRequiredSummary.defaultProps = {
  domains: [],
}

export default ImmediateActionRequiredSummary
