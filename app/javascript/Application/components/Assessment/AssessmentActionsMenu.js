import React from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import AssessmentActionsMenuItemChangeLog from './AssessmentActionsMenuItemChangeLog'
import AssessmentActionsMenuItemDeleteAssessment from './AssessmentActionsMenuItemDeleteAssessment'

const AssessmentActionsMenu = props => {
  const {
    inheritUrl,
    clientId,
    assessmentId,
    assessmentStatus,
    assessmentMetaData,
    isPopoverOpen,
    togglePopover,
    toggleModal,
  } = props

  return (
    <Popover isOpen={isPopoverOpen} toggle={togglePopover} target={`icon-${assessmentId}`} placement="bottom-start">
      <PopoverBody className="popoverbody">
        <AssessmentActionsMenuItemChangeLog
          inheritUrl={inheritUrl}
          clientId={clientId}
          assessmentId={assessmentId}
          assessmentStatus={assessmentStatus}
        />
        <AssessmentActionsMenuItemDeleteAssessment
          assessmentStatus={assessmentStatus}
          assessmentMetaData={assessmentMetaData}
          togglePopover={togglePopover}
          toggleModal={toggleModal}
        />
      </PopoverBody>
    </Popover>
  )
}

AssessmentActionsMenu.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  assessmentMetaData: PropTypes.shape({ allowed_operations: PropTypes.array }).isRequired,
  assessmentStatus: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  isPopoverOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  togglePopover: PropTypes.func.isRequired,
}

export default AssessmentActionsMenu
