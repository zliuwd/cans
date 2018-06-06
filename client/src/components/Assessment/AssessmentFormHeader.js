import React, { Component, Fragment } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

import './style.css';

class AssessmentFormHeader extends Component {
  renderClientName() {
    const { clientFirstName, clientLastName } = this.props;
    return (
      <Fragment>
        {clientFirstName && clientLastName ? (
          <Col sm={12}>
            <span id={'child-name'}>
              {clientFirstName + ' ' + clientLastName}
            </span>
          </Col>
        ) : (
          <Col sm={12}>
            <span id={'no-data'}>Client Info</span>
          </Col>
        )}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Row>{this.renderClientName()}</Row>
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={4}>
            <Label for="date-select">Date</Label>
            <Input type={'date'} id="date-select" />
          </Col>
          <Col sm={4}>
            <Label for="select-user">Complete as</Label>
            <Input type="select" name="select" id="select-user">
              <option>COMMUNIMETRIC (ENDORSED)</option>
            </Input>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default AssessmentFormHeader;
