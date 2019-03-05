import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentStatus, statusTextOfHistory } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'
import './style.sass'

const iconMap = {
  [AssessmentStatus.inProgress]: 'circle-notch',
  [AssessmentStatus.completed]: 'check-circle',
  [AssessmentStatus.deleted]: 'trash-alt',
}

const classNameMap = {
  [AssessmentStatus.inProgress]: 'assessment-in-progress',
  [AssessmentStatus.completed]: 'assessment-completed',
  [AssessmentStatus.deleted]: 'assessment-deleted',
}

function AssessmentRecordStatus({ status, isForTable = false }) {
  const fontSize = isForTable ? '1x' : '2x'
  const icon = iconMap[status]
  const className = classNameMap[status]

  return icon ? (
    <div className="status-icon-wrapper">
      <Icon name={icon} set={'fa'} className={`fa-${fontSize}`} />
      <span className={className}>{statusTextOfHistory(status, isForTable)}</span>
    </div>
  ) : null
}

AssessmentRecordStatus.propTypes = {
  isForTable: PropTypes.bool,
  status: PropTypes.string.isRequired,
}

AssessmentRecordStatus.defaultProps = {
  isForTable: false,
}
export default AssessmentRecordStatus
