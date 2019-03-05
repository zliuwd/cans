import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'

class AssessmentDraftManager extends React.PureComponent {
  constructor(props) {
    super(props)
    const assessment = props.assessmentWithI18n && props.assessmentWithI18n.assessment
    this.state = {
      assessment,
      loadingState: props.loadingState,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.loadingState !== LoadingState.ready && props.loadingState === LoadingState.ready) {
      return {
        assessment: props.assessmentWithI18n && props.assessmentWithI18n.assessment,
        loadingState: props.loadingState,
      }
    }
    return { loadingState: props.loadingState }
  }

  handleResetAssessment = () => {
    const assessment = this.props.assessmentWithI18n && this.props.assessmentWithI18n.assessment
    this.setState({ assessment })
  }

  handleSaveAssessment = assessment => {
    this.props.onSave(assessment)
  }

  handleSetAssessment = assessment => {
    this.setState({ assessment })
  }

  render() {
    return React.cloneElement(this.props.children, {
      assessment: this.state.assessment,
      i18n: this.props.assessmentWithI18n && this.props.assessmentWithI18n.i18n,
      loadingState: this.props.loadingState,
      onResetAssessment: this.handleResetAssessment,
      onSaveAssessment: this.handleSaveAssessment,
      onSetAssessment: this.handleSetAssessment,
    })
  }
}

AssessmentDraftManager.propTypes = {
  assessmentWithI18n: PropTypes.shape({
    assessment: PropTypes.object,
    i18n: PropTypes.object.isRequired,
  }),
  children: PropTypes.element.isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  onSave: PropTypes.func,
}

AssessmentDraftManager.defaultProps = {
  assessmentWithI18n: null,
  loadingState: LoadingState.waiting,
  onSave: () => {},
}
export default AssessmentDraftManager
