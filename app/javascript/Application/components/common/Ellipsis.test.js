import React from 'react'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import { Button } from '@cwds/components'
import PageModal from '../common/PageModal'
import AssessmentService from '../Assessment/Assessment.service'
import { AssessmentStatus } from '../Assessment/'

jest.mock('../Assessment/Assessment.service')

const deletedAssessment = { id: 1, status: 'DELETED' }
const defaultAllowedOperations = ['read', 'update', 'create', 'complete', 'write']
const defaultProps = {
  clientId: 'C76Jg230X3',
  assessmentId: 1234,
  inheritUrl: '/staff/0X5',
  updateAssessmentHistoryCallback: () => {},
}

const getWrapper = (status, hasDeletePermission = true) => {
  const allowedOperations = hasDeletePermission ? [...defaultAllowedOperations, 'delete'] : defaultAllowedOperations
  const assessmentMetaData = {
    assessmentMetaData: { allowed_operations: allowedOperations },
  }
  const props = {
    assessmentStatus: status,
    ...assessmentMetaData,
    ...defaultProps,
  }
  return shallow(<Ellipsis {...props} />)
}

describe('<Ellipsis />', () => {
  describe('render', () => {
    let wrapper
    beforeEach(() => {
      wrapper = getWrapper(AssessmentStatus.inProgress)
    })

    it('renders a Button component with the correct props', () => {
      expect(wrapper.find('Button').length).toBe(1)
      expect(wrapper.find('Button').props().id).toBe('icon-1234')
      expect(wrapper.find('Button').props().type).toBe('button')
      expect(wrapper.find('Button').props()['aria-label']).toBe('Ellipsis Menu Button')
      expect(typeof wrapper.find('Button').props().onClick).toBe('function')
    })

    it('renders an Icon component', () => {
      expect(wrapper.find('Icon').length).toBe(1)
    })

    describe('Popover', () => {
      it('renders a Popover component', () => {
        expect(wrapper.find(Popover).length).toBe(1)
      })

      it('renders an Popover component with the correct props', () => {
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      })

      it('updates the isOpen prop to true when clicked', () => {
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
        wrapper.find(Button).simulate('click')
        expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      })
    })

    describe('PopoverBody component', () => {
      it('renders a PopoverBody component', () => {
        expect(wrapper.find(PopoverBody).length).toBe(1)
      })
    })

    describe('PopOver Menu Items', () => {
      let popoverBody
      beforeEach(() => {
        popoverBody = wrapper.find(PopoverBody)
      })

      describe('view change log menu item', () => {
        describe('in progress assessment', () => {
          it('renders the menu item', () => {
            expect(popoverBody.find('button.view-change-log-button').exists()).toBe(true)
            expect(popoverBody.find('button.view-change-log-button').text()).toBe('View CANS Change Log')
          })
        })

        describe('completed assessment', () => {
          it('renders the menu item', () => {
            const wrapper = getWrapper(AssessmentStatus.completed)
            const popoverBody = wrapper.find(PopoverBody)
            expect(popoverBody.find('button.view-change-log-button').exists()).toBe(true)
            expect(popoverBody.find('button.view-change-log-button').text()).toBe('View CANS Change Log')
          })
        })

        describe('deleted assessment', () => {
          it('renders the menu item', () => {
            const wrapper = getWrapper(AssessmentStatus.deleted)
            const popoverBody = wrapper.find(PopoverBody)
            expect(popoverBody.find('button.view-change-log-button').exists()).toBe(true)
            expect(popoverBody.find('button.view-change-log-button').text()).toBe('View CANS Change Log')
          })
        })
      })

      describe('delete cans menu item', () => {
        describe('assessment with delete permission', () => {
          describe('in progress assessment', () => {
            it('renders the menu item', () => {
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(true)
              expect(popoverBody.find('button.delete-assessment-button').text()).toBe('Delete CANS')
            })
          })

          describe('completed assessment', () => {
            it('renders the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.completed)
              const popoverBody = wrapper.find(PopoverBody)
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(true)
              expect(popoverBody.find('button.delete-assessment-button').text()).toBe('Delete CANS')
            })
          })

          describe('deleted assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.deleted)
              const popoverBody = wrapper.find(PopoverBody)
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(false)
            })
          })
        })

        describe('assessment without delete permission', () => {
          describe('in progress assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.inProgress, false)
              const popoverBody = wrapper.find(PopoverBody)
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(false)
            })
          })

          describe('completed assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.completed, false)
              const popoverBody = wrapper.find(PopoverBody)
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(false)
            })
          })

          describe('deleted assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.deleted, false)
              const popoverBody = wrapper.find(PopoverBody)
              expect(popoverBody.find('button.delete-assessment-button').exists()).toBe(false)
            })
          })
        })
      })
    })

    describe('Redirect', () => {
      describe('when the View CANS Change Log menu item is clicked', () => {
        it('renders a Redirect component with the correct props', () => {
          const viewCansChangeLogMenuItem = wrapper.find(PopoverBody).find('button.view-change-log-button')
          viewCansChangeLogMenuItem.simulate('click', {
            target: { className: 'view-change-log-button' },
          })
          expect(wrapper.find(Redirect).exists()).toBe(true)
          expect(wrapper.find(Redirect).props().to).toEqual({
            pathname: '/staff/0X5/clients/C76Jg230X3/assessments/1234/changelog/IN_PROGRESS',
          })
        })
      })
    })

    describe('Delete CANS Warning Modal', () => {
      describe('when the Delete CANS menu item is clicked', () => {
        it('renders a PageModal component with the correct props', () => {
          const deleteCansMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
          deleteCansMenuItem.simulate('click', {
            target: { className: 'delete-assessment-button' },
          })
          expect(wrapper.find(PageModal).exists()).toBe(true)
          expect(wrapper.find(PageModal).props().isOpen).toBe(true)
          expect(wrapper.find(PageModal).props().title).toBe('Deleting CANS Warning')
          expect(wrapper.find(PageModal).props().warningDescription).toEqual(
            <div>You are attempting to delete this CANS.</div>
          )
          expect(wrapper.find(PageModal).props().description).toBe('This cannot be undone.')
          expect(wrapper.find(PageModal).props().removeButtonLabel).toBe('Delete CANS')
          expect(wrapper.find(PageModal).props().cancelButtonLabel).toBe('Cancel')
          expect(typeof wrapper.find(PageModal).props().onCancel).toEqual('function')
          expect(typeof wrapper.find(PageModal).props().onRemove).toEqual('function')
        })
      })

      describe('Modal Buttons', () => {
        describe('when the cancel button is clicked', () => {
          it('calls the handleWarningCancel method and sets state', () => {
            const spy = jest.spyOn(wrapper.instance(), 'handleWarningCancel')
            const deleteCansMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
            deleteCansMenuItem.simulate('click', {
              target: { className: 'delete-assessment-button' },
            })
            const cancelButton = wrapper
              .find(PageModal)
              .dive()
              .find('.warning-modal-logout')
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
            expect(wrapper.state().isPopOverOpen).toBe(false)
            cancelButton.simulate('click')
            expect(spy).toHaveBeenCalledTimes(1)
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
          })
        })

        describe('when the delete cans button is clicked', () => {
          it('calls the handleWarningDelete method and sets state', async () => {
            const handleWarningDeleteSpy = jest.spyOn(wrapper.instance(), 'handleWarningDelete')
            const deleteServiceSpy = jest.spyOn(AssessmentService, 'delete')
            deleteServiceSpy.mockReturnValue(Promise.resolve(deletedAssessment))
            const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal')
            const deleteCansMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
            deleteCansMenuItem.simulate('click', {
              target: { className: 'delete-assessment-button' },
            })
            const deleteButton = wrapper
              .find(PageModal)
              .dive()
              .find('.warning-modal-stay-logged-in')
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
            expect(wrapper.state().isPopOverOpen).toBe(false)
            await deleteButton.simulate('click')
            expect(handleWarningDeleteSpy).toHaveBeenCalledTimes(1)
            expect(deleteServiceSpy).toHaveBeenCalledTimes(1)
            expect(closeModalSpy).toHaveBeenCalledTimes(1)
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
          })
        })
      })
    })
  })
})
