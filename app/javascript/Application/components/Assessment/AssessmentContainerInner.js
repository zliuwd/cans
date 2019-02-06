import React, { Component, Fragment } from 'react'
import Assessment from './Assessment'
import PropTypes from 'prop-types'
import AssessmentSummaryCard from './AssessmentSummary/AssessmentSummaryCard'
import { LoadingState, isReadyForAction } from '../../util/loadingHelper'
import { AssessmentFormHeader, AssessmentFormFooter } from './'
import { completeTip } from './AssessmentHelper'
import RenderWarning from '../common/RenderWarning'
import WarningShow from '../Assessment/WarningShow'
import { isCompleteAssessmentAuthorized } from '../common/AuthHelper'

class AssessmentContainerInner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCaregiverWarningShown: false,
      focusedCaregiverId: '',
    }
  }

  handleWarningShow = (switcher, caregiverIndex) => {
    caregiverIndex = caregiverIndex || null
    this.setState({
      isCaregiverWarningShown: switcher,
      focusedCaregiverId: caregiverIndex,
    })
  }

  displayModalWarning() {
    const { handleCaregiverRemove, isSubmitWarningShown, handleSubmitWarning, handleSubmitAssessment } = this.props
    return (
      <Fragment>
        <RenderWarning
          isCaregiverWarningShown={this.state.isCaregiverWarningShown}
          handleWarningShow={this.handleWarningShow}
          handleCaregiverRemove={handleCaregiverRemove}
          focusedCaregiverId={this.state.focusedCaregiverId}
        />
        <WarningShow
          isSubmitWarningShown={isSubmitWarningShown}
          handleSubmitWarning={handleSubmitWarning}
          handleSubmitAssessment={handleSubmitAssessment}
        />
      </Fragment>
    )
  }

  displayAssessment() {
    const {
      client,
      assessment,
      onAssessmentUpdate,
      onEventDateFieldKeyUp,
      isEventDateBeforeDob,
      canDisplaySummaryOnSave,
      i18n,
      isEditable,
    } = this.props
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    return (
      <Fragment>
        <div rol="completeScrollLocator">
          <AssessmentFormHeader
            client={client}
            assessment={assessment}
            onAssessmentUpdate={onAssessmentUpdate}
            onEventDateFieldKeyUp={onEventDateFieldKeyUp}
            handleWarningShow={this.handleWarningShow}
            isCaregiverWarningShown={this.state.isCaregiverWarningShown}
            disabled={!isEditable}
            isEventDateBeforeDob={isEventDateBeforeDob}
          />
        </div>
        <AssessmentSummaryCard
          isSummaryAvailableOnSave={canDisplaySummaryOnSave}
          assessmentStatus={assessment.status}
          domains={assessment && assessment.state && assessment.state.domains}
          i18n={i18n}
          isUnderSix={Boolean(isUnderSix)}
          disabled={!isEditable}
        />
        <Assessment
          assessment={assessment}
          i18n={i18n}
          onAssessmentUpdate={onAssessmentUpdate}
          handleWarningShow={this.handleWarningShow}
          disabled={!isEditable}
        />
      </Fragment>
    )
  }
  displayAssessmentFooter() {
    const {
      assessment,
      client,
      assessmentServiceStatus,
      isEditable,
      onCancelClick,
      handleSubmitWarning,
      handleSubmitAssessment,
      isValidForSubmit,
    } = this.props
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    const canPerformUpdates = isReadyForAction(assessmentServiceStatus)
    const isCompleteButtonEnabled =
      isEditable && canPerformUpdates && isValidForSubmit && isCompleteAssessmentAuthorized(assessment, client)
    return (
      <Fragment>
        {isUnderSix !== undefined && isEditable ? (
          <AssessmentFormFooter
            assessment={assessment}
            onCancelClick={onCancelClick}
            isSubmitButtonEnabled={isCompleteButtonEnabled}
            onSubmitAssessment={
              assessment.can_release_confidential_info === true ? handleSubmitAssessment : handleSubmitWarning
            }
          />
        ) : null}
      </Fragment>
    )
  }
  render() {
    const { assessment, assessmentServiceStatus, isEditable } = this.props
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    return (
      <Fragment>
        {this.displayModalWarning()}
        {this.displayAssessment()}
        {LoadingState.ready === assessmentServiceStatus &&
          isEditable &&
          !(isUnderSix === null || isUnderSix === undefined) &&
          completeTip}
        {this.displayAssessmentFooter()}
      </Fragment>
    )
  }
}

AssessmentContainerInner.propTypes = {
  assessment: PropTypes.object.isRequired,
  assessmentServiceStatus: PropTypes.string.isRequired,
  canDisplaySummaryOnSave: PropTypes.bool,
  client: PropTypes.object.isRequired,
  handleCaregiverRemove: PropTypes.func.isRequired,
  handleSubmitAssessment: PropTypes.func.isRequired,
  handleSubmitWarning: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  isEditable: PropTypes.bool,
  isEventDateBeforeDob: PropTypes.bool.isRequired,
  isSubmitWarningShown: PropTypes.bool.isRequired,
  isUnderSix: PropTypes.bool,
  isValidForSubmit: PropTypes.bool.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onEventDateFieldKeyUp: PropTypes.func.isRequired,
}

AssessmentContainerInner.defaultProps = {
  canDisplaySummaryOnSave: false,
  focusedCaregiverId: null,
  isUnderSix: null,
  domains: [],
  isEditable: undefined,
}

export default AssessmentContainerInner
