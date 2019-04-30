import React, { PureComponent } from 'react'
import { header, container } from '../PrintStyles'
import { comparisonDataType } from './PrintClientHelper'
import { ageRange } from '../../Client/AssessmentComparison/AssessmentComparisonHelper'
import PrintComparisonGraph from './PrintComparisonGraph'
import PrintComparisonTable from './PrintComparisonTable'

class PrintClientAssessmentComparison extends PureComponent {
  render = () => {
    const { comparisonData } = this.props
    const underSix = comparisonData.currentDataKey === ageRange.UNDERSIX
    const { data, currentDataKey, i18n } = comparisonData
    return (
      <div id={'print-client-assessment-comparison'} style={container}>
        <div style={header}>Assessment Comparison</div>
        <h4>Age: {underSix ? '0-5' : '6-21'}</h4>
        <PrintComparisonGraph data={data[currentDataKey]} i18n={i18n} />
        <PrintComparisonTable data={data[currentDataKey]} i18n={i18n} />
      </div>
    )
  }
}

PrintClientAssessmentComparison.propTypes = {
  comparisonData: comparisonDataType.isRequired,
}

export default PrintClientAssessmentComparison
