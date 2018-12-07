import React from 'react'
import { shallow } from 'enzyme'
import { Card } from '@cwds/components'
import AssessmentRecordInfo from './AssessmentRecordInfo'
import { assessmentInProgress, assessmentWithNoUpdateInfo } from '../Assessment/assessment.mocks.test'
import { getActionVerbByStatus } from '../Assessment/AssessmentHelper'
import { isoToLocalDate } from '../../util/dateHelper'
import AssessmentLink from '../common/AssessmentLink'

const prepareWrapper = assessment => shallow(<AssessmentRecordInfo assessment={assessment} />)

describe('AssessmentRecordInfo', () => {
  it('renders a Card component with assessment info', () => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      the_case: theCase,
      status,
      county,
      person,
    } = assessmentInProgress

    const wrapper = prepareWrapper(assessmentInProgress)
    const assessmentInfo = wrapper
      .find('div')
      .children()
      .map(child => child.props().children)

    const clientName = `${person.first_name} ${person.middle_name} ${person.last_name} ${
      person.suffix === '' ? '' : `, ${person.suffix}`
    }`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseNumber = (theCase || {}).external_id || ''

    expect(wrapper.length).toEqual(1)
    expect(wrapper.type()).toEqual(Card)
    expect(assessmentInfo).toEqual([
      `Client name: ${clientName}`,
      <AssessmentLink assessment={assessmentInProgress} key={createdTimestamp} />,
      `${actionVerb} on ${formattedTimestamp} by`,
      `${updatedByName}`,
      `Case: ${caseNumber}`,
      `County: ${county.name}`,
    ])
  })

  it('renders a Card component with no updated_by info (create info only)', () => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      the_case: theCase,
      status,
      county,
      person,
    } = assessmentWithNoUpdateInfo

    const wrapper = prepareWrapper(assessmentWithNoUpdateInfo)
    const assessmentInfo = wrapper
      .find('div')
      .children()
      .map(child => child.props().children)

    const clientName = `${person.first_name} ${person.middle_name} ${person.last_name} ${
      person.suffix === '' ? '' : `, ${person.suffix}`
    }`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseNumber = (theCase || {}).external_id || ''

    expect(wrapper.length).toEqual(1)
    expect(wrapper.type()).toEqual(Card)
    expect(assessmentInfo).toEqual([
      `Client name: ${clientName}`,
      <AssessmentLink assessment={assessmentWithNoUpdateInfo} key={updatedTimestamp} />,
      `${actionVerb} on ${formattedTimestamp} by`,
      `${updatedByName}`,
      `Case: ${caseNumber}`,
      `County: ${county.name}`,
    ])
  })

  it('renders when there is no county', () => {
    const { county, ...noCountyAssessment } = assessmentWithNoUpdateInfo
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      the_case: theCase,
      status,
      person,
    } = noCountyAssessment

    const wrapper = prepareWrapper(noCountyAssessment)
    const assessmentInfo = wrapper
      .find('div')
      .children()
      .map(child => child.props().children)

    const clientName = `${person.first_name} ${person.middle_name} ${person.last_name} ${
      person.suffix === '' ? '' : `, ${person.suffix}`
    }`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseNumber = (theCase || {}).external_id || ''

    expect(wrapper.length).toEqual(1)
    expect(wrapper.type()).toEqual(Card)
    expect(assessmentInfo).toEqual([
      `Client name: ${clientName}`,
      <AssessmentLink assessment={noCountyAssessment} key={updatedTimestamp} />,
      `${actionVerb} on ${formattedTimestamp} by`,
      `${updatedByName}`,
      `Case: ${caseNumber}`,
      'County: ',
    ])
  })
})
