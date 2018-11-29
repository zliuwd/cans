import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogBoundary from './ChangeLogBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'

jest.mock('../Assessment.service')

describe('<ChangeLogBoundary />', () => {
  const render = id =>
    shallow(
      <ChangeLogBoundary id={id}>
        <div />
      </ChangeLogBoundary>
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
