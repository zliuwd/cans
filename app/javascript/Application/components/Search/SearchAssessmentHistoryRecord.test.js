import React from 'react'
import { shallow } from 'enzyme'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import AssessmentRecordInfo from '../common/AssessmentRecordInfo'
import { assessmentInProgress, assessmentWithNoUpdateInfo } from '../Assessment/assessment.mocks.test'

jest.mock('../Assessment/Assessment.service')

const getShallowWrapper = assessment =>
  shallow(
    <SearchAssessmentHistoryRecord
      assessment={assessment}
      navFrom="SEARCH"
      inheritUrl={'/staff/0X5/clients/AznnyCs0X5/assessments/298750'}
    />
  )

describe('<SearchAssessmentHistoryRecord', () => {
  describe('In Progress Assessment', () => {
    it('renders a AssessmentRecordInfo component', () => {
      // given + when
      const wrapper = getShallowWrapper(assessmentInProgress)

      // then
      expect(wrapper.find(AssessmentRecordInfo).length).toEqual(1)
    })
  })

  describe('Assessment with no updated_by info (create info only)', () => {
    it('renders a AssessmentRecordInfo component', () => {
      // given + when
      const wrapper = getShallowWrapper(assessmentWithNoUpdateInfo)

      // then
      expect(wrapper.find(AssessmentRecordInfo).length).toEqual(1)
    })
  })
})
