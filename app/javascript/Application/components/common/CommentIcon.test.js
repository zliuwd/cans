import React from 'react'
import { Icon } from '@cwds/components'
import { shallow } from 'enzyme'
import CommentIcon from './CommentIcon'

describe('<CommentIcon />', () => {
  describe('icon set', () => {
    it('should render an icon from `fas` set when isSolid', () => {
      const wrapper = shallow(<CommentIcon isSolid={true} />)
      expect(wrapper.find(Icon).props().set).toBe('fas')
    })

    it('should render an icon from `far` set when isSolid = false', () => {
      const wrapper = shallow(<CommentIcon isSolid={false} />)
      expect(wrapper.find(Icon).props().set).toBe('far')
    })
  })

  describe('icon className', () => {
    it('should be comment-icon-solid when isSolid', () => {
      const wrapper = shallow(<CommentIcon isSolid={true} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('comment-icon-solid')
      ).toBeTruthy()
    })

    it('should be comment-icon-outlined when isSolid = false', () => {
      const wrapper = shallow(<CommentIcon isSolid={false} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('comment-icon-outlined')
      ).toBeTruthy()
    })

    it('be reg-rating for regular rating items domain', () => {
      const wrapper = shallow(<CommentIcon ratingType={'reg-rating'} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('reg-rating')
      ).toBeTruthy()
    })

    it('be bool-rating for boolean rating items domain', () => {
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
})
