import { recordsMode, shouldRenderRecordsSwitch } from './Client.helper'
import { Button } from '@cwds/components'
import React from 'react'
import PropTypes from 'prop-types'

const RecordsModeSwitchButton = ({ switchButtonName, recordsModeSwitch, assessments }) => {
  const switchButton = (
    <Button onClick={recordsModeSwitch} className="records-mode-switch-button" size="small">
      {switchButtonName}
    </Button>
  )

  if (switchButtonName === recordsMode.HISTORY) return switchButton
  // for AssessmentComparison, switch button will always be rendered
  return shouldRenderRecordsSwitch(assessments) ? switchButton : null
}

RecordsModeSwitchButton.propTypes = {
  assessments: PropTypes.array,
  recordsModeSwitch: PropTypes.func.isRequired,
  switchButtonName: PropTypes.string.isRequired,
}

RecordsModeSwitchButton.defaultProps = {
  assessments: [],
}

export default RecordsModeSwitchButton
