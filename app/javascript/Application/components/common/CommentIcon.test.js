import React from 'react'
import { Icon } from '@cwds/components'
import { shallow } from 'enzyme'
import CommentIcon from './CommentIcon'

describe('<CommentIcon />', () => {
  it('has reg-rating for regular rating items domain', () => {
    const wrapper = shallow(<CommentIcon ratingType={'reg-rating'} />)
    expect(
      wrapper
        .find(Icon)
        .props()
        .className.includes('reg-rating')
    ).toBeTruthy()
  })

  it('has bool-rating for boolean rating items domain', () => {
    const wrapper = shallow(<CommentIcon ratingType={'bool-rating'} />)
    expect(
      wrapper
        .find(Icon)
        .props()
        .className.includes('bool-rating')
    ).toBeTruthy()
  })

  it('should propagate className prop to Icon element', () => {
    const wrapper = shallow(<CommentIcon className={'hello'} />)
    expect(
      wrapper
        .find(Icon)
        .props()
        .className.includes('hello')
    ).toBeTruthy()
  })
})
