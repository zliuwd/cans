import React from 'react'
import { shallow } from 'enzyme'
import AssessmentActionsEllipsis from './AssessmentActionsEllipsis'
import AssessmentDeleteModal from './AssessmentDeleteModal'
import { Button } from '@cwds/components'
import Icon from '@cwds/icons'
import AssessmentActionsMenu from './AssessmentActionsMenu'
import { AssessmentStatus } from '../Assessment/'

const defaultProps = {
  date: '01/01/2019',
  inheritUrl: '/staff/0X5',
  clientId: 'C76Jg230X3',
  assessmentCounty: 'San Francisco',
  assessmentId: 1234,
  assessmentStatus: AssessmentStatus.inProgress,
  assessmentMetaData: {
    allowed_operations: ['read', 'update', 'create', 'complete', 'write', 'delete'],
  },
  updateAssessmentHistoryCallback: () => {},
}

const getWrapper = () => {
  return shallow(<AssessmentActionsEllipsis {...defaultProps} />)
}

describe('<AssessmentActionsEllipsis />', () => {
  describe('render', () => {
    let wrapper
    beforeEach(() => {
      wrapper = getWrapper()
    })

    describe('AssessmentDeleteModal', () => {
      let deleteModal
      beforeEach(() => {
        deleteModal = wrapper.find(AssessmentDeleteModal)
      })

      it('renders an Assessment Delete Modal', () => {
        expect(deleteModal.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const deleteModalProps = deleteModal.props()
        expect(deleteModalProps.isShown).toBe(false)
        expect(deleteModalProps.assessmentId).toBe(1234)
        expect(typeof deleteModalProps.toggleModal).toBe('function')
        expect(typeof deleteModalProps.updateAssessmentHistoryCallback).toBe('function')
      })
    })

    describe('div', () => {
      it('renders a div', () => {
        expect(getWrapper().find('div').length).toBe(1)
      })
    })

    describe('Button', () => {
      let button
      beforeEach(() => {
        button = wrapper.find(Button)
      })

      describe('when Button is clicked', () => {
        it('toggles the isPopoverOpen state', () => {
          expect(wrapper.state().isPopoverOpen).toEqual(false)
          button.simulate('click')
          expect(wrapper.state().isPopoverOpen).toEqual(true)
        })
      })

      it('renders a Button component', () => {
        expect(button.length).toBe(1)
      })

      it('sets the correct props', () => {
        const buttonProps = button.props()
        expect(buttonProps.id).toBe('icon-1234')
        expect(buttonProps.className).toBe('icon-ellipsis')
        expect(buttonProps.type).toBe('button')
        expect(buttonProps['aria-label']).toBe('Ellipsis Menu Button')
        expect(typeof buttonProps.onClick).toBe('function')
      })
    })

    describe('Icon', () => {
      let icon
      beforeEach(() => {
        icon = wrapper.find(Icon)
      })

      it('renders an Icon component', () => {
        expect(icon.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        expect(icon.props().icon).toBe('ellipsis-v')
      })
    })

    describe('AssessmentActionsMenu', () => {
      let actionsMenu
      beforeEach(() => {
        actionsMenu = wrapper.find(AssessmentActionsMenu)
      })

      it('renders a component', () => {
        expect(actionsMenu.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const actionsMenuProps = actionsMenu.props()
        expect(actionsMenuProps.clientId).toBe('C76Jg230X3')
        expect(actionsMenuProps.assessmentId).toBe(1234)
        expect(actionsMenuProps.assessmentMetaData).toEqual({
          allowed_operations: ['read', 'update', 'create', 'complete', 'write', 'delete'],
        })
        expect(actionsMenuProps.assessmentStatus).toBe(AssessmentStatus.inProgress)
        expect(typeof actionsMenuProps.toggleModal).toBe('function')
        expect(typeof actionsMenuProps.togglePopover).toBe('function')
        expect(actionsMenuProps.isPopoverOpen).toBe(false)
        expect(actionsMenuProps.inheritUrl).toBe('/staff/0X5')
      })
    })
  })

  describe('toggleModal', () => {
    describe('when the method is called', () => {
      it('toggles isDeleteAssessmentWarningShown state', () => {
        const wrapper = getWrapper()
        expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
        wrapper
          .find(AssessmentActionsMenu)
          .props()
          .toggleModal()
        expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
      })
    })
  })

  describe('togglePopover', () => {
    describe('when the method is called', () => {
      it('toggles isPopoverOpen state', () => {
        const wrapper = getWrapper()
        expect(wrapper.state().isPopoverOpen).toBe(false)
        wrapper
          .find(AssessmentActionsMenu)
          .props()
          .togglePopover()
        expect(wrapper.state().isPopoverOpen).toBe(true)
      })
    })
  })
})
