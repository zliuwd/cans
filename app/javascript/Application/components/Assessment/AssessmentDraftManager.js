import React from 'react'
import PropTypes from 'prop-types'

class AssessmentDraftManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.assessment !== state.assessment) {
      return { assessment: props.assessment }
    }
    return null
  }

  render() {
    return React.cloneElement(this.props.children, { assessment: this.state.assessment })
  }
}

AssessmentDraftManager.propTypes = {
  assessment: PropTypes.object,
  children: PropTypes.element.isRequired,
}

AssessmentDraftManager.defaultProps = {
  assessment: null,
}
export default AssessmentDraftManager
