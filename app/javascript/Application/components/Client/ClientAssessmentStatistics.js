import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import AssessmentComparison from './AssessmentComparison/AssessmentComparison'
import AssessmentComparisonLoadingBoundary from './AssessmentComparison/AssessmentComparisonLoadingBoundary'

const ClientAssessmentStatistics = props => {
  const {
    clientIdentifier,
    loadingBoundaryKey,
    isComparisonShown,
    client,
    navFrom,
    inheritUrl,
    userId,
    updateAssessmentHistoryCallback,
    recordsModeSwitch,
  } = props
  return (
    <Fragment>
      <ClientAssessmentHistoryLoadingBoundary clientIdentifier={clientIdentifier} key={loadingBoundaryKey}>
        {!isComparisonShown ? (
          <ClientAssessmentHistory
            client={client}
            navFrom={navFrom}
            inheritUrl={inheritUrl}
            userId={userId}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
            recordsModeSwitch={recordsModeSwitch}
          />
        ) : (
          <Fragment />
        )}
      </ClientAssessmentHistoryLoadingBoundary>
      <AssessmentComparisonLoadingBoundary
        clientIdentifier={clientIdentifier}
        key={`${loadingBoundaryKey}-comparison`}
        instrumentId={1}
      >
        {isComparisonShown ? <AssessmentComparison recordsModeSwitch={recordsModeSwitch} /> : <Fragment />}
      </AssessmentComparisonLoadingBoundary>
    </Fragment>
  )
}

ClientAssessmentStatistics.propTypes = {
  client: PropTypes.object,
  clientIdentifier: PropTypes.string,
  inheritUrl: PropTypes.string.isRequired,
  isComparisonShown: PropTypes.bool.isRequired,
  loadingBoundaryKey: PropTypes.number.isRequired,
  navFrom: PropTypes.string,
  recordsModeSwitch: PropTypes.func.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentStatistics.defaultProps = {
  client: {},
  navFrom: '',
  clientIdentifier: '',
  userId: '',
}

export default ClientAssessmentStatistics
