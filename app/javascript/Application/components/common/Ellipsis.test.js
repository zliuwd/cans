import React from 'react'
import { Popover } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import Icon from '@cwds/icons'
import { Link } from 'react-router-dom'

describe('<Ellipsis />', () => {
  describe('render', () => {
    const defaultProps = { id: 1234, clientId: 'C76Jg230X3' }

    it('Icon', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find('Icon').length).toBe(1)
      expect(wrapper.find('Icon').props().id).toBe('icon-1234')
    })

    it('Popover when clicked', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      wrapper.find(Icon).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
    })

    it('Link', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      wrapper.find(Icon).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      expect(wrapper.find(Link).props().to).toEqual('/clients/C76Jg230X3/assessments/1234/changelog')
    })

    it('Link with View CANS Change Log text', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      wrapper.find(Icon).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      expect(wrapper.find(Link).contains('View CANS Change Log')).toBe(true)
    })
  })
})
