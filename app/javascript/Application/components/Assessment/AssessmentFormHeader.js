import React, { Component, Fragment } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import { defaultEmptyAssessment } from './AssessmentHelper';
import { Alert } from '@cwds/components';
import { clone } from 'lodash';

import './style.sass';

const fields = Object.freeze({
  CAN_RELEASE_CONFIDENTIAL_INFO: 'can_release_confidential_info',
  HAS_CAREGIVER: 'has_caregiver',
  EVENT_DATE: 'event_date',
  COMPLETED_AS: 'completed_as',
});

class AssessmentFormHeader extends Component {
  handleValueChange = event => {
    const { name, value } = event.target;
    const assessment = clone(this.props.assessment);
    assessment[name] = value;
    this.props.onAssessmentUpdate(assessment);
  };

  handleHasCaregiverChange = event => {
    const { name, value } = event.target;
    const hasCaregiver = value === 'true';
    const assessment = clone(this.props.assessment);
    assessment[name] = hasCaregiver;
    this.props.onAssessmentUpdate(assessment);
  };

  handleCanReleaseInfoChange = event => {
    const { name, value } = event.target;
    const canReleaseInfo = value === 'true';
    const assessment = clone(this.props.assessment);
    assessment[name] = canReleaseInfo;
    if (!canReleaseInfo) {
      assessment.state.domains.map(domain => {
        domain.items.map(item => {
          if (item.confidential_by_default) {
            item.confidential = true;
          }
        });
      });
    }
    this.props.onAssessmentUpdate(assessment);
  };

  toggleUnderSix = () => {
    const assessment = clone(this.props.assessment);
    assessment.state.under_six = !assessment.state.under_six;
    this.props.onAssessmentUpdate(assessment);
  };

  renderHasCaregiverQuestion() {
    const assessment = this.props.assessment || {};
    const hasCaregiver = assessment.has_caregiver;
    return (
      <Fragment>
        <Col sm={12}>
          <Typography variant="headline" classes={{ root: 'can-release-label' }}>
            Child/Youth has Caregiver?
          </Typography>
        </Col>
        <Col sm={12}>
          <FormControl>
            <RadioGroup
              name={fields.HAS_CAREGIVER}
              value={'' + hasCaregiver}
              onChange={this.handleHasCaregiverChange}
              className={'assessment-form-radio-group'}
            >
              <FormControlLabel
                value={'' + true}
                control={<Radio color="default" />}
                label={'Yes'}
              />
              <FormControlLabel
                value={'' + false}
                control={<Radio color="default" />}
                label={'No'}
              />
            </RadioGroup>
          </FormControl>
        </Col>
      </Fragment>
    );
  }

  renderCanReleaseInfoQuestion() {
    const assessment = this.props.assessment || {};
    const canReleaseConfidentialInfo = assessment.can_release_confidential_info;
    return (
      <Fragment>
        <Col sm={12}>
          <Typography variant="headline" classes={{ root: 'can-release-label' }}>
            Authorization for release of information on file?
          </Typography>
        </Col>
        <Col sm={12}>
          <FormControl>
            <RadioGroup
              name={fields.CAN_RELEASE_CONFIDENTIAL_INFO}
              value={'' + canReleaseConfidentialInfo}
              onChange={this.handleCanReleaseInfoChange}
              className={'assessment-form-radio-group'}
            >
              <FormControlLabel
                value={'' + true}
                control={<Radio color="default" />}
                label={'Yes'}
              />
              <FormControlLabel
                value={'' + false}
                control={<Radio color="default" />}
                label={'No'}
              />
            </RadioGroup>
          </FormControl>
          {!canReleaseConfidentialInfo && (
            <Alert color={'warning'}>
              Prior to sharing the CANS assessment redact item number 7, 48, EC.41 and EC.18
            </Alert>
          )}
        </Col>
      </Fragment>
    );
  }

  renderClientName() {
    const client = this.props.client;
    const firstName = client.first_name;
    const lastName = client.last_name;
    return (
      <Fragment>
        {firstName && lastName ? (
          <Col sm={12}>
            <span id={'child-name'}>{lastName + ', ' + firstName}</span>
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
    const assessment = this.props.assessment;
    const eventDate = assessment.event_date;
    const completedAs = assessment.completed_as;
    const assessmentState = assessment.state;
    const isUnderSix = assessmentState.under_six;
    return (
      <Fragment>
        <Row>{this.renderClientName()}</Row>
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={4}>
            <Label for={'date-select'}>Date</Label>
            <Input
              type={'date'}
              id={'date-select'}
              name={fields.EVENT_DATE}
              value={eventDate}
              onChange={this.handleValueChange}
            />
          </Col>
          <Col sm={4}>
            <Label for={'select-user'}>Complete as</Label>
            <Input
              type={'select'}
              name={fields.COMPLETED_AS}
              id={'select-user'}
              value={completedAs}
              onChange={this.handleValueChange}
            >
              <option value={'COMMUNIMETRIC'}>Communimetric</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>{this.renderHasCaregiverQuestion()}</Col>
          <Col xs={6}>{this.renderCanReleaseInfoQuestion()}</Col>
        </Row>
        <Typography variant="body1" style={{ textAlign: 'right' }}>
          Age: 0-5
          <FormControlLabel
            control={
              <Switch checked={!isUnderSix} value={'' + isUnderSix} onChange={this.toggleUnderSix} color="default" />
            }
            label="6-21"
            style={{ marginLeft: '0px' }}
          />
        </Typography>
      </Fragment>
    );
  }
}

AssessmentFormHeader.propTypes = {
  client: PropTypes.object.isRequired,
  assessment: PropTypes.object.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
};

AssessmentFormHeader.defaultProps = {
  client: {},
  assessment: defaultEmptyAssessment,
};

export default AssessmentFormHeader;
