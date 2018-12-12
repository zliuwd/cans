import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'
import AuthBoundary from '../common/AuthBoundary'
import { buildCompleteAssessmentPermission } from '../common/AuthHelper'
import CompleteAssessmentButton from './CompleteAssessmentButton'

import './style.sass'

class AssessmentFormFooter extends PureComponent {
  render() {
    const { isSubmitButtonEnabled, onCancelClick, onSubmitAssessment, assessment } = this.props
    return (
      <div className={'form-footer'}>
        <Button id={'cancel-assessment'} color={'link'} className={'button-fix-link'} onClick={onCancelClick}>
          Cancel
        </Button>
        <AuthBoundary
          permission={buildCompleteAssessmentPermission(assessment)}
          andCondition={isSubmitButtonEnabled}
          eagerRefreshFlagObject={{ status: assessment.status }}
        >
          <CompleteAssessmentButton onSubmitAssessment={onSubmitAssessment} />
        </AuthBoundary>
      </div>
    )
  }
}

AssessmentFormFooter.propTypes = {
  assessment: PropTypes.object.isRequired,
  isSubmitButtonEnabled: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmitAssessment: PropTypes.func.isRequired,
}

export default AssessmentFormFooter
