import React from 'react'
import { shallow, mount } from 'enzyme'
import CompleteModal from './CompleteModal'

describe('<CompleteModal />', () => {
  const props = {
    isCompleteModalShown: true,
    handleCompleteAssessment: jest.fn(),
    handleCompleteWarning: jest.fn(),
    handleSaveAssessment: jest.fn(),
  }
  describe('checks the length ', () => {
    it('checks the length of the component', () => {
      const wrapper = shallow(<CompleteModal {...props} />)
      expect(wrapper.length).toBe(1)
    })

    it('when isCompleteModalShown true checks the length of the Modal', () => {
      const wrapper = shallow(<CompleteModal {...props} />)
      expect(wrapper.find('.complete-modal-header').length).toBe(1)
    })
  })

  describe('checking CompleteModal Props', () => {
    it('should not render Modal component when isCompleteModalShown false', () => {
      const wrapper = shallow(<CompleteModal {...props} />)
      wrapper.setProps({
        isCompleteModalShown: false,
      })
      expect(wrapper.find('Modal').props().isOpen).toBe(false)
    })
    const wrapper = mount(<CompleteModal {...props} />)

    it('should render Modal component when isCompleteModalShown true', () => {
      expect(wrapper.find('Modal').props().isOpen).toBe(true)
    })

    it('should render save and return button label', () => {
      expect(
        wrapper
          .find('.save-return-button')
          .at(0)
          .props().children
      ).toBe('Save and return to the assessment')
    })

    it('should render complete button label ', () => {
      expect(
        wrapper
          .find('.complete-confirm-button')
          .at(0)
          .props().children
      ).toBe('Complete the assessment')
    })

    it('should render title when isCompleteModalShown is true', () => {
      expect(wrapper.find('CardTitle').props().children).toBe('Completed CANS are unable to be edited.')
    })

    it('should render modal body when isCompleteModalShown is true', () => {
      expect(wrapper.find('ModalBody').props().children).toBe(
        'Once you select "Complete", you will no longer be able to edit CANS assessment.'
      )
    })

    it('should render isOpen when isCompleteModalShown is true', () => {
      expect(wrapper.find('Modal').props().isOpen).toEqual(true)
    })
  })

  describe('it invokes a callback', () => {
    const render = ({
      isCompleteModalShown = true,
      handleCompleteWarning = jest.fn(),
      handleCompleteAssessment = jest.fn(),
      handleSaveAssessment = jest.fn(),
    }) =>
      mount(
        <CompleteModal
          isCompleteModalShown={isCompleteModalShown}
          handleCompleteWarning={handleCompleteWarning}
          handleCompleteAssessment={handleCompleteAssessment}
          handleSaveAssessment={handleSaveAssessment}
        />
      )
    describe('save and return button', () => {
      it('invokes a cancel callback', () => {
        const mockFn = jest.fn()
        const component = render({ handleCompleteWarning: mockFn })
        component
          .find('button')
          .at(0)
          .simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
      })

      it('invokes a save and return callback', () => {
        const mockFn = jest.fn()
        const mockFn2 = jest.fn()
        const component = render({ handleCompleteWarning: mockFn, handleSaveAssessment: mockFn2 })
        component
          .find('button')
          .at(1)
          .simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockFn2).toHaveBeenCalledTimes(1)
      })

      it('invokes complete call back', () => {
        const mockFn = jest.fn()
        const mockFn2 = jest.fn()
        const component = render({ handleCompleteWarning: mockFn, handleCompleteAssessment: mockFn2 })
        const renderPageModal = component.find('Modal').find('button')
        renderPageModal.at(2).simulate('click')
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockFn2).toHaveBeenCalledTimes(1)
      })
    })
  })
})
