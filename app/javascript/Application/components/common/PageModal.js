import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import '../../styles/global/modal-styles.sass'

const PageModal = ({
  title,
  warningDescription,
  description,
  onCancel,
  onNextStep,
  cancelButtonLabel,
  nextStepButtonLabel,
  isNextStepDisabled = false,
  isOpen,
  children,
}) => (
  <Modal className="warning-modal" isOpen={isOpen}>
    <ModalBody className="warning-modal-body">
      <div className="warning-modal-heading">{title}</div>
      <div>{warningDescription}</div>
      <div>{description}</div>
      <div>{children}</div>
    </ModalBody>
    <ModalFooter className="warning-modal-footer">
      <Button className="warning-modal-logout" onClick={onCancel}>
        {cancelButtonLabel}
      </Button>
      <Button className="warning-modal-stay-logged-in" onClick={onNextStep} disabled={isNextStepDisabled}>
        {nextStepButtonLabel}
      </Button>
    </ModalFooter>
  </Modal>
)

PageModal.propTypes = {
  cancelButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.array,
  description: PropTypes.node.isRequired,
  isNextStepDisabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  nextStepButtonLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  warningDescription: PropTypes.node.isRequired,
}

PageModal.defaultProps = {
  children: null,
  isNextStepDisabled: false,
  isOpen: true,
}
export default PageModal
