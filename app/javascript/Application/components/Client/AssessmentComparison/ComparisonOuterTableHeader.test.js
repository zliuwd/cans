import React from 'react'
import { mount } from 'enzyme'
import ComparisonOuterTableHeader from './ComparisonOuterTableHeader'
import { isoToLocalDate } from '../../../util/dateHelper'

describe('<ComparisonOuterTableHeader />', () => {
  const inProgressProps = {
    status: 'IN_PROGRESS',
    date: '2019-02-21',
  }

  const completedProps = {
    status: 'COMPLETED',
    date: '2019-01-21',
  }
  let wrapper
  afterEach(() => {
    wrapper.unmount()
  })

  it('will render text #In Progress# and date when got assessment with status IN_PROGRESS', () => {
    wrapper = mount(<ComparisonOuterTableHeader {...inProgressProps} />)
    expect(wrapper.find('.outer-header-status').text()).toBe('In Progress')
    expect(wrapper.find('.outer-header-text').text()).toBe(isoToLocalDate('2019-02-21'))
  })

  it('will only render date when got assessment with status COMPLETED', () => {
    wrapper = mount(<ComparisonOuterTableHeader {...completedProps} />)
    expect(wrapper.find('.outer-header-status').text()).toBe('')
    expect(wrapper.find('.outer-header-text').text()).toBe(isoToLocalDate('2019-01-21'))
  })
})
