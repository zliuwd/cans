import React from 'react'
import BreadCrumb from './BreadCrumb'
import { mount } from 'enzyme'
import BreadCrumbsBuilder from './BreadCrumbsBuilder'
import { BrowserRouter } from 'react-router-dom'
import { clone } from '../../../util/common'

const supervisorMainFlow = {
  assessmentId: '2640037',
  client: { first_name: 'name', last_name: 'client', identifier: 'AdE0PWu0X5' },
  subordinate: { staff_person: { identifier: '0X5', first_name: 'name', last_name: 'staff' } },
  url: 'some/url/',
  user: {
    first_name: 'Anna',
    last_name: 'Smith',
    county_name: 'Ventura',
    staff_id: '0X5',
    privileges: 'CANS-staff-person-subordinates-read',
  },
}

const wrapper = (props, navigateTo) =>
  mount(
    <BrowserRouter>
      <BreadCrumbsBuilder {...props} navigateTo={navigateTo} />
    </BrowserRouter>
  )

const textOfBreadCrumb = component =>
  component
    .find(BreadCrumb)
    .props()
    .navigationElements.map(ele => {
      if (ele.props) {
        return ele.props.children
      }
      return ele
    })

describe('<BreadCrumbsBuilder />', () => {
  describe('supervisor', () => {
    it('will render the correct BreadCrumbs for supervisor Main Flow', () => {
      const component = wrapper(supervisorMainFlow, 'STAFF_ASSESSMENT_EDIT')
      expect(textOfBreadCrumb(component)).toEqual(['Staff List', 'Staff, Name', 'Client, Name', 'CANS Assessment Form'])
    })

    it('will render the BreadCrumbs for supervisor Search Flow', () => {
      const component = wrapper(supervisorMainFlow, 'SEARCH_ASSESSMENT_EDIT')
      expect(textOfBreadCrumb(component)).toEqual([
        'Staff List',
        'Client Search',
        'Client, Name',
        'CANS Assessment Form',
      ])
    })
  })

  describe('caseWorker', () => {
    const clientFlow = clone(supervisorMainFlow)
    clientFlow.subordinate = {}
    clientFlow.user.privileges = 'CANS-staff-person-clients-read'
    it('will render the correct BreadCrumbs for caseWorker Main Flow', () => {
      const component = wrapper(clientFlow, 'ASSESSMENT_EDIT')
      expect(textOfBreadCrumb(component)).toEqual(['Client List', 'Client, Name', 'CANS Assessment Form'])
    })

    it('will render the correct BreadCrumbs for caseWorker Search Flow', () => {
      const component = wrapper(clientFlow, 'SEARCH_ASSESSMENT_EDIT')
      expect(textOfBreadCrumb(component)).toEqual([
        'Client List',
        'Client Search',
        'Client, Name',
        'CANS Assessment Form',
      ])
    })
  })

  describe('none case worker', () => {
    const searchFlow = clone(supervisorMainFlow)
    searchFlow.subordinate = {}
    searchFlow.user.privileges = 'other-permissions'

    it('will render Search Flow', () => {
      const component = wrapper(searchFlow, 'SEARCH_ASSESSMENT_EDIT')
      expect(textOfBreadCrumb(component)).toEqual(['Client Search', 'Client, Name', 'CANS Assessment Form'])
    })
  })
})
