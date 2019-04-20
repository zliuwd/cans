import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, CardTitle, Modal, ModalHeader, ModalBody } from '@cwds/components'

const CaregiverDeleteWarning = ({
  isCaregiverWarningShown,
  handleWarningShow,
  handleCaregiverRemove,
  focusedCaregiverId,
}) => {
  return (
    <Modal id={'caregiver-delete-warning'} isOpen={isCaregiverWarningShown}>
      <ModalHeader>
        <CardTitle>Warning</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Alert id={'caregiver-delete-alert'} color="warning">
          You are about to remove the caregiver from this Assessment.
        </Alert>
        This may affect some of your entries.
      </ModalBody>

      <div className="p-3 text-right">
        <Button id={'caregiver-warning-cancel'} className="m-1" onClick={() => handleWarningShow(false)}>
          Cancel
        </Button>
        <Button
          id={'caregiver-warning-remove'}
          className="m-1"
          primary
          onClick={() => {
            handleWarningShow(false)
            handleCaregiverRemove(focusedCaregiverId)
          }}
        >
          Remove
        </Button>
      </div>
    </Modal>
  )
}

CaregiverDeleteWarning.propTypes = {
  focusedCaregiverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCaregiverRemove: PropTypes.func.isRequired,
  handleWarningShow: PropTypes.func.isRequired,
  isCaregiverWarningShown: PropTypes.bool.isRequired,
}

CaregiverDeleteWarning.defaultProps = {
  focusedCaregiverId: null,
}

export default CaregiverDeleteWarning
