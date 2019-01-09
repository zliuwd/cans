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
})
