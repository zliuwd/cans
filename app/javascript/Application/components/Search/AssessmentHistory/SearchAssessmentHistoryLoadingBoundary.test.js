import React from 'react'
import { shallow } from 'enzyme'
import SearchAssessmentHistoryLoadingBoundary from './SearchAssessmentHistoryLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'

describe('<SearchAssessmentHistoryLoadingBoundary />', () => {
  const render = key =>
    shallow(
      <SearchAssessmentHistoryLoadingBoundary loadingBoundaryKey={key}>
        <div />
      </SearchAssessmentHistoryLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const key = Math.random()
    const wrapper = render(key)
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('assessments')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('does not update if the id does not change', () => {
    const key = Math.random()
    const wrapper = render(key)
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })
})
