import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from '@cwds/components'
import AssessmentActionsMenu from './AssessmentActionsMenu'
import AssessmentDeleteModal from './AssessmentDeleteModal'

class AssessmentActionsEllipsis extends React.Component {
  state = { isPopoverOpen: false, isDeleteAssessmentWarningShown: false }

  toggleModal = () => {
    this.setState({
      isDeleteAssessmentWarningShown: !this.state.isDeleteAssessmentWarningShown,
    })
  }

  togglePopover = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    })
  }

  render() {
    const { isPopoverOpen, isDeleteAssessmentWarningShown } = this.state
    const {
      date,
      clientId,
      assessmentCounty,
      assessmentId,
      assessmentMetaData,
      assessmentStatus,
      inheritUrl,
      updateAssessmentHistoryCallback,
    } = this.props

    return (
      <React.Fragment>
        <AssessmentDeleteModal
          date={date}
          isShown={isDeleteAssessmentWarningShown}
          assessmentCounty={assessmentCounty}
          assessmentId={assessmentId}
          toggleModal={this.toggleModal}
          updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
        />
        <div>
          <Button
            id={`icon-${assessmentId}`}
            className="icon-ellipsis"
            type="button"
            aria-label="Ellipsis Menu Button"
            onClick={this.togglePopover}
          >
            <Icon icon="ellipsis-v" />
          </Button>
          <AssessmentActionsMenu
            clientId={clientId}
            assessmentId={assessmentId}
            assessmentMetaData={assessmentMetaData}
            assessmentStatus={assessmentStatus}
            toggleModal={this.toggleModal}
            togglePopover={this.togglePopover}
            isPopoverOpen={isPopoverOpen}
            inheritUrl={inheritUrl}
          />
        </div>
      </React.Fragment>
    )
  }
}

AssessmentActionsEllipsis.propTypes = {
  assessmentCounty: PropTypes.string.isRequired,
  assessmentId: PropTypes.number.isRequired,
  assessmentMetaData: PropTypes.shape({
    allowed_operations: PropTypes.array,
  }).isRequired,
  assessmentStatus: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

export default AssessmentActionsEllipsis
