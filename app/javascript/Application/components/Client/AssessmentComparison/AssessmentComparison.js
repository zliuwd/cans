import React from 'react'
import { Container, Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import ComparisonOuterTable from './ComparisonOuterTable'
import './style.sass'
import PropTypes from 'prop-types'
import RecordsModeSwitchButton from '../RecordsModeSwitchButton'
import { recordsMode } from '../Client.helper'

const AssessmentComparison = props => {
  const { data, i18n } = props.comparisonRecords
  if (!data || !i18n) {
    return null
  }
  return (
    <Container>
      <Card className="card-cans-comparison">
        <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
          <CardTitle>
            <span>Assessment Comparison</span>
            <RecordsModeSwitchButton
              switchButtonName={recordsMode.HISTORY}
              recordsModeSwitch={props.recordsModeSwitch}
            />
          </CardTitle>
        </CardHeader>
        <CardBody className={'comparison-card-body'}>
          <ComparisonOuterTable data={data} i18n={i18n} />
        </CardBody>
      </Card>
    </Container>
  )
}

AssessmentComparison.propTypes = {
  comparisonRecords: PropTypes.shape({
    data: PropTypes.object,
    i18n: PropTypes.object,
  }),
  recordsModeSwitch: PropTypes.func.isRequired,
}

AssessmentComparison.defaultProps = {
  comparisonRecords: {},
}

export default AssessmentComparison
