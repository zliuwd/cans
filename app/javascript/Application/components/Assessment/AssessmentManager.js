import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentService, I18nService } from './'
import LoadingBoundary from '../common/LoadingBoundary'

const fetchI18n = instrumentId => I18nService.fetchByInstrumentId(instrumentId)

const fetch = assessmentId =>
  assessmentId ? AssessmentService.fetch(assessmentId) : AssessmentService.fetchNewAssessment()

const postOrUpdate = (assessmentId, assessment) =>
  assessmentId ? AssessmentService.update(assessmentId, assessment) : AssessmentService.postAssessment(assessment)

const fetchFactory = (assessmentId, instrumentId) => () =>
  Promise.all([fetch(assessmentId), fetchI18n(instrumentId)]).then(([assessment, i18n]) => ({
    assessment,
    i18n,
  }))

class AssessmentManager extends React.Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    if (props.assessmentId !== state.assessmentId) {
      return {
        assessmentId: props.assessmentId,
        fetch: fetchFactory(props.assessmentId, props.instrumentId),
      }
    }
    return null
  }

  onSave = assessment => {
    const { instrumentId } = this.props
    const assessmentId = assessment.id

    this.setState({
      fetch: () =>
        Promise.all([postOrUpdate(assessmentId, assessment), fetchI18n(instrumentId)]).then(([assessment, i18n]) => ({
          assessment,
          i18n,
        })),
    })
  }

  render() {
    return (
      <LoadingBoundary
        childNodeFetchedPropName="assessmentWithI18n"
        fetch={this.state.fetch}
        isHiddenWhileLoading={false}
      >
        {React.cloneElement(this.props.children, { onSave: this.onSave })}
      </LoadingBoundary>
    )
  }
}

AssessmentManager.propTypes = {
  assessmentId: PropTypes.string,
  children: PropTypes.node.isRequired,
  instrumentId: PropTypes.string.isRequired,
}

AssessmentManager.defaultProps = {
  assessmentId: null,
}

export default AssessmentManager
