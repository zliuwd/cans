import React from 'react'
import { Button } from '@cwds/components'
import PropTypes from 'prop-types'

const CompleteAssessmentButton = ({ onSubmitAssessment, disabled }) => (
  <Button
    id={'submit-assessment'}
    className={'button-fix-primary'}
    color={'primary'}
    onClick={onSubmitAssessment}
    disabled={disabled}
  >
    Complete
  </Button>
)

CompleteAssessmentButton.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool]),
  onSubmitAssessment: PropTypes.func.isRequired,
}

CompleteAssessmentButton.defaultProps = {
  disabled: false,
}

export default CompleteAssessmentButton
