import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import StrengthsSummary from './StrengthsSummary'
import ActionRequiredSummary from './ActionRequiredSummary'
import ImmediateActionRequiredSummary from './ImmediateActionRequiredSummary'
import TraumaSummary from './TraumaSummary'

const ROW_SIZE = 12

const AssessmentSummary = ({ domains, i18n, isUnderSix }) => {
  const numSummaries = 4
  const size = ROW_SIZE / numSummaries
  const filteredDomains = domains.filter(domain => (isUnderSix ? domain.under_six : domain.above_six))
  return (
    <Row>
      <Col xs={ROW_SIZE} xl={size}>
        <StrengthsSummary domains={filteredDomains} i18n={i18n} />
      </Col>
      <Col xs={ROW_SIZE} xl={size}>
        <ActionRequiredSummary domains={filteredDomains} i18n={i18n} />
      </Col>
      <Col xs={ROW_SIZE} xl={size}>
        <ImmediateActionRequiredSummary domains={filteredDomains} i18n={i18n} />
      </Col>
      <Col xs={ROW_SIZE} xl={size}>
        <TraumaSummary domains={filteredDomains} i18n={i18n} />
      </Col>
    </Row>
  )
}

AssessmentSummary.propTypes = {
  domains: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  isUnderSix: PropTypes.bool.isRequired,
}
export default AssessmentSummary
