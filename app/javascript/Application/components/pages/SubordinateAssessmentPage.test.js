import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SubordinateAssessmentPage from './SubordinateAssessmentPage'
import AssessmentPage from './AssessmentPage'
import { StaffLoadingBoundary } from '../Staff'

describe('Subordinate Assessment Page', () => {
  it('loads a staff person before rendering an assessment page', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateAssessmentPage match={match} />)
    const page = wrapper.find(AssessmentPage)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(StaffLoadingBoundary)
  })

  it('sets the navigateTo to STAFF_ASSESSMENT_ADD when there is no existing id', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateAssessmentPage match={match} />)
    expect(wrapper.find(AssessmentPage).props().navigateTo).toBe(navigation.STAFF_ASSESSMENT_ADD)
  })

  it('sets the navigateTo to STAFF_ASSESSMENT_EDIT when there is an existing id', () => {
    const match = { params: { staffId: '123', clientId: '456', id: 'ABC' }, url: '/path' }
    const wrapper = shallow(<SubordinateAssessmentPage match={match} />)
    expect(wrapper.find(AssessmentPage).props().navigateTo).toBe(navigation.STAFF_ASSESSMENT_EDIT)
  })

  it('uses the staffId from the match params', () => {
    const staffId = 'zxcvbn'
    const match = { params: { staffId, clientId: 'ABC' }, url: '/my/url' }
    const wrapper = shallow(<SubordinateAssessmentPage match={match} />)

    expect(wrapper.find(StaffLoadingBoundary).props().staffId).toBe(staffId)
  })
})
