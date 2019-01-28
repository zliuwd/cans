import React from 'react'
import { shallow } from 'enzyme'
import SearchAssessmentHistoryRecord from './SearchAssessmentHistoryRecord'
import { AssessmentRecordInfo } from '../../Assessment/'
import { assessmentInProgress, assessmentWithNoUpdateInfo } from '../../Assessment/assessment.mocks.test'

const getShallowWrapper = assessment =>
  shallow(
    <SearchAssessmentHistoryRecord
      assessment={assessment}
      navFrom={'SEARCH'}
      key={1}
      inheritUrl={'/staff/0X5/clients/AznnyCs0X5/assessments/298750'}
      updateAssessmentHistoryCallback={() => {}}
    />
  )

describe('<SearchAssessmentHistoryRecord', () => {
  describe('In Progress Assessment', () => {
    it('renders an AssessmentRecordInfo component', () => {
      // given + when
      const wrapper = getShallowWrapper(assessmentInProgress)

      // then
      expect(wrapper.find(AssessmentRecordInfo).length).toEqual(1)
    })
  })

  describe('Assessment with no updated_by info (create info only)', () => {
    it('renders an AssessmentRecordInfo component', () => {
      // given + when
      const wrapper = getShallowWrapper(assessmentWithNoUpdateInfo)

      // then
      expect(wrapper.find(AssessmentRecordInfo).length).toEqual(1)
    })
  })
})
