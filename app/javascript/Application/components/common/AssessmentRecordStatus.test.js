import React from 'react'
import AssessmentRecordStatus from './AssessmentRecordStatus'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'

describe('AssessmentRecordStatus', () => {
  describe('when the status is IN_PROGRESS', () => {
    it('renders a spinner icon and the correct status', () => {
      const expectedResult = AssessmentRecordStatus({ status: 'IN_PROGRESS' })
      expect(expectedResult).toEqual(
        <div className="status-icon-wrapper">
          <i className="fa fa-spinner fa-2x" aria-hidden="true" />
          <span className="assessment-in-progress">In Progress</span>
        </div>
      )
    })
  })

  describe('when the status is COMPLETED', () => {
    it('renders a check-circle icon and the correct status', () => {
      const expectedResult = AssessmentRecordStatus({
        status: AssessmentStatus.completed,
      })
      expect(expectedResult).toEqual(
        <div className="status-icon-wrapper">
          <Icon name="check-circle" set={'fa'} className={`fa-2x`} />
          <span className="assessment-completed">Complete</span>
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
})
