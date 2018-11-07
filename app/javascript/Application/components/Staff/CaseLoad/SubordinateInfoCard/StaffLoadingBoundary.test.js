import React from 'react'
import { shallow } from 'enzyme'
import StaffLoadingBoundary from './StaffLoadingBoundary'
import LoadingBoundary from '../../../common/LoadingBoundary'

jest.mock('../../Staff.service')

describe('<StaffLoadingBoundary />', () => {
  const render = staffId =>
    shallow(
      <StaffLoadingBoundary staffId={staffId}>
        <div />
      </StaffLoadingBoundary>
    )

  it('renders LoadingBoundary ans sets props', () => {
    const wrapper = render('XYZ')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('staffInfo')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })
})
