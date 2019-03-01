import React from 'react'
import { shallow } from 'enzyme'
import AssessmentComparisonLoadingBoundary from './AssessmentComparisonLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'
import { I18nService } from '../../common/'
import { ClientService } from '../'
jest.mock('../Client.service.js')

describe('<AssessmentComparisonLoadingBoundary />', () => {
  const render = (id, instrumentId) =>
    shallow(
      <AssessmentComparisonLoadingBoundary clientIdentifier={id} instrumentId={instrumentId}>
        <div />
      </AssessmentComparisonLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render('0PcpFQu0QM', 1)
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('comparisonRecords')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('does not update if the id does not change', () => {
    const wrapper = render('XYZ', 1)
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })

  it('fetch method works well', () => {
    const wrapper = render('XYZ', 1)
    const getAssessmentComparisonSpy = jest.spyOn(ClientService, 'getAssessmentComparison')
    const fetchI18nSpy = jest.spyOn(I18nService, 'fetchByInstrumentId')
    wrapper
      .find(LoadingBoundary)
      .props()
      .fetch()
    expect(getAssessmentComparisonSpy).toHaveBeenCalledTimes(1)
    expect(fetchI18nSpy).toHaveBeenCalledTimes(1)
    getAssessmentComparisonSpy.mockReset()
    fetchI18nSpy.mockReset()
  })

  it('fetch will return an object', () => {
    const wrapper = render('XYZ', 1)
    jest.spyOn(ClientService, 'getAssessmentComparison').mockReturnValue(Promise.resolve({ data: 'someValue' }))
    jest.spyOn(I18nService, 'fetchByInstrumentId').mockReturnValue(Promise.resolve({ i18n: 'someValue' }))
    const target = wrapper
      .find(LoadingBoundary)
      .props()
      .fetch()
    expect(typeof target).toBe('object')
  })
})
