import React from 'react'
import PropTypes from 'prop-types'
import AssessmentService from './Assessment.service'
import I18nService from '../common/I18n.service'
import LoadingBoundary from '../common/LoadingBoundary'

const fetchI18n = instrumentId => I18nService.fetchByInstrumentId(instrumentId)

const fetch = (assessmentId, clientId) =>
  assessmentId ? AssessmentService.fetch(assessmentId) : AssessmentService.initializeAssessment(clientId)

const postOrUpdate = (assessmentId, assessment) =>
  assessmentId ? AssessmentService.update(assessmentId, assessment) : AssessmentService.postAssessment(assessment)

const fetchFactory = (assessmentId, clientId, instrumentId) => () =>
  Promise.all([fetch(assessmentId, clientId), fetchI18n(instrumentId)]).then(([assessment, i18n]) => ({
    assessment,
    i18n,
  }))

class AssessmentLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    if (props.assessmentId !== state.assessmentId) {
      return {
        assessmentId: props.assessmentId,
        fetch: fetchFactory(props.assessmentId, props.clientId, props.instrumentId),
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

AssessmentLoadingBoundary.propTypes = {
  assessmentId: PropTypes.string,
  children: PropTypes.node.isRequired,
  clientId: PropTypes.string.isRequired,
  instrumentId: PropTypes.string.isRequired,
}

AssessmentLoadingBoundary.defaultProps = {
  assessmentId: null,
}

export default AssessmentLoadingBoundary
