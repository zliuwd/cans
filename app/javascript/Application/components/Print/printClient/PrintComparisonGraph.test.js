import React from 'react'
import { shallow } from 'enzyme'
import PrintComparisonGraph from './PrintComparisonGraph'
import { BarChart } from 'recharts'
import { comparisonData, i18n } from './PrintComparisonData.mock'

describe('<PrintComparisonGraph/>', () => {
  const props = {
    data: comparisonData,
    i18n,
  }
  it('renders <BarChart/>', () => {
    expect(
      shallow(<PrintComparisonGraph {...props} />)
        .find(BarChart)
        .exists()
    ).toBeTruthy()
  })
})
