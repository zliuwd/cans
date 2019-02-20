import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UNSAVED_ASSESSMENT_VALIDATION_EVENT } from '../../util/constants'
import { eventBus } from '../../util/eventBus'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Icon } from '@cwds/components'
import { disableUnsavedValidation } from '../Assessment/AssessmentHelper'
import { breadCrumbOnClickHandler } from '../Layout/BreadCrumb/BreadCrumb'

class UnsavedDataWarning extends Component {
  constructor(context) {
    super(context)
    this.state = {
      isOpened: false,
    }
    this.close = this.close.bind(this)
    this.onAction = this.onAction.bind(this)
    this.onValidation = this.onValidation.bind(this)
    this.onBreadCrumbsClick = this.onBreadCrumbsClick.bind(this)
    this.continueAction = this.continueAction.bind(this)
  }

  componentDidMount() {
    breadCrumbOnClickHandler.onClick = this.onBreadCrumbsClick
    eventBus.subscribe(UNSAVED_ASSESSMENT_VALIDATION_EVENT, this.onValidation)
  }

  componentWillUnmount() {
    eventBus.unsubscribe(UNSAVED_ASSESSMENT_VALIDATION_EVENT, this.onValidation)
    breadCrumbOnClickHandler.onClick = event => {}
  }

  close() {
    this.setState({ isOpened: false, event: undefined })
  }

  onValidation(event) {
    if (this.props.isUnsaved) {
      this.setState({ isOpened: true, event })
    } else {
      eventBus.post(event)
    }
  }

  onBreadCrumbsClick(event) {
    if (this.props.isUnsaved) {
      event.preventDefault()
      this.setState({ isOpened: true, href: event.target.href })
    }
  }

  onAction(action) {
    action().then(() => {
      this.continueAction()
      this.close()
    })
  }

  continueAction() {
    if (this.state.event !== undefined) {
      eventBus.post(this.state.event)
    } else {
      disableUnsavedValidation()
      window.location.assign(this.state.href)
    }
  }

  render() {
    return (
      <Modal className="warning-modal" isOpen={this.state.isOpened}>
        <ModalBody className="unsaved-warning-modal-body">
          <div className={'unsaved-warning-modal-icon'}>
            <Icon size={'2x'} name={'exclamation-triangle'} color={'danger'} />
          </div>
          <div className={'unsaved-warning-modal-info'}>
            <div className="unsaved-warning-modal-heading">{'Navigation Warning'}</div>
            <div className={'unsaved-warning-modal-body-message'}>
              {'You have unsaved changes that will be lost if you leave this page now.'}
            </div>
            <div className={'unsaved-modal-body-message'}>{'What would you like to do?'}</div>
          </div>
        </ModalBody>

        <ModalFooter className="warning-modal-footer">
          <Button className={'unsaved-warning-modal-discard'} onClick={this.close}>
            {'Return to the assessment'}
          </Button>
          <Button
            className={'unsaved-warning-modal-save'}
            onClick={() => {
              this.onAction(this.props.saveAndContinue)
            }}
          >
            {'SAVE CHANGES AND CONTINUE'}
          </Button>
        </ModalFooter>
        <ModalFooter className="warning-modal-footer">
          <Button
            className={'unsaved-warning-modal-discard'}
            onClick={() => {
              this.onAction(this.props.discardAndContinue)
            }}
          >
            {'Discard changes and continue'}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

UnsavedDataWarning.propTypes = {
  discardAndContinue: PropTypes.func.isRequired,
  isUnsaved: PropTypes.bool.isRequired,
  saveAndContinue: PropTypes.func.isRequired,
}

UnsavedDataWarning.defaultProps = {}

export default UnsavedDataWarning
