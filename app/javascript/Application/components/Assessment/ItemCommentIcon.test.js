import React from 'react'
import { Icon } from '@cwds/components'
import { shallow } from 'enzyme'
import ItemCommentIcon from './ItemCommentIcon'

describe('<ItemCommentIcon />', () => {
  describe('icon set', () => {
    it('should render an icon from `fas` set when isSolid', () => {
      const wrapper = shallow(<ItemCommentIcon isSolid={true} />)
      expect(wrapper.find(Icon).props().set).toBe('fas')
    })

    it('should render an icon from `far` set when isSolid = false', () => {
      const wrapper = shallow(<ItemCommentIcon isSolid={false} />)
      expect(wrapper.find(Icon).props().set).toBe('far')
    })
  })

  describe('icon className', () => {
    it('should be comment-icon-solid when isSolid', () => {
      const wrapper = shallow(<ItemCommentIcon isSolid={true} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('comment-icon-solid')
      ).toBeTruthy()
    })

    it('should be comment-icon-outlined when isSolid = false', () => {
      const wrapper = shallow(<ItemCommentIcon isSolid={false} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('comment-icon-outlined')
      ).toBeTruthy()
    })

    it('should propagate className prop to Icon element', () => {
      const wrapper = shallow(<ItemCommentIcon className={'hello'} />)
      expect(
        wrapper
          .find(Icon)
          .props()
          .className.includes('hello')
      ).toBeTruthy()
    })
  })
})
