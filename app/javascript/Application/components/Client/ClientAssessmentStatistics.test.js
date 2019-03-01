import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'
import AssessmentComparison from './AssessmentComparison/AssessmentComparison'
import AssessmentComparisonLoadingBoundary from './AssessmentComparison/AssessmentComparisonLoadingBoundary'
import ClientAssessmentStatistics from './ClientAssessmentStatistics'
const client = {
  id: 1,
  first_name: 'test',
  middle_name: 'name',
  last_name: 'user',
  suffix: 'Mr.',
  dob: '1980-01-02',
  identifier: 'aaaaaaaaaa',
  external_id: '1234567891234567890',
  counties: [{ name: 'Sacramento' }, { name: 'State of California' }],
  cases: [],
  sensitivity_type: null,
}

const fakeProps = {
  clientIdentifier: '01',
  loadingBoundaryKey: 123,
  isComparisonShown: false,
  client,
  navFrom: 'someWhere',
  inheritUrl: '/cans/someurl',
  userId: '01',
  updateAssessmentHistoryCallback: jest.fn(),
  recordsModeSwitch: jest.fn(),
}

describe('<ClientAssessmentStatistics />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ClientAssessmentStatistics {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initially renders with 1 <ClientAssessmentHistoryLoadingBoundary /> component', () => {
    expect(wrapper.find(ClientAssessmentHistoryLoadingBoundary).length).toBe(1)
  })

  it('initially renders 1 <AssessmentComparisonLoadingBoundary /> component with correct props', () => {
    const target = wrapper.find(AssessmentComparisonLoadingBoundary)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('clientIdentifier', 'instrumentId')
  })

  it('renders with 1 <ClientAssessmentHistory /> and does not render <AssessmentComparison /> when isComparisonShown equal to false', () => {
    expect(fakeProps.isComparisonShown).toBe(false)
    expect(wrapper.find(ClientAssessmentHistory).length).toBe(1)
    expect(wrapper.find(AssessmentComparison).exists()).toBe(false)
  })

  it('does not render <ClientAssessmentHistory /> and renders <AssessmentComparison /> when isComparisonShown equal to true', () => {
    const comparisonShownProps = {
      clientIdentifier: '01',
      loadingBoundaryKey: 123,
      isComparisonShown: true,
      client,
      navFrom: 'someWhere',
      inheritUrl: '/cans/someurl',
      userId: '01',
      updateAssessmentHistoryCallback: jest.fn(),
      recordsModeSwitch: jest.fn(),
    }
    const comparisonWrapper = shallow(<ClientAssessmentStatistics {...comparisonShownProps} />)
    expect(comparisonShownProps.isComparisonShown).toBe(true)
    expect(comparisonWrapper.find(AssessmentComparison).length).toBe(1)
    expect(comparisonWrapper.find(ClientAssessmentHistory).exists()).toBe(false)
  })
})
