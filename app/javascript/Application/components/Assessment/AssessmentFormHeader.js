import React, { PureComponent, Fragment } from 'react'
import { Row, Col, Label } from 'reactstrap'
import { resetConfidentialByDefaultItems, AssessmentStatus } from './AssessmentHelper'
import { clientCaseReferralNumber, formatClientName } from '../Client/Client.helper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { clone, stringify } from '../../util/common'
import './style.sass'
import DateField from '../common/DateField'
import ConductedByField from './AssessmentFormHeader/ConductedByField'
import HasCaregiverQuestion from './AssessmentFormHeader/HasCaregiverQuestion'
import ConfidentialityAlert from './AssessmentFormHeader/ConfidentialityAlert'
import UnderSixQuestion from './AssessmentFormHeader/UnderSixQuestion'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { calculateDateDifferenceInYears, isoToLocalDate, isValidDate } from '../../util/dateHelper'
import moment from 'moment/moment'

class AssessmentFormHeader extends PureComponent {
  handleValueChange = event => this.changeFieldAndUpdateAssessment(event.target.name, event.target.value)

  handleHasCaregiverSwitcher = event => {
    event.preventDefault()
    this.props.handleWarningShow(true, null)
  }

  handleHasCaregiverChange = event =>
    this.changeFieldAndUpdateAssessment(event.target.name, event.target.value === 'true')

  changeFieldAndUpdateAssessment(name, value) {
    const assessment = clone(this.props.assessment)
    assessment[name] = value
    this.props.onAssessmentUpdate(assessment)
  }

  handleCanReleaseInfoChange = event => {
    const canReleaseInfo = event.target.value === 'true'
    const assessment = clone(this.props.assessment)
    assessment.can_release_confidential_info = canReleaseInfo
    if (!canReleaseInfo) {
      resetConfidentialByDefaultItems(assessment)
    }
    this.props.onAssessmentUpdate(assessment)
  }

  handleConductedByChange = event => {
    const assessment = clone(this.props.assessment)
    assessment.conducted_by = event.target.value
    this.props.onAssessmentUpdate(assessment)
  }

  updateUnderSix = value => {
    const assessment = clone(this.props.assessment)
    assessment.state.under_six = value
    this.props.onAssessmentUpdate(assessment)
  }

  renderClientName() {
    const { first_name: firstName, last_name: lastName, dob, estimated_dob: estimatedDob } = this.props.client
    return (
      <div>
        {firstName && lastName ? (
          <div>
            <div className={'child-name-block'}>
              <span id={'child-name'}>{formatClientName(this.props.client)}</span>
            </div>
            <div className={'helper-text'}>
              <span id={'child-age'}>{this.formatClientAge(dob)}</span>
            </div>
            <div className={'helper-text'}>
              <span id={'child-dob'}>{this.formatClientDob(dob, estimatedDob)}</span>
            </div>
          </div>
        ) : (
          <div className={'child-name-block'}>
            <span id={'no-data'}>Client Info</span>
          </div>
        )}
      </div>
    )
  }

  formatClientAge(dob) {
    return isValidDate(dob) ? `${calculateDateDifferenceInYears(dob, this.getCurrentDate())} years old` : ''
  }

  getCurrentDate() {
    return moment()
  }

  formatClientDob(dob, estimatedDob) {
    return isValidDate(dob) ? `DOB: ${isoToLocalDate(dob)}${estimatedDob ? ' (approx.)' : ''}` : ''
  }

  renderCounty() {
    const county = this.props.assessment.county || {}
    const countyName = county.name ? `${county.name} County` : ''
    return (
      countyName && (
        <div id={'county-name'} className={'county-name-block'}>
          {countyName}
        </div>
      )
    )
  }

  renderDateSelect() {
    const { assessment, onEventDateFieldKeyUp, disabled, isEventDateBeforeDob } = this.props
    return (
      <DateField
        required={true}
        id={'assessment-date'}
        value={assessment.event_date}
        onChange={value => this.changeFieldAndUpdateAssessment('event_date', value)}
        onRawValueUpdate={onEventDateFieldKeyUp}
        ariaLabelledBy={'assessment-date-label'}
        disabled={disabled}
        isValid={!isEventDateBeforeDob}
        validationErrorMessage={'Enter an assessment date that is on or after the client’s date of birth.'}
      />
    )
  }

  renderCaseNumber() {
    return (
      <Fragment>
        <div id={'case-or-referral-number'} className={'assessment-form-header-case-or-referral-number'}>
          {this.props.assessment.service_source_ui_id}
        </div>
      </Fragment>
    )
  }

