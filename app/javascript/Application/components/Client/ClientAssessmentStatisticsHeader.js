import React from 'react'
import PropTypes from 'prop-types'
import { viewNameSwitch } from './Client.helper'
import { CardHeader, CardTitle } from '@cwds/components'
import AssessmentRecordControl from './AssessmentRecordControl'

const ClientAssessmentStatisticsHeader = props => {
  const { isComparisonShown, ...assessmentRecordControlProps } = props

  return (
    <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
      <CardTitle>
        <span>{viewNameSwitch(isComparisonShown)}</span>
        <AssessmentRecordControl {...assessmentRecordControlProps} />
      </CardTitle>
    </CardHeader>
  )
}

ClientAssessmentStatisticsHeader.propTypes = {
  isComparisonShown: PropTypes.bool.isRequired,
  ...AssessmentRecordControl.propTypes,
}

ClientAssessmentStatisticsHeader.defaultProps = {
  clientIdentifier: '',
  assessments: [],
  disabled: false,
  isReassessment: false,
}

export default ClientAssessmentStatisticsHeader
