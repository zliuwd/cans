import React from 'react'
import ComparisonGraph from './ComparisonGraph'
import ComparisonGraphInner from './ComparisonGraphInner'
import { shallow } from 'enzyme'
import { fakeData } from '../AssessmentComparison.test'

const fakeProps = {
  data: fakeData.aboveSix,
  i18n: { key: 'value' },
}

describe('<ComparisonGraph/>', () => {
  it('renders one ComparisonGraphInner with correct props', () => {
    const wrapper = shallow(<ComparisonGraph {...fakeProps} />)
    const target = wrapper.find(ComparisonGraphInner)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('dates', 'nextColor', 'domainBarsData')
  })
})
