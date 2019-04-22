import React from 'react'
import PropTypes from 'prop-types'
import { viewNameSwitch } from './Client.helper'
import { CardHeader, CardTitle } from '@cwds/components'
import AssessmentRecordControl from './AssessmentRecordControl'
import { LoadingState } from '../../util/loadingHelper'

const ClientAssessmentStatisticsHeader = props => {
  const { isComparisonShown, loadingState, ...assessmentRecordControlProps } = props
  const ready = loadingState === LoadingState.ready

  return (
    <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
      <CardTitle>
        <span>{viewNameSwitch(isComparisonShown)}</span>
        {ready && <AssessmentRecordControl {...assessmentRecordControlProps} />}
      </CardTitle>
    </CardHeader>
  )
}

ClientAssessmentStatisticsHeader.propTypes = {
  isComparisonShown: PropTypes.bool.isRequired,
  loadingState: PropTypes.string.isRequired,
  ...AssessmentRecordControl.propTypes,
}

ClientAssessmentStatisticsHeader.defaultProps = {
  clientIdentifier: '',
  assessments: [],
  disabled: false,
  isReassessment: false,
}

export default ClientAssessmentStatisticsHeader
