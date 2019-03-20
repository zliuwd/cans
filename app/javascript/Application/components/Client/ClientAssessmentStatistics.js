import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import AssessmentComparison from './AssessmentComparison/AssessmentComparison'
import AssessmentComparisonLoadingBoundary from './AssessmentComparison/AssessmentComparisonLoadingBoundary'
import { Container, Card } from '@cwds/components'
import ClientAssessmentStatisticsHeader from './ClientAssessmentStatisticsHeader'
import { activeSwitchDetector } from './Client.helper'
import { hasOneCompletedForReassessment } from '../Assessment/'
import { isAuthorized } from '../common/AuthHelper'

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
    assessments,
    loadingState,
  } = props

  const headerProps = {
    isComparisonShown,
    activatedRecordSwitchButton: activeSwitchDetector(isComparisonShown),
    recordsModeSwitch: recordsModeSwitch,
    assessments,
    clientIdentifier,
    disabled: !isAuthorized(client, 'createAssessment'),
    isReassessment: hasOneCompletedForReassessment(assessments, client.service_source_id),
  }
  return (
    <Container>
      <Card>
        <ClientAssessmentStatisticsHeader {...headerProps} />
        {!isComparisonShown ? (
          <ClientAssessmentHistory
            loadingState={loadingState}
            assessments={assessments}
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

        <AssessmentComparisonLoadingBoundary
          clientIdentifier={clientIdentifier}
          key={`${loadingBoundaryKey}-comparison`}
          instrumentId="1"
        >
          {isComparisonShown ? <AssessmentComparison recordsModeSwitch={recordsModeSwitch} /> : <Fragment />}
        </AssessmentComparisonLoadingBoundary>
      </Card>
    </Container>
  )
}

ClientAssessmentStatistics.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
  client: PropTypes.object,
  clientIdentifier: PropTypes.string,
  inheritUrl: PropTypes.string.isRequired,
  isComparisonShown: PropTypes.bool.isRequired,
  loadingBoundaryKey: PropTypes.number.isRequired,
  loadingState: PropTypes.string,
  navFrom: PropTypes.string,
  recordsModeSwitch: PropTypes.func.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentStatistics.defaultProps = {
  assessments: [],
  client: {},
  navFrom: '',
  clientIdentifier: '',
  userId: '',
  loadingState: '',
}

export default ClientAssessmentStatistics
