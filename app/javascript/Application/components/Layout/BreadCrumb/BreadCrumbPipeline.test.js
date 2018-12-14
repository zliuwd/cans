import { navigation, BreadCrumbLinks } from '../../../util/constants'
import {
  addStaffListIfNeeded,
  addAssessmentFormCrumbIfNeeded,
  addClientSearchCrumbIfNeeded,
  addStaffProfileIfNeeded,
  addStaffChildProfileCrumbIfNeeded,
  addChildYouthListCrumbIfNeeded,
  addChildProfileCrumbIfNeeded,
} from './BreadCrumbPipeline'
import { clone } from '../../../util/common'

const fakedata = {
  elements: [],
  navigateTo: navigation.ASSESSMENT_ADD,
  client: { first_name: 'name', last_name: 'client', identifier: 'AdE0PWu0X5' },
  staffPerson: { identifier: '0X5', first_name: 'name', last_name: 'staff' },
  assessmentId: '123456',
  url: '/some/url',
}

describe('BreadCrumbPipeline: the part which was not covered by Component test', () => {
  it('addStaffListIfNeeded', () => {
    const testData = clone(fakedata)
    testData.navigateTo = navigation.STAFF_LIST
    addStaffListIfNeeded(testData.elements, testData.navigateTo)
    const linkText = testData.elements[0]
    expect(linkText).toEqual(BreadCrumbLinks.STAFF_LIST)
  })

  it('addStaffProfileIfNeeded', () => {
    const testData = clone(fakedata)
    testData.navigateTo = navigation.STAFF_READ
    addStaffProfileIfNeeded(testData.elements, testData.navigateTo, testData.staffPerson)
    const linkText = testData.elements[0]
    expect(linkText).toEqual('Staff, Name')
  })

  it('addChildYouthListCrumbIfNeeded', () => {
    const testData = clone(fakedata)
    testData.navigateTo = navigation.CHILD_LIST
    addChildYouthListCrumbIfNeeded(testData.elements, testData.navigateTo)
    const linkText = testData.elements[0]
    expect(linkText).toEqual(BreadCrumbLinks.CLIENT_LIST)
  })

  describe('addChildProfileCrumbIfNeeded', () => {
    it('will add CLIENT_PROFILE plian text when nav to a page which navigateTo contains PROFILE_OVERALL', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.CHILD_PROFILE
      addChildProfileCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client)
      const linkText = testData.elements[0]
      expect(linkText).toEqual(BreadCrumbLinks.CLIENT_PROFILE)
    })

    it('will add CLIENT_PROFILE link when nav to SEARCH_ASSESSMENT_ADD', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.SEARCH_ASSESSMENT_ADD
      addChildProfileCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client)
      const linkUrl = testData.elements[0].props.to
      const linkText = testData.elements[0].props.children
      expect(linkUrl).toEqual('/search/clients/AdE0PWu0X5')
      expect(linkText).toEqual(BreadCrumbLinks.CLIENT_PROFILE)
    })
  })

  describe('addStaffChildProfileCrumbIfNeeded', () => {
    it('will add CLIENT_PROFILE link when nav to STAFF_ASSESSMENT_EDIT', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.STAFF_ASSESSMENT_EDIT
      addStaffChildProfileCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client, testData.staffPerson)
      const linkUrl = testData.elements[0].props.to
      const linkText = testData.elements[0].props.children
      expect(linkUrl).toEqual('/staff/0X5/clients/AdE0PWu0X5')
      expect(linkText).toEqual(BreadCrumbLinks.CLIENT_PROFILE)
    })

    it('will add CLIENT_PROFILE link when nav to STAFF_ASSESSMENT_ADD', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.STAFF_ASSESSMENT_ADD
      addStaffChildProfileCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client, testData.staffPerson)
      const linkUrl = testData.elements[0].props.to
      const linkText = testData.elements[0].props.children
      expect(linkUrl).toEqual('/staff/0X5/clients/AdE0PWu0X5')
      expect(linkText).toEqual(BreadCrumbLinks.CLIENT_PROFILE)
    })
  })

  describe('addAssessmentFormCrumbIfNeeded', () => {
    it('will add /Cans assessment form/ plain text when nav to ASSESSMENT_ADD', () => {
      const testData = clone(fakedata)
      addAssessmentFormCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client, testData.assessmentId)
      const linkText = testData.elements[0]

      expect(linkText).toEqual(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
    })

    it('will add /Cans assessment form/ plain text when nav to ASSESSMENT_EDIT', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.ASSESSMENT_EDIT
      addAssessmentFormCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client, testData.assessmentId)
      const linkText = testData.elements[0]

      expect(linkText).toEqual(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
    })

    it('will add /Cans assessment form/ Link when nav to ASSESSMENT_CHANGELOG', () => {
      const testData = clone(fakedata)
      testData.navigateTo = navigation.ASSESSMENT_CHANGELOG
      addAssessmentFormCrumbIfNeeded(testData.elements, testData.navigateTo, testData.client, testData.assessmentId)
      const linkUrl = testData.elements[0].props.to
      const linkText = testData.elements[0].props.children
      expect(linkUrl).toEqual('/clients/AdE0PWu0X5/assessments/123456')
      expect(linkText).toEqual(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
    })
  })

  it('addClientSearchCrumbIfNeeded', () => {
    const testData = clone(fakedata)
    testData.navigateTo = navigation.CLIENT_SEARCH
    addClientSearchCrumbIfNeeded(testData.elements, testData.navigateTo)
    const linkText = testData.elements[0]
    expect(linkText).toEqual(BreadCrumbLinks.CLIENT_SEARCH)
  })
})
