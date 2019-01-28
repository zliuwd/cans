import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import AssessmentActionsMenuItemChangeLog from './AssessmentActionsMenuItemChangeLog'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'

const defaultProps = {
  assessmentId: 1234,
  inheritUrl: '/staff/0X5',
  clientId: 'C76Jg230X3',
  assessmentStatus: AssessmentStatus.inProgress,
}

const getWrapper = (props = defaultProps) => {
  return shallow(<AssessmentActionsMenuItemChangeLog {...props} />)
}

describe('AssessmentActionsMenuItemChangeLog', () => {
  describe('layout', () => {
    let changeLogMenuItem
    beforeEach(() => {
      changeLogMenuItem = getWrapper().find('button.view-change-log-button')
    })

    describe('button', () => {
      it('renders a button', () => {
        expect(changeLogMenuItem.exists()).toBe(true)
      })

      it('sets the correct props', () => {
        const changeLogMenuItemProps = changeLogMenuItem.props()
        expect(changeLogMenuItemProps.className).toBe('view-change-log-button')
        expect(typeof changeLogMenuItemProps.onClick).toBe('function')
        expect(changeLogMenuItemProps.role).toBe('menuitem')
        expect(changeLogMenuItemProps.children).toBe('View CANS Change Log')
      })
    })
  })

  describe('events', () => {
    describe('menu item is clicked', () => {
      describe('Redirect', () => {
        let wrapper
        let changeLogMenuItem

        beforeEach(() => {
          wrapper = getWrapper()
          changeLogMenuItem = wrapper.find('button.view-change-log-button')
        })

        it('renders a Redirect component', () => {
          expect(wrapper.find(Redirect).exists()).toBe(false)
          changeLogMenuItem.simulate('click', {
            target: { className: 'view-change-log-button' },
          })
          expect(wrapper.find(Redirect).exists()).toBe(true)
        })

        it('sets the correct props', () => {
          changeLogMenuItem.simulate('click', {
            target: { className: 'view-change-log-button' },
          })
          expect(wrapper.find(Redirect).props().to).toEqual({
            pathname: '/staff/0X5/clients/C76Jg230X3/assessments/1234/changelog/IN_PROGRESS',
          })
        })
      })
    })
  })
})
