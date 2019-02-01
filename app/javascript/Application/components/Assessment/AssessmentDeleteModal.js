import React from 'react'
import PropTypes from 'prop-types'
import PageModal from '../common/PageModal'
import { AssessmentService } from '../Assessment'
import { Select, Label } from '@cwds/components'
import Comment from '../common/Comment'
import '../../styles/global/modal-styles.sass'
import {
  selectOptions,
  blankPlaceHolder,
  deleteWarningTitle,
  deleteWarningDescription,
  otherReasonLabel,
  reasonSelectLabel,
} from './AssessmentHelper'

const initialState = {
  showOtherReasonInput: false,
  otherReasonContent: '',
  selectedReason: blankPlaceHolder,
  isDeleteButtonDisabled: true,
}

class AssessmentDeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
  }

  handleWarningCancel = () => {
    this.setState({
      ...initialState,
    })
    this.props.toggleModal()
  }

  handleWarningDelete = async () => {
    const { assessmentId, toggleModal, updateAssessmentHistoryCallback } = this.props

    toggleModal()
    await AssessmentService.delete(assessmentId)
    updateAssessmentHistoryCallback()
  }

  handleSelectChange = selectedOption => {
    if (selectedOption.value === 'Other' && this.state.otherReasonContent === '') {
      this.setState({ showOtherReasonInput: true, selectedReason: selectedOption, isDeleteButtonDisabled: true })
    } else if (selectedOption.value === 'Other' && this.state.otherReasonContent !== '') {
      this.setState({ showOtherReasonInput: true, selectedReason: selectedOption })
    } else {
      this.setState({
        showOtherReasonInput: false,
        selectedReason: selectedOption,
        isDeleteButtonDisabled: false,
        otherReasonContent: '',
      })
    }
  }

  handleOtherReasonContentChange = content => {
    if (content !== '' && content !== this.state.otherReasonContent) {
      this.setState({ otherReasonContent: content, isDeleteButtonDisabled: false })
    }
    if (content === '') {
      this.setState({ otherReasonContent: content, isDeleteButtonDisabled: true })
    }
  }

  render() {
    const { date } = this.props
    const warning = <div>{deleteWarningTitle}</div>
    const otherReasonInput = (
      <div>
        <Label for={'other'} className={'delete-warning-label'}>
          {otherReasonLabel}
        </Label>
        <div className="other-delete-reason">
          <Comment
            id={'other'}
            comment={this.state.otherReasonContent}
            onChange={this.handleOtherReasonContentChange}
            onKeyUp={this.handleOtherReasonContentChange}
            prefix={'delete-reason'}
            maxCommentLength={56}
            isCommentIconDisabled={true}
          />
        </div>
      </div>
    )
    return (
      <PageModal
        isOpen={this.props.isShown}
        title={`Delete CANS Assessment - ${date}`}
        warningDescription={warning}
        description={deleteWarningDescription}
        nextStepButtonLabel={'Delete CANS'}
        cancelButtonLabel={'Cancel'}
        onCancel={this.handleWarningCancel}
        onNextStep={this.handleWarningDelete}
        isNextStepDisabled={this.state.isDeleteButtonDisabled}
      >
        <Label for={'reasonSelect'} className={'delete-warning-label'}>
          {reasonSelectLabel}
        </Label>
        <div className="delete-reason-select">
          <Select
            id={'reasonSelect'}
            classNamePrefix="list"
            options={selectOptions}
            value={this.state.selectedReason}
            onChange={this.handleSelectChange}
            isSearchable={false}
          />
        </div>
        {this.state.showOtherReasonInput ? otherReasonInput : null}
      </PageModal>
    )
  }
}

AssessmentDeleteModal.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

export default AssessmentDeleteModal
