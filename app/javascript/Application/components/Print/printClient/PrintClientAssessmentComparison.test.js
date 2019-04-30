import React from 'react'
import { shallow } from 'enzyme'
import PrintClientAssessmentComparison from './PrintClientAssessmentComparison'
import { ageRange } from '../../Client/AssessmentComparison/AssessmentComparisonHelper'
import PrintComparisonGraph from './PrintComparisonGraph'
import { fakeData } from '../../Client/AssessmentComparison/AssessmentComparisonData.mock'
import PrintComparisonTable from './PrintComparisonTable'

const defaultPrintData = {
  currentDataKey: ageRange.UNDERSIX,
  data: fakeData,
  i18n: {},
}

const defaultProps = { comparisonData: defaultPrintData }

describe('<PrintClientAssessmentComparison/>', () => {
  const render = props => shallow(<PrintClientAssessmentComparison {...props} />)

  it('should render #print-client-assessment-comparison', () => {
    const wrapper = render(defaultProps)
    expect(wrapper.find('#print-client-assessment-comparison').exists()).toBeTruthy()
  })

  describe('comparison graph', () => {
    it('should render comparison graph', () => {
      const wrapper = render(defaultProps)
      const graphWrapper = wrapper.find(PrintComparisonGraph)
      expect(graphWrapper.exists()).toBeTruthy()
    })
  })

  describe('comparison table', () => {
    it('should render comparison table', () => {
      const wrapper = render(defaultProps)
      const tableWrapper = wrapper.find(PrintComparisonTable)
      expect(tableWrapper.exists()).toBeTruthy()
    })
  })
})
