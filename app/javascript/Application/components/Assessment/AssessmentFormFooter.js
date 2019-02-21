import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'
import CompleteAssessmentButton from './CompleteAssessmentButton'
import AssessmentChangelogLink from './AssessmentChangelogLink'

import './style.sass'

class AssessmentFormFooter extends PureComponent {
  render() {
    const { assessment, isSubmitButtonEnabled, onCancelClick, onSubmitAssessment } = this.props
    return (
      <div className={'form-footer'}>
        <AssessmentChangelogLink assessmentId={assessment.id} assessmentStatus={assessment.status} />
        <Button id="cancel-assessment" color="secondary" className="button-fix-secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        <CompleteAssessmentButton onSubmitAssessment={onSubmitAssessment} disabled={!isSubmitButtonEnabled} />
      </div>
    )
  }
}

AssessmentFormFooter.propTypes = {
  assessment: PropTypes.object,
  isSubmitButtonEnabled: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmitAssessment: PropTypes.func.isRequired,
}

AssessmentFormFooter.defaultProps = {
  assessment: {},
}

export default AssessmentFormFooter
