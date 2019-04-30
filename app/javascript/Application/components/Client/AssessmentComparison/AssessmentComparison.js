import React from 'react'
import { Card, CardBody } from '@cwds/components'
import ComparisonOuterTable from './comparisonTable/ComparisonOuterTable'
import ComparisonGraph from './comparisonGraph/ComparisonGraph'
import './style.sass'
import PropTypes from 'prop-types'
import ComparisonAgeSwitchButtonGroup from './ComparisonAgeSwitchButtonGroup'
import { ageRange, analyzeData } from './AssessmentComparisonHelper'

class AssessmentComparison extends React.Component {
  constructor(props) {
    super(props)
    const dataInfo = analyzeData(this.props.comparisonRecords.data)
    const currentDataKey = dataInfo.currentDataKey
    this.props.dataChangeCallback({ currentDataKey })
    this.state = {
      currentDataKey,
      isAgeSwitchShown: dataInfo.showSwitch,
    }
  }

  handleAgeSwitch = isUnderSix => {
    const key = { currentDataKey: isUnderSix ? ageRange.UNDERSIX : ageRange.ABOVESIX }
    this.props.dataChangeCallback(key)
    this.setState({ ...key })
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
  dataChangeCallback: PropTypes.func,
}

AssessmentComparison.defaultProps = {
  comparisonRecords: {},
  dataChangeCallback: () => {},
}

export default AssessmentComparison
