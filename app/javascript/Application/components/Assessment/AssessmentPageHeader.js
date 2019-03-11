import React from 'react'
import PropTypes from 'prop-types'
import { PrintAssessment } from '../Print'
import { buildSaveAssessmentButton } from '../Header/PageHeaderButtonsBuilder'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import { handlePrintButtonEnabled, validateAssessmentEventDate } from './AssessmentHelper'
import { LoadingState, isReadyForAction } from '../../util/loadingHelper'

class AssessmentPageHeader extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isSaveButtonEnabled: this.isSaveable() }
  }

  componentDidMount() {
    this.initHeaderButtons(this.isSaveable())
  }

  componentDidUpdate() {
    const isSaveButtonEnabled = this.isSaveable()
    if (this.state.isSaveButtonEnabled !== isSaveButtonEnabled) {
      this.initHeaderButtons(isSaveButtonEnabled)
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isSaveButtonEnabled: isSaveButtonEnabled })
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  componentWillUnmount() {
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
  }

  initHeaderButtons(isSaveButtonEnabled) {
    const { assessment, i18n, isEditable, isValidDate, onSaveAssessment } = this.props
    const node = <PrintAssessment assessment={assessment} i18n={i18n} />
    const leftButton = isEditable ? buildSaveAssessmentButton(onSaveAssessment, isSaveButtonEnabled) : null
    const isPrintButtonEnabled = handlePrintButtonEnabled({ assessment, isValidDate })
    const rightButton = <PrintButton node={node} isEnabled={isPrintButtonEnabled} assessmentId={assessment.id} />
    this.props.pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  isSaveable() {
    const { assessment, clientDateOfBirth, isValidDate, isEditable, loadingState } = this.props
    return (
      assessment.state.under_six !== undefined &&
      isValidDate &&
      validateAssessmentEventDate(clientDateOfBirth, assessment.event_date) &&
      isEditable &&
      Boolean(assessment.event_date) &&
      isReadyForAction(loadingState)
    )
  }

  render() {
    // This component entirely operates through the pageHeaderButtonsController callbacks
    return null
  }
}

AssessmentPageHeader.propTypes = {
  assessment: PropTypes.shape({
    state: PropTypes.shape({
      under_six: PropTypes.bool,
    }).isRequired,
    event_date: PropTypes.string,
  }).isRequired,
  clientDateOfBirth: PropTypes.string.isRequired,
  i18n: PropTypes.any.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isValidDate: PropTypes.bool.isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)).isRequired,
  onSaveAssessment: PropTypes.func.isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

export default AssessmentPageHeader
