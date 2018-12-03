import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'

jest.mock('../Assessment/Assessment.service')
const getShallowWrapper = assessment => shallow(<ClientAssessmentHistoryRecord assessment={assessment} />)

// Client with Case Number
const assessmentInProgressWithCaseNumber = {
  id: 97501,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',

  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentCompletedWithCaseNumber = {
  id: 97502,
  person: { id: 1 },
  status: 'COMPLETED',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentWithNoUpdateInfoWithCaseNumber = {
  id: 97503,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'CASE',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}

describe('ClientAssessmentHistoryWithCaseNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithCaseNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('10/10/2015 CANS')
    const assessmentInfo = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(assessmentInfo).toEqual([
      'Saved on 06/06/2015 by Name 1 LastName 1',
      'Case Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithCaseNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('01/05/2018 CANS')
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual([
      'Completed on 06/06/2018 by Name 2 LastName 2',
      'Case Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithCaseNumber)

    // then
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual([
      'Saved on 06/06/2018 by Name 3 LastName 3',
      'Case Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })
})

// Client with Referral Number
const assessmentInProgressWithReferralNumber = {
  id: 97501,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',

  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentCompletedWithReferralNumber = {
  id: 97502,
  person: { id: 1 },
  status: 'COMPLETED',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentWithNoUpdateInfoWithReferralNumber = {
  id: 97503,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '4444-333-4444-88888888',
  service_source: 'REFERRAL',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}

describe('ClientAssessmentHistoryWithReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithReferralNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('10/10/2015 CANS')
    const assessmentInfo = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(assessmentInfo).toEqual([
      'Saved on 06/06/2015 by Name 1 LastName 1',
      'Referral Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithReferralNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('01/05/2018 CANS')
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual([
      'Completed on 06/06/2018 by Name 2 LastName 2',
      'Referral Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithReferralNumber)

    // then
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual([
      'Saved on 06/06/2018 by Name 3 LastName 3',
      'Referral Number: 4444-333-4444-88888888',
      'County: Alameda',
    ])
  })
})

// Client with No Client and Referral Number
const assessmentInProgressWithNoClientandReferralNumber = {
  id: 97501,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '',
  service_source: '',

  event_date: '2015-10-10',
  updated_timestamp: '2015-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 1',
    last_name: 'LastName 1',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentCompletedWithNoClientandReferralNumber = {
  id: 97502,
  person: { id: 1 },
  status: 'COMPLETED',
  service_source_ui_id: '',
  service_source: '',
  event_date: '2018-01-05',
  updated_timestamp: '2018-06-06T15:37:32.000Z',
  updated_by: {
    first_name: 'Name 2',
    last_name: 'LastName 2',
  },
  county: {
    name: 'Alameda',
  },
}

const assessmentWithNoUpdateInfoWithNoClientandReferralNumber = {
  id: 97503,
  person: { id: 1 },
  status: 'IN_PROGRESS',
  service_source_ui_id: '',
  service_source: '',
  event_date: '2018-01-05',
  created_timestamp: '2018-06-06T15:37:32.000Z',
  created_by: {
    first_name: 'Name 3',
    last_name: 'LastName 3',
  },
  county: {
    name: 'Alameda',
  },
}

describe('ClientAssessmentHistoryWithNoClientorReferralNumber', () => {
  it('renders IN_PROGRESS assessment with all fields', () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentInProgressWithNoClientandReferralNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('10/10/2015 CANS')
    const assessmentInfo = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(assessmentInfo).toEqual([
      'Saved on 06/06/2015 by Name 1 LastName 1',
      'Case/Referral Number: ',
      'County: Alameda',
    ])
  })

  it('renders COMPLETED assessment with all fields', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentCompletedWithNoClientandReferralNumber)

    // then
    expect(
      wrapper
        .find(Link)
        .children()
        .text()
    ).toEqual('01/05/2018 CANS')
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual([
      'Completed on 06/06/2018 by Name 2 LastName 2',
      'Case/Referral Number: ',
      'County: Alameda',
    ])
  })

  it('renders assessment with no update info (create info only)', async () => {
    // given + when
    const wrapper = getShallowWrapper(assessmentWithNoUpdateInfoWithNoClientandReferralNumber)

    // then
    const timestamp = wrapper
      .find('.history-item-info')
      .get(0)
      .props.children.filter(el => el.type !== 'br')
    expect(timestamp).toEqual(['Saved on 06/06/2018 by Name 3 LastName 3', 'Case/Referral Number: ', 'County: Alameda'])
  })
})
