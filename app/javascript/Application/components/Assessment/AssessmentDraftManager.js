import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'

class AssessmentDraftManager extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      assessment: props.assessment,
    }
  }

  handleResetAssessment = () => {
    this.setState({ assessment: this.props.assessment })
  }

  handleSaveAssessment = () => {
    this.props.onSave(this.state.assessment)
  }

  handleSetAssessment = assessment => {
    this.setState({ assessment })
  }

  render() {
    return React.cloneElement(this.props.children, {
      assessment: this.state.assessment,
      loadingState: this.props.loadingState,
      onResetAssessment: this.handleResetAssessment,
      onSaveAssessment: this.handleSaveAssessment,
      onSetAssessment: this.handleSetAssessment,
    })
  }
}

AssessmentDraftManager.propTypes = {
  assessment: PropTypes.object,
  children: PropTypes.element.isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  onSave: PropTypes.func.isRequired,
}

AssessmentDraftManager.defaultProps = {
  assessment: null,
  loadingState: LoadingState.waiting,
}
export default AssessmentDraftManager
