import React from 'react'
import { shallow } from 'enzyme'
import UserFeatures from './UserFeatures'
import UserFeaturesContext from './UserFeaturesContext'
import { permissions } from './constants'

describe('<UserFeatures />', () => {
  const render = () =>
    shallow(
      <UserFeatures>
        <div />
      </UserFeatures>
    )

  it('renders empty initially ', () => {
    const wrapper = render()
    expect(wrapper.children().exists()).toBeFalsy()
  })

  it('renders UserFeaturesContext.Provider when state.userFeatures exists', () => {
    const wrapper = render()
    wrapper.setState({ userFeatures: {} })
    const contextProvider = wrapper.find(UserFeaturesContext.Provider)
    expect(contextProvider.exists()).toBeTruthy()
    expect(contextProvider.props().value).toEqual(wrapper.state().userFeatures)
    expect(contextProvider.children()).toEqual(wrapper.children())
  })

  describe('#getDerivedStateFromProps()', () => {
    it('returns null when no user in input', () => {
      expect(UserFeatures.getDerivedStateFromProps({})).toBe(null)
    })

    describe('when user exists in input', () => {
      it('returns userFeatures', () => {
        expect(UserFeatures.getDerivedStateFromProps({ user: {} })).toEqual({ userFeatures: { reassessment: false } })
      })

      it('returns userFeatures with reassessment feature = true', () => {
        expect(
          UserFeatures.getDerivedStateFromProps({ user: { privileges: [permissions.REASSESSMENT_CREATE] } })
        ).toEqual({ userFeatures: { reassessment: true } })
      })
    })
  })
})
