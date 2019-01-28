import React from 'react'
import { shallow } from 'enzyme'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import AssessmentActionsMenu from './AssessmentActionsMenu'
import AssessmentActionsMenuItemChangeLog from './AssessmentActionsMenuItemChangeLog'
import AssessmentActionsMenuItemDeleteAssessment from './AssessmentActionsMenuItemDeleteAssessment'
import { AssessmentStatus } from './AssessmentHelper'

const defaultAllowedOperations = ['read', 'update', 'create', 'complete', 'write']
const defaultProps = {
  clientId: 'C76Jg230X3',
  assessmentId: 1234,
  inheritUrl: '/staff/0X5',
}
const getWrapper = (
  isPopoverOpen,
  hasDeletePermission,
  assessmentStatus,
  toggleModal = () => {},
  togglePopover = () => {}
) => {
  const allowedOperations = hasDeletePermission ? [...defaultAllowedOperations, 'delete'] : defaultAllowedOperations
  const assessmentMetaData = {
    assessmentMetaData: { allowed_operations: allowedOperations },
  }
  const props = {
    isPopoverOpen,
    assessmentStatus,
    toggleModal,
    togglePopover,
    ...assessmentMetaData,
    ...defaultProps,
  }

  return shallow(<AssessmentActionsMenu {...props} />)
}

describe('AssessmentActionsMenu', () => {
  describe('layout', () => {
    let popover
    let popoverBody
    beforeEach(() => {
      popover = getWrapper(false, true, AssessmentStatus.inProgress).find(Popover)
      popoverBody = popover.find(PopoverBody)
    })

    describe('Popover', () => {
      it('renders a Popover component', () => {
        expect(popover.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const popoverProps = popover.props()
        expect(popoverProps.isOpen).toBe(false)
        expect(typeof popoverProps.toggle).toBe('function')
        expect(popoverProps.target).toEqual('icon-1234')
        expect(popoverProps.placement).toEqual('bottom-start')
      })
    })

    describe('PopoverBody', () => {
      it('renders a PopoverBody component', () => {
        expect(popoverBody.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        expect(popoverBody.props().className).toBe('popoverbody')
      })
    })

    describe('AssessmentActionsMenuItemChangeLog', () => {
      let changeLogMenuItem
      beforeEach(() => {
        changeLogMenuItem = popoverBody.find(AssessmentActionsMenuItemChangeLog)
      })

      it('renders an AssessmentActionsMenuItemChangeLog component', () => {
        expect(changeLogMenuItem.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const changeLogMenuItemProps = changeLogMenuItem.props()
        expect(changeLogMenuItemProps.inheritUrl).toBe('/staff/0X5')
        expect(changeLogMenuItemProps.clientId).toBe('C76Jg230X3')
        expect(changeLogMenuItemProps.assessmentId).toBe(1234)
        expect(changeLogMenuItemProps.assessmentStatus).toBe('IN_PROGRESS')
      })
    })

    describe('AssessmentActionsMenuItemDeleteAssessment', () => {
      let deleteMenuItem
      beforeEach(() => {
        deleteMenuItem = popoverBody.find(AssessmentActionsMenuItemDeleteAssessment)
      })

      it('renders an AssessmentActionsMenuItemChangeLog component', () => {
        expect(deleteMenuItem.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const deleteMenuItemProps = deleteMenuItem.props()
        expect(deleteMenuItemProps.assessmentStatus).toBe(AssessmentStatus.inProgress)
        expect(deleteMenuItemProps.assessmentMetaData).toEqual({
          allowed_operations: ['read', 'update', 'create', 'complete', 'write', 'delete'],
        })
        expect(typeof deleteMenuItemProps.togglePopover).toBe('function')
        expect(typeof deleteMenuItemProps.toggleModal).toBe('function')
      })
    })
  })
})
