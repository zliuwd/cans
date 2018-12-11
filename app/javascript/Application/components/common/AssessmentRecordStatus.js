import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'

function AssessmentRecordStatus({ status }) {
  switch (status) {
    case AssessmentStatus.inProgress:
      return (
        <div className="status-icon-wrapper">
          <i className="fa fa-spinner fa-2x" aria-hidden="true" />
          <span className="assessment-in-progress">In Progress</span>
        </div>
      )
    case AssessmentStatus.completed:
      return (
        <div className="status-icon-wrapper">
          <Icon name="check-circle" set={'fa'} className={`fa-2x`} />
          <span className="assessment-completed">Complete</span>
        </div>
      )
    default:
      return null
  }
}

AssessmentRecordStatus.propTypes = {
  status: PropTypes.string.isRequired,
}
export default AssessmentRecordStatus
