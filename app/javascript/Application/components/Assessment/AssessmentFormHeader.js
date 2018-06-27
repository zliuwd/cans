import React, { Component, Fragment } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Alert } from '@cwds/components'

import './style.sass';

class AssessmentFormHeader extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    clientFirstName: PropTypes.string.isRequired,
    clientLastName: PropTypes.string.isRequired,
    assessmentDate: PropTypes.string.isRequired,
    assessmentCompletedAs: PropTypes.string.isRequired,
    canReleaseInformation: PropTypes.bool.isRequired,
  };

  static parseCanReleaseInfo(event) {
    const isCanReleaseInfo = event.target.name === 'can_release_confidential_info';
    const booleanValue = isCanReleaseInfo && event.target.value === 'true';
    return isCanReleaseInfo ? booleanValue : event.target.value;
  }

  handleValueChange = (event) => {
    const value = AssessmentFormHeader.parseCanReleaseInfo(event);
    this.props.onValueChange(event.target.name, value);
  };

  renderWarningAlert() {
    if (!this.props.canReleaseInformation) {
      return <Alert color={'warning'}>Prior to sharing the CANS assessment redact item number 7, 48, EC.41 and EC.18</Alert>
    }
  }

  renderCanReleaseInfoQuestion() {
    return (
      <Fragment>
        <Col sm={12}>
          <Typography variant="headline" classes={{ root: 'can-release-label' }}>
            Authorization for release of information on file?
          </Typography>
        </Col>
        <Col sm={12}>
          <FormControl>
            <RadioGroup name="can_release_confidential_info" value={this.props.canReleaseInformation}
                        onChange={this.handleValueChange} className={'can-release-radio-group'}>
              <FormControlLabel value={true} control={<Radio color="default"/>} label={'Yes'} classes={{label: 'can-release-radio-label'}}/>
              <FormControlLabel value={false} control={<Radio color="default"/>} label={'No'} classes={{label: 'can-release-radio-label'}}/>
            </RadioGroup>
          </FormControl>
          {this.renderWarningAlert()}
        </Col>
      </Fragment>
    );
  }

  renderClientName() {
    const { clientFirstName, clientLastName } = this.props;
    return (
      <Fragment>
        {clientFirstName && clientLastName ? (
          <Col sm={12}>
            <span id={'child-name'}>
              {clientLastName + ', ' + clientFirstName}
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
            <Label for={'date-select'}>Date</Label>
            <Input
              type={'date'}
              id={'date-select'}
              name={'event_date'}
              value={this.props.assessmentDate}
              onChange={this.handleValueChange}
            />
          </Col>
          <Col sm={4}>
            <Label for={'select-user'}>Complete as</Label>
            <Input
              type={'select'}
              name={'completed_as'}
              id={'select-user'}
              value={this.props.assessmentCompletedAs}
              onChange={this.handleValueChange}
            >
              <option value={'COMMUNIMETRIC'}>Communimetric</option>
            </Input>

          </Col>
        </Row>
        <Row>{this.renderCanReleaseInfoQuestion()}</Row>
      </Fragment>
    )
  }
}

AssessmentFormHeader.defaultProps = {
  clientFirstName: '',
  clientLastName: '',
  assessmentDate: '',
  assessmentCompletedAs: '',
  canReleaseInformation: false,
};

export default AssessmentFormHeader;
