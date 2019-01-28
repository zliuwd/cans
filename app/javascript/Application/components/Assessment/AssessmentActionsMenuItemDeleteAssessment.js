import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentStatus } from './AssessmentHelper'

class AssessmentActionsMenuItemDeleteAssessment extends React.Component {
  deleteSelect = () => {
    const { toggleModal, togglePopover } = this.props
    toggleModal()
    togglePopover()
  }

  canDeleteAssessment() {
    if (!this.props.assessmentMetaData || !this.props.assessmentMetaData.allowed_operations) {
      return false
    }

    const { allowed_operations: allowedOperations } = this.props.assessmentMetaData
    const { assessmentStatus } = this.props

    return allowedOperations.includes('delete') && assessmentStatus !== AssessmentStatus.deleted
  }

  render() {
    return this.canDeleteAssessment() ? (
      <button className={'delete-assessment-button'} onClick={this.deleteSelect} role={'menuitem'}>
        Delete CANS
      </button>
    ) : null
  }
}

AssessmentActionsMenuItemDeleteAssessment.propTypes = {
  assessmentMetaData: PropTypes.shape({ allowed_operations: PropTypes.array }).isRequired,
  assessmentStatus: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  togglePopover: PropTypes.func.isRequired,
}

export default AssessmentActionsMenuItemDeleteAssessment
