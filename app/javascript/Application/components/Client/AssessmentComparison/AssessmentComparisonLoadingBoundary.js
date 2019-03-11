import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { I18nService } from '../../common/'
import { ClientService } from '../'

class AssessmentComparisonLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ clientIdentifier: propsId, instrumentId }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () =>
          Promise.all([
            ClientService.getAssessmentComparison(propsId),
            I18nService.fetchByInstrumentId(instrumentId),
          ]).then(([data, i18n]) => ({ data, i18n })),
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary
        childNodeFetchedPropName={'comparisonRecords'}
        fetch={this.state.fetch}
        isHiddenWhileLoading={false}
      >
        {this.props.children}
      </LoadingBoundary>
    )
  }
}

AssessmentComparisonLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  clientIdentifier: PropTypes.string.isRequired,
  instrumentId: PropTypes.string.isRequired,
}

export default AssessmentComparisonLoadingBoundary
