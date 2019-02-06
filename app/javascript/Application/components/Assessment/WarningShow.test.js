import React from 'react'
import { shallow, mount } from 'enzyme'
import WarningShow from './WarningShow'

describe('<WarningShow />', () => {
  const props = {
    isSubmitWarningShown: true,
    handleSubmitAssessment: jest.fn(),
    handleSubmitWarning: jest.fn(),
  }
  describe('checks the length ', () => {
    it('checks the length of the component', () => {
      const wrapper = shallow(<WarningShow {...props} />)
      expect(wrapper.length).toBe(1)
    })

    it('when isSubmitWarningShown true checks the length of the  ConfidentialityWarning', () => {
      const wrapper = shallow(<WarningShow {...props} />)
      expect(wrapper.find('ConfidentialityWarning').length).toBe(1)
    })

    it('when isSubmitWarningShown is false checks the length of the  ConfidentialityWarning', () => {
      const wrapper = shallow(<WarningShow {...props} />)
      wrapper.setProps({
        isSubmitWarningShown: false,
      })
      expect(wrapper.find('ConfidentialityWarning').length).toBe(0)
    })
  })

  describe('checking PageModal Props', () => {
    it('should not render PageModal component when  isSubmitWarningShown false', () => {
      const wrapper = shallow(<WarningShow {...props} />)
      wrapper.setProps({
        isSubmitWarningShown: false,
      })
      expect(wrapper.find('PageModal').length).toBe(0)
    })
    const wrapper = mount(<WarningShow {...props} />)
    it('should not render PageModal component when  isSubmitWarningShown true', () => {
      expect(wrapper.find('PageModal').length).toBe(1)
    })

    it('should render cancel button label ', () => {
      expect(wrapper.find('PageModal').props().cancelButtonLabel).toContain('Cancel')
    })

    it('should render remove button label ', () => {
      expect(wrapper.find('PageModal').props().nextStepButtonLabel).toContain('I Agree')
    })

    it('should render title when  isSubmitWarningShown trueis true', () => {
      expect(wrapper.find('PageModal').props().title).toContain('Reminder')
    })

    it('should render isOpen when isSubmitWarningShown trueis true', () => {
      expect(wrapper.find('PageModal').props().isOpen).toEqual(true)
    })
  })

  describe('it invokes a callback', () => {
    const render = ({
      isSubmitWarningShown = true,
      handleSubmitWarning = jest.fn(),
      handleSubmitAssessment = jest.fn(),
    }) =>
      mount(
        <WarningShow
          isSubmitWarningShown={isSubmitWarningShown}
          handleSubmitWarning={handleSubmitWarning}
          handleSubmitAssessment={handleSubmitAssessment}
        />
      )
    describe('cancel button', () => {
      it('invokes a cancel callback', () => {
        const mockFn = jest.fn()
        const component = render({ handleSubmitWarning: mockFn })
        component
          .find('button')
          .at(0)
          .simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
      })

      it('invokes next step call back', () => {
        const mockFn = jest.fn()
        const mockFn2 = jest.fn()
        const component = render({ handleSubmitWarning: mockFn, handleSubmitAssessment: mockFn2 })
        const renderPageModal = component.find('PageModal').find('button')
        renderPageModal.at(1).simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockFn2).toHaveBeenCalledTimes(1)
      })
    })
  })
})
