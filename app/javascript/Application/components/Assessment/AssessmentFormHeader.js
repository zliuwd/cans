import React, { PureComponent } from 'react'
import { resetConfidentialByDefaultItems } from './AssessmentHelper'
import PropTypes from 'prop-types'
import { clone } from '../../util/common'
import './style.sass'
import AssessmentOptions from './AssessmentFormHeader/AssessmentOptions'
import { Card, CardBody } from '@cwds/components'
import { LoadingState } from '../../util/loadingHelper'
import ConductedBy from './AssessmentFormHeader/ConductedBy'
import AssessmentFormHeaderTitle from './AssessmentFormHeader/AssessmentFormHeaderTitle'
import DateAndTemplate from './AssessmentFormHeader/DateAndTemplate'

class AssessmentFormHeader extends PureComponent {
  handleValueChange = event => this.changeFieldAndUpdateAssessment(event.target.name, event.target.value)

  handleEventDateChange = value => this.changeFieldAndUpdateAssessment('event_date', value)

  handleHasCaregiverSwitcher = event => {
    event.preventDefault()
    this.props.handleWarningShow(true, null)
  }

  handleHasCaregiverChange = event => {
    const enableCaregiver = event.target.value === 'true'
    if (enableCaregiver) {
      // No Caregiver state is handled through modal
      this.changeFieldAndUpdateAssessment(event.target.name, enableCaregiver)
    }
  }

  changeFieldAndUpdateAssessment(name, value) {
    const assessment = clone(this.props.assessment)
    assessment[name] = value
    this.props.onAssessmentUpdate(assessment)
  }

  handleCanReleaseInfoChange = event => {
    const canReleaseInfo = event.target.value === 'true'
    const assessment = clone(this.props.assessment)
    assessment.can_release_confidential_info = canReleaseInfo
    resetConfidentialByDefaultItems(assessment, !canReleaseInfo)
    this.props.onAssessmentUpdate(assessment)
  }

  updateUnderSixAndAllDomainsExpand = value => {
    const assessment = clone(this.props.assessment)
    assessment.state.under_six = value
    this.props.onAssessmentUpdate(assessment)
  }

  renderCardHeader() {
    const county = this.props.assessment.county || {}
    const countyName = county.name ? `${county.name} County` : ''
    const isAssessmentReady = this.props.assessmentServiceStatus === LoadingState.ready
    const { first_name: firstName, last_name: lastName, dob, estimated_dob: estimatedDob } = this.props.client

    return (
      <AssessmentFormHeaderTitle
        countyName={countyName}
        dob={dob}
        estimatedDob={estimatedDob}
        firstName={firstName}
        isAssessmentReady={isAssessmentReady}
        lastName={lastName}
        serviceSource={this.props.assessment.service_source}
        serviceSourceUIId={this.props.assessment.service_source_ui_id}
      />
    )
  }

  renderCardContent() {
    const { assessment, disabled, isEventDateBeforeDob, onEventDateFieldKeyUp } = this.props
    const hasCaregiver = (assessment || {}).has_caregiver
    const canReleaseInfo = (assessment || {}).can_release_confidential_info
    return (
      <CardBody>
        <DateAndTemplate
          disabled={disabled}
          eventDate={assessment.event_date}
          isEventDateBeforeDob={isEventDateBeforeDob}
          isUnderSix={assessment.state.under_six}
          onEventDateFieldKeyUp={onEventDateFieldKeyUp}
          onEventDateChange={this.handleEventDateChange}
          onAgeTemplateChange={this.updateUnderSixAndAllDomainsExpand}
        />
        <ConductedBy
          disabled={this.props.disabled}
          assessment={assessment}
          onAssessmentUpdate={this.props.onAssessmentUpdate}
        />
        <AssessmentOptions
          canReleaseConfidentialInfo={canReleaseInfo}
          hasCaregiver={hasCaregiver}
          isDisabled={disabled}
          isUnderSix={assessment.state.under_six}
          onCanReleaseInfoChange={this.handleCanReleaseInfoChange}
          onHasCaregiverChange={this.handleHasCaregiverChange}
          onHasCaregiverNoClicked={this.handleHasCaregiverSwitcher}
          substanceUseItemsIds={this.props.substanceUseItemsIds}
        />
      </CardBody>
    )
  }

  render() {
    return (
      <Card className="assessment-form-header-card">
        {this.renderCardHeader()}
        {this.renderCardContent()}
      </Card>
    )
  }
}
AssessmentFormHeader.defaultProps = {
  disabled: false,
  isEventDateBeforeDob: false,
}
AssessmentFormHeader.propTypes = {
  assessment: PropTypes.object.isRequired,
  assessmentServiceStatus: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  handleWarningShow: PropTypes.func.isRequired,
  isEventDateBeforeDob: PropTypes.bool,
  onAssessmentUpdate: PropTypes.func.isRequired,
  onEventDateFieldKeyUp: PropTypes.func.isRequired,
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

export default AssessmentFormHeader
