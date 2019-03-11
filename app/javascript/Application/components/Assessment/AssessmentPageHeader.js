import React from 'react'
import PropTypes from 'prop-types'
import { PrintAssessment } from '../Print'
import { buildSaveAssessmentButton } from '../Header/PageHeaderButtonsBuilder'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import { handlePrintButtonEnabled } from './AssessmentHelper'

class AssessmentPageHeader extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isSaveButtonEnabled: props.isSaveButtonEnabled }
  }

  componentDidMount() {
    this.initHeaderButtons(this.props.isSaveButtonEnabled)
  }

  componentDidUpdate() {
    if (this.state.isSaveButtonEnabled !== this.props.isSaveButtonEnabled) {
      this.initHeaderButtons(this.props.isSaveButtonEnabled)
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isSaveButtonEnabled: this.props.isSaveButtonEnabled })
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
  }).isRequired,
  i18n: PropTypes.any.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isSaveButtonEnabled: PropTypes.bool.isRequired,
  isValidDate: PropTypes.bool.isRequired,
  onSaveAssessment: PropTypes.func.isRequired,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

export default AssessmentPageHeader
