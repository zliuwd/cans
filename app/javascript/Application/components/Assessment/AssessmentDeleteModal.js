import React from 'react'
import PropTypes from 'prop-types'
import PageModal from '../common/PageModal'
import { AssessmentService } from '../Assessment'

class AssessmentDeleteModal extends React.Component {
  handleWarningCancel = () => {
    this.props.toggleModal()
  }

  handleWarningDelete = async () => {
    const { assessmentId, toggleModal, updateAssessmentHistoryCallback } = this.props

    toggleModal()
    await AssessmentService.delete(assessmentId)
    updateAssessmentHistoryCallback()
  }

  render() {
    return (
      <PageModal
        isOpen={this.props.isShown}
        title="Deleting CANS Warning"
        warningDescription="You are attempting to delete this CANS."
        description="This cannot be undone."
        cancelButtonLabel="Cancel"
        removeButtonLabel="Delete CANS"
        onCancel={this.handleWarningCancel}
        onRemove={this.handleWarningDelete}
      />
    )
  }
}

AssessmentDeleteModal.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  isShown: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

export default AssessmentDeleteModal
