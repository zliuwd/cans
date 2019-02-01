import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentStatus, statusTextOfHistory } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'
import './style.sass'

const statusIcon = (name, fontSize) => <Icon name={name} set={'fa'} className={`fa-${fontSize}`} />

function AssessmentRecordStatus({ status, isForTable = false }) {
  const fontSize = isForTable ? '1x' : '2x'
  switch (status) {
    case AssessmentStatus.inProgress:
      return (
        <div className={'status-icon-wrapper'}>
          {statusIcon('circle-notch', fontSize)}
          <span className={'assessment-in-progress'}>{statusTextOfHistory(status, isForTable)}</span>
        </div>
      )
    case AssessmentStatus.completed:
      return (
        <div className={'status-icon-wrapper'}>
          {statusIcon('check-circle', fontSize)}
          <span className={'assessment-completed'}>{statusTextOfHistory(status, isForTable)}</span>
        </div>
      )
    case AssessmentStatus.deleted:
      return (
        <div className={'status-icon-wrapper'}>
          {statusIcon('trash-alt', fontSize)}
          <span className={'assessment-deleted'}>{statusTextOfHistory(status, isForTable)}</span>
        </div>
      )
    default:
      return null
  }
}

AssessmentRecordStatus.propTypes = {
  isForTable: PropTypes.bool,
  status: PropTypes.string.isRequired,
}

AssessmentRecordStatus.defaultProps = {
  isForTable: false,
}
export default AssessmentRecordStatus
