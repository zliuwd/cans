import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { I18nService } from '../../common/'
import { ClientService } from '../'

class AssessmentComparisonLoadingBoundary extends React.Component {
  state = {}

  static getDerivedStateFromProps({ clientIdentifier: propsId, instrumentId, dataFetchCallback }, { id: stateId }) {
    if (propsId !== stateId) {
      return {
        id: propsId,
        fetch: () =>
          Promise.all([
            ClientService.getAssessmentComparison(propsId, true),
            ClientService.getAssessmentComparison(propsId, false),
            I18nService.fetchByInstrumentId(instrumentId),
          ]).then(([underSix, aboveSix, i18n]) => {
            const fetchedData = { data: { underSix, aboveSix }, i18n }
            dataFetchCallback(fetchedData)
            return fetchedData
          }),
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
  dataFetchCallback: PropTypes.func,
  instrumentId: PropTypes.string.isRequired,
}

AssessmentComparisonLoadingBoundary.defaultProps = {
  dataFetchCallback: () => {},
}

export default AssessmentComparisonLoadingBoundary
