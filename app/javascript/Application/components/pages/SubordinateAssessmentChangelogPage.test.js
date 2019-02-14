import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'
import SubordinateAssessmentChangelogPage from './SubordinateAssessmentChangelogPage'
import AssessmentChangelogPage from './AssessmentChangelogPage'
import { StaffLoadingBoundary } from '../Staff'

describe('SubordinateAssessmentChangelogPage', () => {
  it('loads a staff person before rendering an AssessmentChangelogPage', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateAssessmentChangelogPage match={match} />)
    const page = wrapper.find(AssessmentChangelogPage)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(StaffLoadingBoundary)
  })

  it('sets the navigateTo to STAFF_CHANGELOG', () => {
    const match = { params: { staffId: '123', clientId: '456' }, url: '/path' }
    const wrapper = shallow(<SubordinateAssessmentChangelogPage match={match} />)
    expect(wrapper.find(AssessmentChangelogPage).props().navigateTo).toBe(navigation.STAFF_CHANGELOG)
  })

  it('uses the staffId from match params', () => {
    const staffId = 'zxcvbn'
    const match = { params: { staffId, clientId: 'ABC' }, url: '/my/url' }
    const wrapper = shallow(<SubordinateAssessmentChangelogPage match={match} />)

    expect(wrapper.find(StaffLoadingBoundary).props().staffId).toBe(staffId)
  })
})
