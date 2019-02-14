import React from 'react'
import { shallow } from 'enzyme'
import StaffLoadingBoundary from './StaffLoadingBoundary'
import StaffService from './Staff.service'
import LoadingBoundary from '../common/LoadingBoundary'

jest.mock('./Staff.service')

describe('<StaffLoadingBoundary />', () => {
  const render = staffId =>
    shallow(
      <StaffLoadingBoundary staffId={staffId}>
        <div />
      </StaffLoadingBoundary>
    )

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render('XYZ')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('staffInfo')
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

  it('loads staff people on fetch', () => {
    const spy = jest.spyOn(StaffService, 'fetch')
    const wrapper = render('ABC')
    const fetch = wrapper.find(LoadingBoundary).props().fetch
    fetch()
    expect(spy).toHaveBeenCalledWith('ABC')
  })

  it('is not hidden while loading', () => {
    expect(render('123').props().isHiddenWhileLoading).toBe(false)
  })
})
