import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from '@cwds/components'
import CompleteAssessmentButton from './CompleteAssessmentButton'
import AssessmentChangelogLink from './AssessmentChangelogLink'

import './style.sass'

class AssessmentFormFooter extends PureComponent {
  render() {
    const { assessment, isEditable, onCancelClick, isSubmitButtonEnabled, onSubmitAssessment } = this.props
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    return (
      <Row className={'form-footer'}>
        <Col sm={6}>
          {isUnderSix !== undefined ? (
            <AssessmentChangelogLink assessmentId={assessment.id} assessmentStatus={assessment.status} />
          ) : null}
        </Col>
        <Col sm={6}>
          {isUnderSix !== undefined && isEditable ? (
            <div className={'align-footer-buttons'}>
              <Button
                id="cancel-assessment"
                color="secondary"
                className="footer-button-space button-fix-secondary"
                onClick={onCancelClick}
              >
                Cancel
              </Button>
              <CompleteAssessmentButton onSubmitAssessment={onSubmitAssessment} disabled={!isSubmitButtonEnabled} />
            </div>
          ) : null}
        </Col>
      </Row>
    )
  }
}

AssessmentFormFooter.propTypes = {
  assessment: PropTypes.object,
  isEditable: PropTypes.bool,
  isSubmitButtonEnabled: PropTypes.bool,
  onCancelClick: PropTypes.func.isRequired,
  onSubmitAssessment: PropTypes.func.isRequired,
}

AssessmentFormFooter.defaultProps = {
  assessment: {},
  isSubmitButtonEnabled: undefined,
  isEditable: false,
}

export default AssessmentFormFooter
