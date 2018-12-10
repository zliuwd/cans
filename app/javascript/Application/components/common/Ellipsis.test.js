import React from 'react'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import Icon from '@cwds/icons'

describe('<Ellipsis />', () => {
  describe('render', () => {
    const defaultProps = { id: 1234 }
    const wrapper = shallow(<Ellipsis {...defaultProps} />)

    it('icon', () => {
      expect(wrapper.find('Icon').length).toBe(1)
    })

    it('Popover when clicked', () => {
      expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      wrapper.find(Icon).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
    })

    it('PopoverBody with View CANS Change Log text', () => {
      wrapper.find(Icon).simulate('click')
      expect(wrapper.find(PopoverBody).html()).toContain('View CANS Change Log')
    })
  })
})
