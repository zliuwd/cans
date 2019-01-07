import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import AssessmentLink from './AssessmentLink'
import { assessmentInProgress, assessmentCompleted, assessmentDeleted } from '../Assessment/assessment.mocks.test'
import { isoToLocalDate } from '../../util/dateHelper'
import { navigation } from '../../util/constants'

describe('AssessmentLink', () => {
  const prepareWrapper = (assessment, navFrom) => {
    return shallow(
      <AssessmentLink assessment={assessment} linkText={'CANS'} navFrom={navFrom} userId={'1'} key={assessment.id} />
    )
  }

  describe('assessment in progress', () => {
    it('renders a Link component', () => {
      const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')
      expect(wrapper.type()).toEqual(Link)
    })

    it('renders one Link component', () => {
      const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')
      expect(wrapper.length).toEqual(1)
    })

    it('the "to" property includes the person identifier and the assessment id', () => {
      const { id, person } = assessmentInProgress
      const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')
      expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
    })

    it('render a URL start with search when user is from search', () => {
      const { id, person } = assessmentInProgress
      const wrapper = prepareWrapper(assessmentInProgress, navigation.CLIENT_SEARCH)
      expect(wrapper.props().to).toEqual(`search/clients/${person.identifier}/assessments/${id}`)
    })

    it('render a URL start with clients when user is from other locations', () => {
      const { id, person } = assessmentInProgress
      const wrapper = prepareWrapper(assessmentInProgress, 'someWhere')
      expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
    })

    it('the Link text is the formatted date + " CANS "', () => {
      const { event_date: eventDate } = assessmentInProgress
      const formattedDate = isoToLocalDate(eventDate)
      const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')
      const linkText = wrapper.props().children
      expect(linkText).toEqual(`${formattedDate} CANS`)
    })
  })

  describe('assessment completed', () => {
    it('renders a Link component', () => {
      const wrapper = prepareWrapper(assessmentCompleted, 'CHILD_LIST')
      expect(wrapper.type()).toEqual(Link)
    })

    it('renders one Link component', () => {
      const wrapper = prepareWrapper(assessmentCompleted, 'CHILD_LIST')
      expect(wrapper.length).toEqual(1)
    })

    it('the "to" property includes the person identifier and the assessment id', () => {
      const { id, person } = assessmentCompleted
      const wrapper = prepareWrapper(assessmentCompleted, 'CHILD_LIST')
      expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
    })

    it('render a URL start with search when user is from search', () => {
      const { id, person } = assessmentCompleted
      const wrapper = prepareWrapper(assessmentCompleted, navigation.CLIENT_SEARCH)
      expect(wrapper.props().to).toEqual(`search/clients/${person.identifier}/assessments/${id}`)
    })

    it('render a URL start with clients when user is from other locations', () => {
      const { id, person } = assessmentCompleted
      const wrapper = prepareWrapper(assessmentCompleted, 'someWhere')
      expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
    })

    it('the Link text is the formatted date + " CANS "', () => {
      const { event_date: eventDate } = assessmentCompleted
      const formattedDate = isoToLocalDate(eventDate)
      const wrapper = prepareWrapper(assessmentCompleted, 'CHILD_LIST')
      const linkText = wrapper.props().children
      expect(linkText).toEqual(`${formattedDate} CANS`)
    })
  })

  describe('assessment deleted', () => {
    it('does not render a Link component', () => {
      const wrapper = prepareWrapper(assessmentDeleted, 'CHILD_LIST')
      expect(wrapper.find(Link).exists()).toBe(false)
    })

    it('the Link text is the formatted date + " CANS "', () => {
      const { event_date: eventDate } = assessmentDeleted
      const formattedDate = isoToLocalDate(eventDate)
      const wrapper = prepareWrapper(assessmentDeleted, 'CHILD_LIST')
      const linkText = wrapper.text()
      expect(linkText).toEqual(`${formattedDate} CANS`)
    })
  })
})
