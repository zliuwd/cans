import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

import './style.sass';

class AssessmentFormFooter extends Component {
  render() {
    const { onCancelClick, saveButtonEnabled, onSaveAssessment, submitButtonEnabled, onSubmitAssessment } = this.props;
    return (
      <Row className={'form-footer'}>
        <Col sm={9}>
          <Button id={'cancel-assessment'} color={'link'} className={'cancel-button'} onClick={onCancelClick}>
            Cancel
          </Button>
          <Button id={'save-assessment'} color={'primary'} disabled={!saveButtonEnabled} onClick={onSaveAssessment}>
            Save
          </Button>
        </Col>
        <Col sm={3}>
          <Button
            id={'submit-assessment'}
            color={'primary'}
            disabled={!submitButtonEnabled}
            onClick={onSubmitAssessment}
          >
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}

AssessmentFormFooter.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  saveButtonEnabled: PropTypes.bool.isRequired,
  onSaveAssessment: PropTypes.func.isRequired,
  submitButtonEnabled: PropTypes.bool.isRequired,
  onSubmitAssessment: PropTypes.func.isRequired,
};

AssessmentFormFooter.defaultProps = {
  saveButtonEnabled: false,
  submitButtonEnabled: false,
};

export default AssessmentFormFooter;
