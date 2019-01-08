import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'
import CompleteAssessmentButton from './CompleteAssessmentButton'

import './style.sass'

class AssessmentFormFooter extends PureComponent {
  render() {
    const { isSubmitButtonEnabled, onCancelClick, onSubmitAssessment } = this.props
    return (
      <div className={'form-footer'}>
        <Button id="cancel-assessment" color="secondary" className="button-fix-secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        <CompleteAssessmentButton onSubmitAssessment={onSubmitAssessment} disabled={!isSubmitButtonEnabled} />
      </div>
    )
  }
}

AssessmentFormFooter.propTypes = {
  isSubmitButtonEnabled: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmitAssessment: PropTypes.func.isRequired,
}

export default AssessmentFormFooter
