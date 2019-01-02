import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'

describe('<ChangeLogLoadingBoundary />', () => {
  const render = id =>
    shallow(
      <ChangeLogLoadingBoundary id={id}>
        <div />
      </ChangeLogLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render('XYZ')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('assessmentWithHistory')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('does not update if the id does not change', () => {
    const wrapper = render('XYZ')
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })
})
