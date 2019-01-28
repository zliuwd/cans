import React from 'react'
import { shallow } from 'enzyme'
import { PageModal } from '../common/'
import AssessmentDeleteModal from './AssessmentDeleteModal'
import AssessmentService from './Assessment.service'

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
  }
  return shallow(<AssessmentDeleteModal {...props} />)
}

describe('AssessmentDeleteModal', () => {
  describe('layout', () => {
    describe('isShown prop is true', () => {
      it('renders a PageModal', () => {
        const wrapper = getWrapper(true)
        expect(wrapper.find(PageModal).exists()).toBe(true)
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
      expect(title).toBe('Deleting CANS Warning')
    })

    it('sets the correct warningDescription', () => {
      const warningDescription = modalProps.warningDescription
      expect(warningDescription).toEqual('You are attempting to delete this CANS.')
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
      const removeLabel = modalProps.removeButtonLabel
      expect(removeLabel).toBe('Delete CANS')
    })

    it('sets a function to onCancel', () => {
      const onCancel = modalProps.onCancel
      expect(typeof onCancel).toBe('function')
    })

    it('sets a function to onRemove', () => {
      const onRemove = modalProps.onRemove
      expect(typeof onRemove).toBe('function')
    })
  })

  describe('Modal Buttons', () => {
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
    })

    describe('when the delete cans button is clicked', () => {
      beforeEach(async () => {
        const wrapper = getWrapper(true, toggleModalSpy, assessmentHistoryCallbackSpy)
        const deleteButton = wrapper
          .find(PageModal)
          .dive()
          .find('.warning-modal-stay-logged-in')
        await deleteButton.simulate('click')
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
