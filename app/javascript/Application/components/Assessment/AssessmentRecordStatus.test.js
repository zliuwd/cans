import React from 'react'
import AssessmentRecordStatus from './AssessmentRecordStatus'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'
import { mount } from 'enzyme'

describe('AssessmentRecordStatus', () => {
  describe('when the status is IN_PROGRESS', () => {
    it('renders a circle-notch icon and the correct status', () => {
      const expectedResult = AssessmentRecordStatus({
        status: AssessmentStatus.inProgress,
      })
      expect(expectedResult).toEqual(
        <div className={'status-icon-wrapper'}>
          <Icon name={'circle-notch'} set={'fa'} className={'fa-2x'} />
          <span className={'assessment-in-progress'}>In Progress</span>
        </div>
      )
    })
  })

  describe('when the status is COMPLETED', () => {
    const isForTable = false
    const testprops = { status: AssessmentStatus.completed, isForTable }
    let wrapper
    beforeEach(() => {
      wrapper = mount(<AssessmentRecordStatus {...testprops} />)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('renders a check-circle icon with text Completed', () => {
      expect(wrapper.find(Icon).exists()).toBe(true)
      expect(wrapper.find(Icon).props().name).toBe('check-circle')
      expect(wrapper.find('.assessment-completed').text()).toEqual('Completed')
    })

    it('renders the icon with className #fa-2x#', () => {
      expect(wrapper.find(Icon).props().className).toBe('fa-2x')
    })
  })

  describe('when the status is DELETED', () => {
    it('renders a trash-alt icon and the correct status', () => {
      const expectedResult = AssessmentRecordStatus({
        status: AssessmentStatus.deleted,
      })
      expect(expectedResult).toEqual(
        <div className={'status-icon-wrapper'}>
          <Icon name={'trash-alt'} set={'fa'} className={'fa-2x'} />
          <span className={'assessment-deleted'}>Deleted</span>
        </div>
      )
    })
  })

  describe('when the status is falsy', () => {
    it('does not render an icon or a status', () => {
      const expectedResult = AssessmentRecordStatus({ status: null })
      expect(expectedResult).toEqual(null)
    })
  })

  describe('when AssessmentRecordStatus is rendered as table mode', () => {
    const isForTable = true
    const testprops = { status: AssessmentStatus.deleted, isForTable }
    let wrapper
    beforeEach(() => {
      wrapper = mount(<AssessmentRecordStatus {...testprops} />)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('renders a trash-alt icon without text', () => {
      expect(wrapper.find(Icon).exists()).toBe(true)
      expect(wrapper.find('.assessment-deleted').text()).toEqual('')
    })

    it('renders a trash-alt icon with className #fa-1x#', () => {
      expect(wrapper.find(Icon).props().className).toBe('fa-1x')
    })
  })
})
