import React from 'react'
import ComparisonGraphInner, { backupColor } from './ComparisonGraphInner'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import { shallow, mount } from 'enzyme'
import { graphColors } from './comparisonGraphDataTransformations'

const fakeProps = {
  domainBarsData: [
    {
      name: 'ECH',
      '03/04/2019': 0,
      '03/01/2019': 0,
      '02/28/2019(2)': 9,
      '02/28/2019(1)': 0,
      '02/28/2019': 0,
    },
    {
      name: 'EFX',
      '03/04/2019': 1,
      '03/01/2019': 0,
      '02/28/2019(2)': 5,
      '02/28/2019(1)': 0,
      '02/28/2019': 0,
    },
    {
      name: 'ERB',
      '03/04/2019': 2,
      '03/01/2019': 0,
      '02/28/2019(2)': 7,
      '02/28/2019(1)': 0,
      '02/28/2019': 0,
    },
  ],
  dates: ['02/28/2019', '02/28/2019(1)', '02/28/2019(2)', '03/01/2019', '03/04/2019'],
}

const colorAccidentProps = {
  domainBarsData: [
    {
      name: 'ECH',
      '03/05/2019': 1,
      '03/04/2019': 0,
      '03/01/2019': 0,
      '02/28/2019(2)': 9,
      '02/28/2019(1)': 0,
      '02/28/2019': 0,
    },
  ],
  dates: ['02/28/2019', '02/28/2019(1)', '02/28/2019(2)', '03/01/2019', '03/04/2019', '03/05/2019'],
}

describe('<ComparisonGraphInner/>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ComparisonGraphInner {...fakeProps} />)
  })

  it('renders one ResponsiveContainer', () => {
    const target = wrapper.find(ResponsiveContainer)
    expect(target.length).toBe(1)
  })

  it('renders one BarChart', () => {
    const target = wrapper.find(BarChart)
    expect(target.length).toBe(1)
  })

  it('renders one CartesianGrid', () => {
    const target = wrapper.find(CartesianGrid)
    expect(target.length).toBe(1)
  })

  it('renders one XAxis', () => {
    const target = wrapper.find(XAxis)
    expect(target.length).toBe(1)
  })

  it('renders one YAxis', () => {
    const target = wrapper.find(YAxis)
    expect(target.length).toBe(1)
  })

  it('renders one Tooltip', () => {
    const target = wrapper.find(Tooltip)
    expect(target.length).toBe(1)
  })

  it('renders one Legend', () => {
    const target = wrapper.find(Legend)
    expect(target.length).toBe(1)
  })

  it('renders many Bars based on dates props length', () => {
    const target = wrapper.find(Bar)
    expect(target.length).toBe(fakeProps.dates.length)
  })

  it('backupColor function works well', () => {
    const target = backupColor()
    expect(typeof target).toBe('string')
    expect(target[0]).toBe('#')
    expect(target.length).toBe(7)
  })

  it('still render Bar with random color without crash when have assessments overflow', () => {
    const caseWrapper = shallow(<ComparisonGraphInner {...colorAccidentProps} />)
    expect(colorAccidentProps.dates.length).toBeGreaterThan(graphColors.length)
    const target = caseWrapper.find(Bar)
    expect(target.length).toBe(colorAccidentProps.dates.length)
    const accidentBar = mount([...target].pop())
    expect(accidentBar.props().fill).toBeDefined()
    accidentBar.unmount()
  })
})
