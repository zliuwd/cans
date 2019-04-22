import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryLoadingBoundary from './ClientAssessmentHistoryLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'

describe('<ClientAssessmentHistoryLoadingBoundary />', () => {
  const render = id =>
    shallow(
      <ClientAssessmentHistoryLoadingBoundary clientIdentifier={id}>
        <div />
      </ClientAssessmentHistoryLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render('0PcpFQu0QM')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('assessments')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
    expect(loadingBoundary.props().isHiddenWhileLoading).toEqual(false)
  })

  it('does not update if the id does not change', () => {
    const wrapper = render('XYZ')
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })
})
