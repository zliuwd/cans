import React from 'react'
import { shallow, mount } from 'enzyme'
import { PageModal } from '../common/'
import AssessmentDeleteModal from './AssessmentDeleteModal'
import AssessmentService from './Assessment.service'
import { Select } from '@cwds/components'
import Comment from '../common/Comment'
import { blankPlaceHolder } from './AssessmentHelper'

jest.mock('../Assessment/Assessment.service')

const deletedAssessment = { id: 1, status: 'DELETED' }
const toggleModalSpy = jest.fn()
const assessmentHistoryCallbackSpy = jest.fn()

const getWrapper = (isShown, toggleModal = () => {}, updateAssessmentHistoryCallback = () => {}) => {
  const props = {
    isShown,
    assessmentId: 1,
    toggleModal,
    updateAssessmentHistoryCallback,
    date: '01/01/2019',
  }
  return shallow(<AssessmentDeleteModal {...props} />)
}

const mountWrapper = (isShown, toggleModal = () => {}, updateAssessmentHistoryCallback = () => {}) => {
  const props = {
    isShown,
    assessmentId: 1,
    toggleModal,
    updateAssessmentHistoryCallback,
    date: '01/01/2019',
  }
  return mount(<AssessmentDeleteModal {...props} />)
}

const simulateSelect = (wrapper, optionNumber) => {
  const count = Array.from(Array(optionNumber))
  count.forEach(el => {
    wrapper
      .find('.list__control')
      .first()
      .simulate('keyDown', { key: 'ArrowDown', keyCode: 40 })
  })
  wrapper
    .find('.list__control')
    .first()
    .simulate('keyDown', { key: 'Enter', keyCode: 13 })
}

describe('AssessmentDeleteModal', () => {
  describe('layout', () => {
    describe('isShown prop is true', () => {
      it('renders a PageModal', () => {
        const wrapper = getWrapper(true)
        expect(wrapper.find(PageModal).exists()).toBe(true)
      })

      it('renders a Select', () => {
        const wrapper = getWrapper(true)
        expect(wrapper.find(Select).exists()).toBe(true)
      })

      it('renders a comment when select Other option', () => {
        const wrapper = mountWrapper(true, toggleModalSpy, assessmentHistoryCallbackSpy)
        simulateSelect(wrapper, 4)
        expect(
          wrapper
            .find('.list__single-value')
            .last()
            .text()
        ).toEqual('Other')
        expect(wrapper.find(Comment).exists()).toBe(true)
      })

      it('still keep comment displayed after user inputted reason then select Other option again', () => {
        const wrapper = mountWrapper(true, toggleModalSpy, assessmentHistoryCallbackSpy)
        wrapper.setState({ otherReasonContent: 'some reasons' })
        simulateSelect(wrapper, 4)
        expect(
          wrapper
            .find('.list__single-value')
            .last()
            .text()
        ).toEqual('Other')
        expect(wrapper.find(Comment).exists()).toBe(true)
      })
    })
  })

  describe('Delete Modal props', () => {
    let modalProps
    beforeEach(() => {
      const modal = getWrapper(true).find(PageModal)
      modalProps = modal.props()
    })

    it('sets the correct isOpen value', () => {
      const isOpen = modalProps.isOpen
      expect(isOpen).toBe(true)
    })

    it('sets the correct title', () => {
      const title = modalProps.title
      expect(title).toBe('Delete CANS Assessment - 01/01/2019')
    })

    it('sets the correct warningDescription', () => {
      const warningDescription = modalProps.warningDescription
      expect(warningDescription).toEqual(<div>Choose or enter the reason for deleting this CANS.</div>)
    })

    it('sets the correct description', () => {
      const description = modalProps.description
      expect(description).toBe('This cannot be undone.')
    })

    it('sets the correct cancel label', () => {
      const cancelLabel = modalProps.cancelButtonLabel
      expect(cancelLabel).toBe('Cancel')
    })

    it('sets the correct remove button label', () => {
      const nextStepButtonLabel = modalProps.nextStepButtonLabel
      expect(nextStepButtonLabel).toBe('Delete CANS')
    })

    it('sets a function to onCancel', () => {
      const onCancel = modalProps.onCancel
      expect(typeof onCancel).toBe('function')
    })

    it('sets a function to onRemove', () => {
      const onNextStep = modalProps.onNextStep
      expect(typeof onNextStep).toBe('function')
    })

    it('sets true to isNextStepDisabled', () => {
      const isNextStepDisabled = modalProps.isNextStepDisabled
      expect(isNextStepDisabled).toBe(true)
    })
  })

  describe('Modal Buttons', () => {
    describe('different delete button render mode', () => {
      let wrapper
      let deleteButton
      beforeEach(() => {
        wrapper = mountWrapper(true, toggleModalSpy, assessmentHistoryCallbackSpy)
        deleteButton = wrapper.find('button.warning-modal-stay-logged-in')
      })

      it('renders disabled delete button at beginning', () => {
        expect(deleteButton.html()).toContain('disabled')
      })

      it('renders active delete button when select an option which is not #Other#', () => {
        simulateSelect(wrapper, 1)
        wrapper.update()
        expect(wrapper.state().selectedReason.value).toBe('Entered in error')
        expect(deleteButton.html()).not.toContain('disabled')
      })

      it('renders disabled delete button when select #Other#', () => {
        simulateSelect(wrapper, 4)
        wrapper.update()
        expect(wrapper.state().selectedReason.value).toBe('Other')
        expect(deleteButton.html()).toContain('disabled')
      })

      it('renders active delete button after input some reason', () => {
        wrapper.instance().handleOtherReasonContentChange('Hello')
        expect(deleteButton.html()).not.toContain('disabled')
      })

      it('renders disabled delete button after user delete all of the input', () => {
        wrapper.instance().handleOtherReasonContentChange('')
        expect(deleteButton.html()).toContain('disabled')
      })
    })

    describe('when the cancel button is clicked', () => {
      it('calls toggleModal', () => {
        const wrapper = getWrapper(true, toggleModalSpy)
        const cancelButton = wrapper
          .find(PageModal)
          .dive()
          .find('.warning-modal-logout')
        cancelButton.simulate('click')
        expect(toggleModalSpy).toHaveBeenCalledTimes(1)
        jest.clearAllMocks()
      })

      it('sets state with initialState', () => {
        const initialState = {
          showOtherReasonInput: false,
          otherReasonContent: '',
          selectedReason: blankPlaceHolder,
          isDeleteButtonDisabled: true,
        }
        const wrapper = getWrapper(true, toggleModalSpy)
        const cancelButton = wrapper
          .find(PageModal)
          .dive()
          .find('.warning-modal-logout')
        cancelButton.simulate('click')
        expect(wrapper.state()).toEqual(initialState)
      })
    })

    describe('when the delete cans button is clicked', () => {
      beforeEach(() => {
        const wrapper = mountWrapper(true, toggleModalSpy, assessmentHistoryCallbackSpy)
        simulateSelect(wrapper, 1)
        const deleteButton = wrapper.find('button.warning-modal-stay-logged-in')
        deleteButton.simulate('click')
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('calls the assessment delete service', () => {
        const deleteServiceSpy = jest.spyOn(AssessmentService, 'delete')
        deleteServiceSpy.mockReturnValue(Promise.resolve(deletedAssessment))
        expect(deleteServiceSpy).toHaveBeenCalledTimes(1)
      })

      it('calls toggleModal', () => {
        expect(toggleModalSpy).toHaveBeenCalledTimes(1)
      })

      it('calls the updateAssessmentHistoryCallback', () => {
        expect(assessmentHistoryCallbackSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
