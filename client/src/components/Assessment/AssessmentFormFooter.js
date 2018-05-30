import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import './style.css';

class AssessmentFormFooter extends Component {
  render() {
    return (
      <Row className={'form-footer'}>
        <Col sm={3}>
          <Button>Cancel</Button>
        </Col>
        <Col sm={3}>
          <Button>Save</Button>
        </Col>
        <Col sm={3}>
          <Button>Submit</Button>
        </Col>
      </Row>
    );
  }
}

export default AssessmentFormFooter;