  renderHasCaregiverQuestion() {
    const hasCaregiver = (this.props.assessment || {}).has_caregiver
    return (
      <HasCaregiverQuestion
        hasCaregiver={hasCaregiver}
        onHasCaregiverChange={this.handleHasCaregiverChange}
        onHasCaregiverNoClicked={this.handleHasCaregiverSwitcher}
        disabled={this.props.disabled}
      />
    )
  }

  renderCanReleaseInfoQuestion() {
    const canReleaseConfidentialInfo = (this.props.assessment || {}).can_release_confidential_info
    return (
      <Fragment>
        <Typography id={'can-release-label'} variant="headline" classes={{ root: 'assessment-form-header-label' }}>
          Authorization for release of information on file?
        </Typography>
        <FormControl id={'can-release-control'} disabled={this.props.disabled}>
          <fieldset>
            <legend />
            <RadioGroup
              name={'can_release_confidential_info'}
              value={stringify(canReleaseConfidentialInfo)}
              onChange={this.handleCanReleaseInfoChange}
              className={'assessment-form-header-radio-group'}
            >
              <FormControlLabel
                value={stringify(true)}
                control={
                  <Radio
                    color="default"
                    inputProps={{
                      id: 'input-can-release-yes',
                      'aria-labelledby': 'can-release-label',
                    }}
                  />
                }
                label={'Yes'}
                classes={{ label: 'assessment-form-header-label' }}
              />
              <FormControlLabel
                value={stringify(false)}
                control={
                  <Radio
                    color="default"
                    inputProps={{
                      id: 'input-can-release-no',
                      'aria-labelledby': 'can-release-label',
                    }}
                  />
                }
                label={'No'}
                classes={{ label: 'assessment-form-header-label' }}
              />
            </RadioGroup>
          </fieldset>
        </FormControl>
      </Fragment>
    )
  }

  renderCardHeader() {
    return (
      <CardHeader
        title={
          <div className={'assessment-header-title'}>
            {this.renderClientName()}
            {this.renderCounty()}
          </div>
        }
        className={'assessment-header-card-header'}
      />
    )
  }

  renderTopLabels() {
    return (
      <Row>
        <Col sm={2}>
          <Label
            required
            id={'assessment-date-label'}
            className={'assessment-form-header-label'}
            htmlFor="assessment-date_input"
          >
            Assessment Date *
          </Label>
        </Col>
        <Col sm={3}>
          <Label className={'assessment-form-header-label'}>Select CANS Template *</Label>
        </Col>
        <Col sm={4}>
          <Label for={'conducted-by'} className={'assessment-form-header-label'}>
            Assessment Conducted by
          </Label>
        </Col>
        <Col sm={3}>
          <Label
            id={'case-or-referral-number-label'}
            htmlFor={'case-or-referral-number'}
            className={'assessment-form-header-label'}
          >
            {clientCaseReferralNumber(this.props.assessment.service_source)}
          </Label>
        </Col>
      </Row>
    )
  }

  renderCardContent() {
    return (
      <CardContent>
        {this.renderTopLabels()}
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={2}>{this.renderDateSelect()}</Col>
          <Col xs={3}>
            <UnderSixQuestion
              isUnderSix={this.props.assessment.state.under_six}
              onChange={this.updateUnderSix}
              disabled={this.props.disabled}
            />
          </Col>
          <Col sm={4}>
            <ConductedByField
              id={'conducted-by'}
              value={this.props.assessment.conducted_by}
              onChange={this.handleConductedByChange}
              disabled={this.props.assessment.status === AssessmentStatus.completed || this.props.disabled}
            />
          </Col>
          <Col sm={3}>{this.renderCaseNumber()}</Col>
        </Row>
        <Row>
          <Col sm={2}>{this.renderHasCaregiverQuestion()}</Col>
          <Col xs={3}>{this.renderCanReleaseInfoQuestion()}</Col>
        </Row>

        <Row className={'authorization-warning'}>
          <Col xs={3} />
          <Col xs={8}>
            <ConfidentialityAlert
              canReleaseInformation={Boolean(this.props.assessment.can_release_confidential_info)}
              isUnderSix={this.props.assessment.state.under_six}
            />
          </Col>
        </Row>
      </CardContent>
    )
  }

  render() {
    return (
      <Fragment>
        <Card className={'assessment-form-header-card'}>
          {this.renderCardHeader()}
          {this.renderCardContent()}
        </Card>
      </Fragment>
    )
  }
}
AssessmentFormHeader.defaultProps = {
  disabled: false,
  isEventDateBeforeDob: false,
  onEventDateFieldKeyUp: () => {},
  handleWarningShow: () => {},
}
AssessmentFormHeader.propTypes = {
  assessment: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  handleWarningShow: PropTypes.func,
  isEventDateBeforeDob: PropTypes.bool,
  onAssessmentUpdate: PropTypes.func.isRequired,
  onEventDateFieldKeyUp: PropTypes.func,
}

export default AssessmentFormHeader
