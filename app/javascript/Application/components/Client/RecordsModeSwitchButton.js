import { recordsMode, shouldRenderRecordsSwitch } from './Client.helper'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon, UncontrolledTooltip, ButtonGroup } from '@cwds/components'
import './style.sass'

class RecordsModeSwitchButton extends React.PureComponent {
  iconDetailsGenerator = (targetIcon, tip) => {
    const condition = this.props.activatedRecordSwitchButton === targetIcon
    // 'equal' means it is just the selected icon
    const IconDetails = {
      className: condition ? 'assessment-records-button-selected' : 'assessment-records-button',
      clickBehavior: condition ? null : this.props.recordsModeSwitch,
      toolTip: condition ? null : (
        <UncontrolledTooltip placement="top" target={`switch-to-${targetIcon}-view`}>
          {tip}
        </UncontrolledTooltip>
      ),
    }
    return IconDetails
  }
  render() {
    const toolTips = {
      toComparisonIcon: 'Compare previous assessments over time',
      toHistoryIcon: 'List view of previous assessments',
    }
    const toHistoryIcon = this.iconDetailsGenerator(recordsMode.HISTORY, toolTips.toComparisonIcon)
    const toComparisonIcon = this.iconDetailsGenerator(recordsMode.COMPARISON, toolTips.toHistoryIcon)
    // based on the condition for activating the Icon, for example toComparisonIcon will be actived in history view

    const switchButtons = (
      <Fragment>
        <ButtonGroup className={'assessment-records-buttons-group'}>
          <Icon
            icon="list"
            size="1x"
            id={'switch-to-comparison-view'}
            onClick={toComparisonIcon.clickBehavior}
            className={toComparisonIcon.className}
          />
          {toComparisonIcon.toolTip}

          <Icon
            icon="chart-bar"
            size="1x"
            id={'switch-to-history-view'}
            onClick={toHistoryIcon.clickBehavior}
            className={toHistoryIcon.className}
          />
          {toHistoryIcon.toolTip}
        </ButtonGroup>
      </Fragment>
    )
    if (this.props.activatedRecordSwitchButton === recordsMode.HISTORY) return switchButtons
    // for AssessmentComparison, switch button will always be rendered
    return shouldRenderRecordsSwitch(this.props.assessments) ? switchButtons : null
  }
}

RecordsModeSwitchButton.propTypes = {
  activatedRecordSwitchButton: PropTypes.string.isRequired,
  assessments: PropTypes.array,
  recordsModeSwitch: PropTypes.func.isRequired,
}

RecordsModeSwitchButton.defaultProps = {
  assessments: [],
}

export default RecordsModeSwitchButton
