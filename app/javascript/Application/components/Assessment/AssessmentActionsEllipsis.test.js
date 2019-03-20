import React from 'react'
import { shallow } from 'enzyme'
import AssessmentActionsEllipsis from './AssessmentActionsEllipsis'
import AssessmentDeleteModal from './AssessmentDeleteModal'
import { MenuItem, UncontrolledMenu as Menu } from '@cwds/components'
import { AssessmentStatus } from '../Assessment/'
import { clone } from '../../util/common'

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

    describe('Menu', () => {
      let actionsMenu
      beforeEach(() => {
        actionsMenu = wrapper.find(Menu)
      })

      it('renders Menu component', () => {
        expect(actionsMenu.length).toBe(1)
      })

      it('component has two menu items', () => {
        const menuItems = wrapper.find(MenuItem)
        expect(menuItems.length).toBe(2)
      })

      it('delete menu hidden if no permission', () => {
        const props = clone(defaultProps)
        props.assessmentMetaData.allowed_operations = ['read']
        props.updateAssessmentHistoryCallback = () => {}
        const wrapper = shallow(<AssessmentActionsEllipsis {...props} />)
        expect(wrapper.find('button.delete-action').exists()).toBe(false)
      })

      it('delete menu hidden if status deleted ', () => {
        const props = clone(defaultProps)
        props.assessmentStatus = AssessmentStatus.deleted
        props.updateAssessmentHistoryCallback = () => {}
        const wrapper = shallow(<AssessmentActionsEllipsis {...props} />)
        expect(wrapper.find('button.delete-action').exists()).toBe(false)
      })

      it('delete menu hidden if no allowed operations', () => {
        const props = clone(defaultProps)
        props.assessmentMetaData.allowed_operations = undefined
        props.updateAssessmentHistoryCallback = () => {}
        const wrapper = shallow(<AssessmentActionsEllipsis {...props} />)
        expect(wrapper.find('button.delete-action').exists()).toBe(false)
      })
    })
  })

  describe('toggleDeleteModal', () => {
    describe('when the method is called', () => {
      it('toggles isDeleteAssessmentWarningShown state', () => {
        const wrapper = getWrapper()
        expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
        wrapper.instance().toggleDeleteModal()
        expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
        wrapper.instance().toggleDeleteModal()
        expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
      })
    })
  })
})
