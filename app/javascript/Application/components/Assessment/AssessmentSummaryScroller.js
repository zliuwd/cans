import React from 'react'
import PropTypes from 'prop-types'
import { completeAutoScroll } from '../../util/assessmentAutoScroll'
import { LoadingState } from '../../util/loadingHelper'

class AssessmentSummaryScroller extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    const { canDisplaySummaryOnSave, scrollTarget, targetAdjustment } = this.props

    const isSaved = prevProps.loadingState === LoadingState.updating && this.props.loadingState === LoadingState.ready

    if (isSaved && canDisplaySummaryOnSave) {
      completeAutoScroll(scrollTarget, targetAdjustment)
    }
  }

  render() {
    return null
  }
}

AssessmentSummaryScroller.propTypes = {
  canDisplaySummaryOnSave: PropTypes.bool.isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)).isRequired,
  scrollTarget: PropTypes.number.isRequired,
  targetAdjustment: PropTypes.number.isRequired,
}

export default AssessmentSummaryScroller
