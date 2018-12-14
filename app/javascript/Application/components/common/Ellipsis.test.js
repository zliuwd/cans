import React from 'react'
import { Popover } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { Button } from '@cwds/components'

describe('<Ellipsis />', () => {
  describe('render', () => {
    const defaultProps = { id: 1234, clientId: 'C76Jg230X3' }

    it('Button', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find('Button').length).toBe(1)
      expect(wrapper.find('Button').props().id).toBe('icon-1234')
      expect(wrapper.find('Button').props().type).toBe('button')
      expect(wrapper.find('Button').props()['aria-label']).toBe('Ellipsis Menu Button')
    })

    it('Icon', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find('Icon').length).toBe(1)
    })

    it('Popover when clicked', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      wrapper.find(Button).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
    })

    it('Link', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      wrapper.find(Button).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      expect(wrapper.find(Link).props().to).toEqual('/clients/C76Jg230X3/assessments/1234/changelog')
    })

    it('Link with View CANS Change Log text', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      wrapper.find(Button).simulate('click')
      expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      expect(wrapper.find(Link).contains('View CANS Change Log')).toBe(true)
    })
  })
})
