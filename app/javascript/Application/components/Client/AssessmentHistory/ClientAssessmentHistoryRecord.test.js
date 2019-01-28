import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import { AssessmentRecordInfo } from '../../Assessment/'
import {
  assessmentInProgressWithCaseNumber,
  assessmentCompletedWithCaseNumber,
  assessmentDeletedWithCaseNumber,
  assessmentWithNoUpdateInfoWithCaseNumber,
  assessmentInProgressWithReferralNumber,
  assessmentCompletedWithReferralNumber,
  assessmentDeletedWithReferralNumber,
  assessmentWithNoUpdateInfoWithReferralNumber,
  assessmentInProgressWithNoClientandReferralNumber,
  assessmentCompletedWithNoClientandReferralNumber,
  assessmentDeletedWithNoClientandReferralNumber,
  assessmentWithNoUpdateInfoWithNoClientandReferralNumber,
} from '../../Assessment/assessment.mocks.test'
import { navigation } from '../../../util/constants'

const getShallowWrapper = assessment =>
  shallow(
    <ClientAssessmentHistoryRecord
      assessment={assessment}
      navFrom={navigation.CHILD_PROFILE}
      inheritUrl={'/staff/0X5/clients/AznnyCs0X5/assessments/298750'}
      updateAssessmentHistoryCallback={() => {}}
      userId={'1'}
    />
  )

describe('ClientAssessmentHistoryWithCaseNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithCaseNumber)

    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithCaseNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders DELETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentDeletedWithCaseNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithCaseNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})

describe('ClientAssessmentHistoryWithReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders DELETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentDeletedWithReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})

describe('ClientAssessmentHistoryWithNoClientorReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithNoClientandReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders COMPLETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithNoClientandReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders DELETED assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentDeletedWithNoClientandReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })

  it('renders assessment with no update info (create info only)', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithNoClientandReferralNumber)
    // then
    expect(wrapper.find(AssessmentRecordInfo).exists()).toBe(true)
  })
})
