import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

import './style.sass';

class AssessmentFormFooter extends Component {
  render() {
    return (
      <Row className={'form-footer'}>
        <Col sm={3}>
          <Button>Cancel</Button>
        </Col>
        <Col sm={3}>
          <Button
            id={'save-assessment'}
            disabled={!this.props.assessmentDate}
            onClick={this.props.handleSaveAssessment}
          >
            Save
          </Button>
        </Col>
        <Col sm={3}>
          <Button>Submit</Button>
        </Col>
      </Row>
    );
  }
}

AssessmentFormFooter.propTypes = {
  assessmentDate: PropTypes.string,
  handleSaveAssessment: PropTypes.func,
};

export default AssessmentFormFooter;
