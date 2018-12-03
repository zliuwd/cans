import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'

jest.mock('../Assessment.service')

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
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('changeHistory')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })
})
