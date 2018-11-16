import React, { PureComponent, Fragment } from 'react'
import { Row, Col, Label } from 'reactstrap'
import { resetConfidentialByDefaultItems, AssessmentStatus } from './AssessmentHelper'
import { formatClientName } from '../Client/Client.helper'
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

  findCaseByExternalId = externalId => (this.props.client.cases || []).find(aCase => aCase.external_id === externalId)

  updateUnderSix = value => {
    const assessment = clone(this.props.assessment)
    assessment.state.under_six = value
    this.props.onAssessmentUpdate(assessment)
  }

  renderClientName() {
    const { first_name: firstName, last_name: lastName } = this.props.client
    return (
      <div className={'child-name-block'}>
        {firstName && lastName ? (
          <span id={'child-name'}>{formatClientName(this.props.client)}</span>
        ) : (
          <span id={'no-data'}>Client Info</span>
        )}
      </div>
    )
  }
  renderCounty() {
    const county = this.props.assessment.county || {}
    const countyName = county.name ? `${county.name} County` : ''
    return (
      <div>
        {countyName ? (
          <div className={'county-name-block'}>
            <span id={'county-name'}>{countyName}</span>
          </div>
        ) : null}
      </div>
    )
  }

  renderDateSelect() {
    return (
      <Fragment>
        <Label
          required
          id={'assessment-date-label'}
          className={'assessment-form-header-label'}
          htmlFor="assessment-date_input"
        >
          Assessment Date *
        </Label>
        <DateField
          required={true}
          id={'assessment-date'}
          value={this.props.assessment.event_date}
          onChange={value => this.changeFieldAndUpdateAssessment('event_date', value)}
          onKeyUp={this.props.onKeyUp}
          ariaLabelledBy={'assessment-date-label'}
        />
      </Fragment>
    )
  }

  renderCaseNumber() {
    return (
      <Fragment>
        <div htmlFor={'case-number'} className={'assessment-form-header-case-number-label'}>
          Case/Referral Number
        </div>
        <div id={'case-number'} className={'assessment-form-header-case-number'}>
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
        <FormControl>
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

  renderCardContent() {
    return (
      <CardContent
        style={{
          textAlign: 'left',
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: 'white',
        }}
      >
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={3}>{this.renderDateSelect()}</Col>
          <Col xs={3}>
            <UnderSixQuestion isUnderSix={this.props.assessment.state.under_six} onChange={this.updateUnderSix} />
          </Col>
          <Col sm={3}>
            <ConductedByField
              id={'conducted-by'}
              value={this.props.assessment.conducted_by}
              onChange={this.handleConductedByChange}
              isDisabled={this.props.assessment.status === AssessmentStatus.completed}
            />
          </Col>
          <Col sm={3}>{this.renderCaseNumber()}</Col>
        </Row>
        <Row>
          <Col xs={6}>{this.renderHasCaregiverQuestion()}</Col>
          <Col xs={6}>{this.renderCanReleaseInfoQuestion()}</Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ConfidentialityAlert
              canReleaseInformation={Boolean(this.props.assessment.can_release_confidential_info)}
            />
          </Col>
        </Row>
      </CardContent>
    )
  }

  render() {
    return (
      <Fragment>
        <Card style={{ marginBottom: 20, marginLeft: 0, marginRight: 0 }} className={'assessment-header-date'}>
          <CardHeader
            title={this.renderClientName()}
            action={this.renderCounty()}
            className={'assessment-header-card-header'}
          />
          {this.renderCardContent()}
        </Card>
      </Fragment>
    )
  }
}
AssessmentFormHeader.defaultProps = {
  onKeyUp: () => {},
  handleWarningShow: () => {},
}
AssessmentFormHeader.propTypes = {
  assessment: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  handleWarningShow: PropTypes.func,
  onAssessmentUpdate: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
}

export default AssessmentFormHeader
