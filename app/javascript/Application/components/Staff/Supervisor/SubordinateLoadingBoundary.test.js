import React from 'react'
import { shallow } from 'enzyme'
import SubordinateLoadingBoundary from './SubordinateLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'
import SubordinateService from './Subordinate.service'

jest.mock('./Subordinate.service')

describe('<SubordinateLoadingBoundary />', () => {
  const render = () =>
    shallow(
      <SubordinateLoadingBoundary>
        <div />
      </SubordinateLoadingBoundary>
    )

  it('renders a LoadingBoundary with Subordinate fetch and staff prop', () => {
    const wrapper = render()
    expect(wrapper.type()).toBe(LoadingBoundary)
    expect(wrapper.props().childNodeFetchedPropName).toBe('staff')
    expect(wrapper.props().fetch).toBe(SubordinateService.fetch)
  })
})
