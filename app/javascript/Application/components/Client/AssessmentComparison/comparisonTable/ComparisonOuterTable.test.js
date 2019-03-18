import React from 'react'
import { DataGrid } from '@cwds/components'
import ComparisonInnerTable from './ComparisonInnerTable'
import ComparisonOuterTableHeader from './ComparisonOuterTableHeader'
import ComparisonOuterTable from './ComparisonOuterTable'
import { mount } from 'enzyme'
import { fakeData } from '../AssessmentComparison.test'
import * as helper from './comparisonTableHelper'

const fakeProps = {
  data: fakeData.aboveSix,
  i18n: { key: 'value' },
}

describe('<ComparisonOuterTable />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ComparisonOuterTable {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a DataGrid', () => {
    const target = wrapper.find(DataGrid)
    expect(target.length).toBe(1)
  })

  it('will render a column for names, each assessment, and an expansion button,total 7 columns', () => {
    const target = wrapper.find(DataGrid)
    expect(target.props().columns.length).toBe(7)
  })

  it('will render a DataGrid with correct props', () => {
    const target = wrapper.find(DataGrid)
    expect(target.props().sortable).toBe(false)
    expect(target.props().defaultPageSize).toBe(50)
    expect(target.props().showPaginationBottom).toBe(false)
  })

  it('will render ComparisonOuterTableHeader based on the amount of event_dates', () => {
    const target = wrapper.find(ComparisonOuterTableHeader)
    expect(target.length).toBe(fakeProps.data.event_dates.length)
  })

  it('will render #Domain Name# in first column', () => {
    const target = wrapper.find(DataGrid).props().columns[0].Header
    expect(target).toBe('Domain Name')
  })

  it('will render the last assessment date in second column header', () => {
    const expectedDate = '02/21/2019'
    const target = wrapper.find(DataGrid).props().columns[1].Header
    expect(mount(target).text()).toBe(expectedDate)
  })

  it('will render ComparisonOuterTableExpander ', () => {
    const target = wrapper.find('.outer-table-expander-collapsed')
    expect(target.exists()).toBe(true)
  })

  it('ComparisonInnerTable will show after ComparisonOuterTableExpander is clicked', () => {
    wrapper
      .find('.outer-table-expander-collapsed')
      .at(0)
      .simulate('click')
    const target = wrapper.find(ComparisonInnerTable)
    expect(target.exists()).toBe(true)
  })

  it('getTitle will be invoked by domainNameCol accessor', () => {
    const getTitleSpy = jest.spyOn(helper, 'getTitle')
    const target = wrapper.find(DataGrid).props().columns[0].accessor
    target(fakeProps.data.domains[0])
    expect(getTitleSpy).toHaveBeenCalledTimes(1)
    getTitleSpy.mockReset()
  })

  it('domainRatingSwitcher will be invoked by domainTotalCols accessor', () => {
    const domainRatingSwitcherSpy = jest.spyOn(helper, 'domainRatingSwitcher')
    const target = wrapper.find(DataGrid).props().columns[1].accessor
    target(fakeProps.data.domains[0])
    expect(domainRatingSwitcherSpy).toHaveBeenCalledTimes(1)
    domainRatingSwitcherSpy.mockReset()
  })

  it('will render null when got invalid data', () => {
    const invalidProps = {
      data: null,
      i18n: { key: 'value' },
    }
    const wrapper = mount(<ComparisonOuterTable {...invalidProps} />)
    expect(wrapper.text()).toBe(null)
    wrapper.unmount()
  })
})
