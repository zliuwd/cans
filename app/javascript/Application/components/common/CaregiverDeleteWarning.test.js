import React from 'react'
import { shallow, mount } from 'enzyme'
import CaregiverDeleteWarning from '../common/CaregiverDeleteWarning'
import { Alert, ModalBody, CardTitle } from '@cwds/components'

const props = {
  isCaregiverWarningShown: true,
  focusedCaregiverId: 'a',
  handleCaregiverRemove: jest.fn(),
  handleWarningShow: jest.fn(),
}

describe('<CaregiverDeleteWarning />', () => {
  describe('when renders caregiver delete warning', () => {
    it('should render cancel button', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.find('#caregiver-warning-cancel').props().children).toBe('Cancel')
    })

    it('should render remove button', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.find('#caregiver-warning-remove').props().children).toBe('Remove')
    })

    it('should render description', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.find(ModalBody).props().children).toContain('This may affect some of your entries.')
    })

    it('should render alert', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.find(Alert).props().children).toContain(
        'You are about to remove the caregiver from this Assessment.'
      )
    })

    it('should render title', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.find(CardTitle).props().children).toContain('Warning')
    })

    it('should render isOpen when warningShow is true', () => {
      const wrapper = shallow(<CaregiverDeleteWarning {...props} />)
      expect(wrapper.props().isOpen).toEqual(true)
    })
  })

  describe('it invokes a callback', () => {
    const render = ({
      isCaregiverWarningShown = true,
      handleCaregiverRemove = jest.fn(),
      handleWarningShow = jest.fn(),
    }) =>
      mount(
        <CaregiverDeleteWarning
          isCaregiverWarningShown={isCaregiverWarningShown}
          handleWarningShow={handleWarningShow}
          handleCaregiverRemove={handleCaregiverRemove}
        />
      )
    describe('cancel button', () => {
      it('invokes a cancel callback', () => {
        const mockFn = jest.fn()
        const component = render({ handleWarningShow: mockFn })
        component
          .find('button')
          .at(0)
          .simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
      })

      it('invokes next step call back', () => {
        const mockFn = jest.fn()
        const mockFn2 = jest.fn()
        const component = render({ handleCaregiverRemove: mockFn, handleWarningShow: mockFn2 })
        component
          .find('button')
          .at(1)
          .simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockFn2).toHaveBeenCalledTimes(1)
      })
    })
  })
})
