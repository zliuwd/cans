import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogPage from './ChangeLogPage'
import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import AssessmentChangeLog from './AssessmentChangeLog'

const props = {
  match: {
    path: '/clients/:clientId/assessments/:id/changelog',
    url: '/clients/AdE0PWu0X5/assessments/582529/changelog',
    isExact: true,
    params: { clientId: 'AdE0PWu0X5', id: '582529' },
  },
  client: {
    person_role: 'CLIENT',
    first_name: 'See',
    middle_name: 'K',
    last_name: 'Abbott',
    suffix: '',
    identifier: 'AdE0PWu0X5',
    external_id: '0603-9385-0313-2002051',
    dob: '2005-08-14',
  },
  pageHeaderButtonsController: {
    updateHeaderButtons: () => {},
    updateHeaderButtonsToDefault: () => {},
  },
}

describe('<ChangeLogPage />', () => {
  const render = () => shallow(<ChangeLogPage {...props} />, { disableLifecycleMethods: true })

  it('renders AssessmentChangeLog within a ChangeLogLoadingBoundary', () => {
    const wrapper = render()
    expect(
      wrapper
        .find(ChangeLogLoadingBoundary)
        .find(AssessmentChangeLog)
        .exists()
    ).toBeTruthy()
  })

  it('passes the assessment id to the ChangeLogLoadingBoundary', () => {
    const wrapper = render()
    expect(wrapper.find(ChangeLogLoadingBoundary).props().id).toBe('582529')
  })
})
