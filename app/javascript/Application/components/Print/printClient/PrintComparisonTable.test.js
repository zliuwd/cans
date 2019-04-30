import React from 'react'
import { shallow } from 'enzyme'
import PrintComparisonTable from './PrintComparisonTable'
import { comparisonData, i18n } from './PrintComparisonData.mock'

const props = {
  data: comparisonData,
  i18n,
}

describe('<PrintComparisonTable/>', () => {
  it('renders table', () => {
    const wrapper = shallow(<PrintComparisonTable {...props} />)
    expect(wrapper.find('#print-client-comparison-table').exists()).toBeTruthy()
    expect(wrapper.find('th').length).toBe(3)
    expect(wrapper.find('tr').length).toBe(4)
    expect(wrapper.text()).toMatch(/title0/)
    expect(wrapper.text()).toMatch(/title1/)
    expect(wrapper.text()).toMatch(/title2/)
    expect(wrapper.text()).toMatch(/02\/21\/2018/)
    expect(wrapper.text()).toMatch(/02\/22\/2018/)
  })
})
