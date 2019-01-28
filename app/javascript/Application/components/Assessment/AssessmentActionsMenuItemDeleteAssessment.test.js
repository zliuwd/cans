import React from 'react'
import { shallow } from 'enzyme'
import AssessmentActionsMenuItemDeleteAssessment from './AssessmentActionsMenuItemDeleteAssessment'
import { AssessmentStatus } from './AssessmentHelper'

const toggleModalSpy = jest.fn()
const togglePopoverSpy = jest.fn()
const defaultAllowedOperations = ['read', 'update', 'create', 'complete', 'write']
const getWrapper = (
  hasDeletePermission,
  assessmentStatus = AssessmentStatus.inProgress,
  toggleModal = () => {},
  togglePopover = () => {}
) => {
  const allowedOperations = hasDeletePermission ? [...defaultAllowedOperations, 'delete'] : defaultAllowedOperations
  const assessmentMetaData = {
    assessmentMetaData: { allowed_operations: allowedOperations },
  }
  const props = {
    assessmentStatus,
    toggleModal,
    togglePopover,
    ...assessmentMetaData,
  }

  return shallow(<AssessmentActionsMenuItemDeleteAssessment {...props} />)
}

describe('AssessmentActionsMenuItemDeleteAssessment', () => {
  describe('layout', () => {
    describe('button', () => {
      describe('delete permission', () => {
        describe('assessment has delete permission', () => {
          it('renders a button', () => {
            const deleteMenuItem = getWrapper(true, AssessmentStatus.inProgress).find('button.delete-assessment-button')
            expect(deleteMenuItem.exists()).toBe(true)
          })
        })

        describe('assessment does not have delete permission', () => {
          it('does not render a button', () => {
            const deleteMenuItem = getWrapper(false, AssessmentStatus.inProgress).find(
              'button.delete-assessment-button'
            )
            expect(deleteMenuItem.exists()).toBe(false)
          })
        })
      })

      describe('assessment status', () => {
        describe('in progress', () => {
          it('renders a button', () => {
            const deleteMenuItem = getWrapper(true, AssessmentStatus.inProgress).find('button.delete-assessment-button')
            expect(deleteMenuItem.exists()).toBe(true)
          })
        })

        describe('completed', () => {
          it('renders a button', () => {
            const deleteMenuItem = getWrapper(true, AssessmentStatus.completed).find('button.delete-assessment-button')
            expect(deleteMenuItem.exists()).toBe(true)
          })
        })

        describe('deleted', () => {
          it('does not render a button', () => {
            const deleteMenuItem = getWrapper(true, AssessmentStatus.deleted).find('button.delete-assessment-button')
            expect(deleteMenuItem.exists()).toBe(false)
          })
        })
      })

      it('sets the correct props', () => {
        const deleteMenuItem = getWrapper(true).find('button.delete-assessment-button')
        const deleteMenuItemProps = deleteMenuItem.props()
        expect(deleteMenuItemProps.className).toBe('delete-assessment-button')
        expect(typeof deleteMenuItemProps.onClick).toBe('function')
        expect(deleteMenuItemProps.role).toBe('menuitem')
        expect(deleteMenuItemProps.children).toBe('Delete CANS')
      })
    })
  })

  describe('events', () => {
    describe('menu item is clicked', () => {
      it('calls toggleModal and togglePopover', () => {
        const deleteMenuItem = getWrapper(true, AssessmentStatus.inProgress, toggleModalSpy, togglePopoverSpy).find(
          'button.delete-assessment-button'
        )

        deleteMenuItem.simulate('click', {
          target: { className: 'delete-assessment-button' },
        })
        expect(toggleModalSpy).toHaveBeenCalledTimes(1)
        expect(togglePopoverSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
