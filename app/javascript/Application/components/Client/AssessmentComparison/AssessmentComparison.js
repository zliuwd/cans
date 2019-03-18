import React from 'react'
import { Container, Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import ComparisonOuterTable from './comparisonTable/ComparisonOuterTable'
import ComparisonGraph from './comparisonGraph/ComparisonGraph'
import './style.sass'
import PropTypes from 'prop-types'
import RecordsModeSwitchButton from '../RecordsModeSwitchButton'
import { recordsMode } from '../Client.helper'
import ComparisonAgeSwitchButtonGroup from './ComparisonAgeSwitchButtonGroup'

const ageRange = Object.freeze({
  UNDERSIX: 'underSix',
  ABOVESIX: 'aboveSix',
})

const dataAnalyzer = data => {
  if (!data || !data.aboveSix || !data.aboveSix) {
    return { currentDataKey: '', showSwitch: false }
  }
  const result = { currentDataKey: '', showSwitch: true }
  if (data.underSix.event_dates.length < 1) {
    result.showSwitch = false
    result.currentDataKey = ageRange.ABOVESIX
  } else if (data.aboveSix.event_dates.length < 1) {
    result.showSwitch = false
    result.currentDataKey = ageRange.UNDERSIX
  } else {
    result.currentDataKey = currentDataKeyGenerator(data)
  }
  return result
}

const currentDataKeyGenerator = data => {
  return data.underSix.event_dates[0].assessment_id > data.aboveSix.event_dates[0].assessment_id
    ? ageRange.UNDERSIX
    : ageRange.ABOVESIX
}

class AssessmentComparison extends React.Component {
  constructor(props) {
    super(props)
    const dataInfo = dataAnalyzer(this.props.comparisonRecords.data)
    this.state = {
      currentDataKey: dataInfo.currentDataKey,
      isAgeSwitchShown: dataInfo.showSwitch,
    }
  }

  handleAgeSwitch = isUnderSix => {
    if (!isUnderSix) {
      this.setState({ currentDataKey: ageRange.ABOVESIX })
    } else {
      this.setState({ currentDataKey: ageRange.UNDERSIX })
    }
  }

  handleCurrentData = key => {
    return this.props.comparisonRecords.data[key]
  }

  render() {
    const { comparisonRecords } = this.props
    if (!comparisonRecords || !comparisonRecords.data || !comparisonRecords.i18n) {
      return null
    }
    const { i18n } = comparisonRecords
    const currentData = this.handleCurrentData(this.state.currentDataKey)
    const isCurrentAgeRangeUnderSix = currentData.domains[0].under_six
    return (
      <Container>
        <Card className="card-cans-comparison">
          <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
            <CardTitle>
              <span>Assessment Comparison</span>
              <RecordsModeSwitchButton
                switchButtonName={recordsMode.HISTORY}
                recordsModeSwitch={this.props.recordsModeSwitch}
              />
            </CardTitle>
          </CardHeader>
          <CardBody className={'comparison-card-body'}>
            {this.state.isAgeSwitchShown ? (
              <ComparisonAgeSwitchButtonGroup isUnderSix={isCurrentAgeRangeUnderSix} ageSwitch={this.handleAgeSwitch} />
            ) : null}
            <ComparisonOuterTable data={currentData} i18n={i18n} />
            <Card className={'comparison-graph-card'}>
              <CardBody className={'comparison-graph-container'}>
                <ComparisonGraph data={currentData} i18n={i18n} />
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

AssessmentComparison.propTypes = {
  comparisonRecords: PropTypes.shape({
    data: PropTypes.shape({
      underSix: PropTypes.object.isRequired,
      aboveSix: PropTypes.object.isRequired,
    }),
    i18n: PropTypes.object,
  }),
  recordsModeSwitch: PropTypes.func.isRequired,
}

AssessmentComparison.defaultProps = {
  comparisonRecords: {},
}

export default AssessmentComparison
