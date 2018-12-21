import React from 'react'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { Button } from '@cwds/components'

describe('<Ellipsis />', () => {
  describe('render', () => {
    const defaultProps = {
      clientId: 'C76Jg230X3',
      assessmentId: 1234,
      inheritUrl: '/staff/0X5',
    }

    it('renders a Button component with the correct props', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find('Button').length).toBe(1)
      expect(wrapper.find('Button').props().id).toBe('icon-1234')
      expect(wrapper.find('Button').props().type).toBe('button')
      expect(wrapper.find('Button').props()['aria-label']).toBe('Ellipsis Menu Button')
    })

    it('renders an Icon component', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find('Icon').length).toBe(1)
    })

    describe('Popover', () => {
      it('renders a Popover component', () => {
        const wrapper = shallow(<Ellipsis {...defaultProps} />)
        expect(wrapper.find(Popover).length).toBe(1)
      })

      it('renders an Popover component with the correct props', () => {
        const wrapper = shallow(<Ellipsis {...defaultProps} />)
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      })

      it('updates the isOpen prop to true when clicked', () => {
        const wrapper = shallow(<Ellipsis {...defaultProps} />)
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
        wrapper.find(Button).simulate('click')
        expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      })
    })

    it('renders a PopoverBody component', () => {
      const wrapper = shallow(<Ellipsis {...defaultProps} />)
      expect(wrapper.find(PopoverBody).length).toBe(1)
    })

    describe('Link component', () => {
      it('renders a Link component and the correct props', () => {
        const wrapper = shallow(<Ellipsis {...defaultProps} />)
        expect(wrapper.find(Link).props().to).toEqual({
          pathname: '/staff/0X5/clients/C76Jg230X3/assessments/1234/changelog',
        })
      })

      it('Link with View CANS Change Log text', () => {
        const wrapper = shallow(<Ellipsis {...defaultProps} />)
        expect(wrapper.find(Link).contains('View CANS Change Log')).toBe(true)
      })
    })
  })
})
