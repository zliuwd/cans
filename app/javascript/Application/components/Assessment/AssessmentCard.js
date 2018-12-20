import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, CardTitle } from '@cwds/components'
import Assessment from './Assessment'
import './style.sass'

const AssessmentCard = ({ ...props }) => (
  <Card className="card assessment-card">
    <CardHeader>
      <CardTitle className="assessment-card-title">
        <span>{props.assessment.state.under_six ? 'Age Range 0-5' : 'Age Range 6-21'}</span>
        <span className="assessment-expand-control" id={'assessment-expand-control'}>
          {'Expand all'}
        </span>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Assessment {...props} />
    </CardBody>
  </Card>
)

AssessmentCard.propTypes = {
  assessment: PropTypes.object.isRequired,
  handleWarningShow: PropTypes.func,
  i18n: PropTypes.object.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
}

AssessmentCard.defaultProps = {
  handleWarningShow: () => {},
}

export default AssessmentCard
