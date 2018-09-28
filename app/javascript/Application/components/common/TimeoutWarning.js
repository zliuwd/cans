import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { TIMEOUT_EVENT } from './../../util/constants';
import { eventBus } from './../../util/eventBus';
import { SecurityService } from './Security.service';

import './style.sass';
import { addTrailingSlash } from '../../util/formatters';

const logoutUrl = `${addTrailingSlash(process.env.CANS_BASE_PATH)}user/logout`;

export class TimeoutWarning extends Component {
  constructor(context) {
    super(context);
    this.state = {
      isOpened: false,
    };
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);
    this.onTimeoutEvent = this.onTimeoutEvent.bind(this);
  }

  componentDidMount() {
    eventBus.subscribe(TIMEOUT_EVENT, this.onTimeoutEvent);
  }

  onTimeoutEvent() {
    this.setState({
      isOpened: true,
    });
  }

  refresh() {
    SecurityService.refresh();
    this.setState({
      isOpened: false,
    });
  }

  logout() {
    window.location.href = logoutUrl;
  }

  render() {
    return (
      <Modal isOpen={this.state.isOpened}>
        <ModalBody>
          <div>Due to inactivity your session is about to timeout, would you like to continue?</div>
          <div>Any unsaved work will be lost.</div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.refresh}>
            Continue
          </Button>{' '}
          <Button color="secondary" onClick={this.logout}>
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TimeoutWarning;
