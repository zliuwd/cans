import React from 'react'
import PropTypes from 'prop-types'
import AddCansButton from './AddCansButton'
import RecordsModeSwitchButton from './RecordsModeSwitchButton'

const AssessmentRecordControl = props => {
  const {
    activatedRecordSwitchButton,
    recordsModeSwitch,
    assessments,
    clientIdentifier,
    disabled,
    isReassessment,
  } = props
  const switchButtonProps = { activatedRecordSwitchButton, recordsModeSwitch, assessments }

  const addCansButtonProps = { clientIdentifier, disabled, isReassessment }

  return (
    <div className={'record-control-container'}>
      <span>
        <RecordsModeSwitchButton {...switchButtonProps} />
      </span>
      <span>
        <AddCansButton {...addCansButtonProps} />
      </span>
    </div>
  )
}

AssessmentRecordControl.propTypes = {
  activatedRecordSwitchButton: PropTypes.string.isRequired,
  assessments: PropTypes.arrayOf(PropTypes.object),
  clientIdentifier: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isReassessment: PropTypes.bool,
  recordsModeSwitch: PropTypes.func.isRequired,
}

AssessmentRecordControl.defaultProps = {
  clientIdentifier: '',
  assessments: [],
  disabled: false,
  isReassessment: false,
}

export default AssessmentRecordControl
