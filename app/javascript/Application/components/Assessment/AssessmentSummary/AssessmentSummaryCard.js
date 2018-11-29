import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, CardTitle } from '@cwds/components'
import { AssessmentStatus } from '../AssessmentHelper'
import AssessmentSummary from './AssessmentSummary'
import './style.sass'

const AssessmentSummaryCard = ({ assessmentStatus, ...props }) =>
  assessmentStatus === AssessmentStatus.completed ? (
    <Card className="card assessment-summary-card">
      <CardHeader>
        <CardTitle className="assessment-summary-card-title">CANS Summary</CardTitle>
      </CardHeader>
      <CardBody>
        <AssessmentSummary {...props} />
      </CardBody>
    </Card>
  ) : null

AssessmentSummaryCard.propTypes = {
  assessmentStatus: PropTypes.oneOf(Object.values(AssessmentStatus)),
  domains: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  isUnderSix: PropTypes.bool.isRequired,
}

AssessmentSummaryCard.defaultProps = {
  assessmentStatus: AssessmentStatus.inProgress,
}

export default AssessmentSummaryCard
