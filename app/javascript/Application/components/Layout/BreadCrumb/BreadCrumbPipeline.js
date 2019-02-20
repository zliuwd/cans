import React from 'react'
import { navigation, BreadCrumbLinks, dashboards } from '../../../util/constants'
import { userDashboardChecker } from '../../../util/userDashboardChecker'
import { formatName, selfChecker, crumbsGroup, selfCheckerKeyWords } from './BreadCrumbHelper'
import { Link } from 'react-router-dom'
import { AssessmentStatus } from '../../Assessment/'

export const breadCrumbOnClickHandler = {
  onClick: event => {},
}

const onClick = event => {
  breadCrumbOnClickHandler.onClick(event)
}

const link = (href, text) => {
  return (
    <Link to={href} onClick={onClick}>
      {text}
    </Link>
  )
}

export const homeCrumbHandler = (user, elements) => {
  let url
  let linkText
  switch (userDashboardChecker(user)) {
    case dashboards.STAFF_LIST:
      url = '/staff'
      linkText = BreadCrumbLinks.STAFF_LIST
      break
    case dashboards.CHILD_LIST:
      url = '/clients'
      linkText = BreadCrumbLinks.CLIENT_LIST
      break
    default:
      url = '/search'
      linkText = BreadCrumbLinks.CLIENT_SEARCH
      break
  }
  elements.push(link(url, linkText))
}

export const addStaffListIfNeeded = (elements, navigateTo) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.STAFF_LIST)) {
    elements.push(BreadCrumbLinks.STAFF_LIST)
  }
}

export const addStaffProfileIfNeeded = (elements, navigateTo, staffPerson) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.STAFF_READ)) {
    elements.push(formatName(staffPerson))
  }
  if (crumbsGroup.staffProfile.includes(navigateTo)) {
    elements.push(link(`/staff/${staffPerson.identifier}`, formatName(staffPerson)))
  }
}

export const addChildYouthListCrumbIfNeeded = (elements, navigateTo) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.CHILD_LIST)) {
    elements.push(BreadCrumbLinks.CLIENT_LIST)
  } else if (crumbsGroup.clientList.includes(navigateTo)) {
    elements.push(link('/clients', BreadCrumbLinks.CLIENT_LIST))
  }
}

export const addStaffChildProfileCrumbIfNeeded = (elements, navigateTo, client, staffPerson) => {
  if (crumbsGroup.staffChildProfile.includes(navigateTo)) {
    elements.push(link(`/staff/${staffPerson.identifier}/clients/${client.identifier}`, formatName(client)))
  }
}

export const addChildProfileCrumbIfNeeded = (elements, navigateTo, client) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.PROFILE_OVERALL)) {
    elements.push(formatName(client))
  } else if (crumbsGroup.searchChildProfile.includes(navigateTo)) {
    elements.push(link(`/search/clients/${client.identifier}`, formatName(client)))
  } else if (crumbsGroup.clientProfile.includes(navigateTo)) {
    elements.push(link(`/clients/${client.identifier}`, formatName(client)))
  }
} // search and client dashboard could share this logic becasue they just need 3 parameters

export const addStaffAssessmentFormCrumbIfNeeded = (
  elements,
  navigateTo,
  client,
  staffPerson,
  assessmentId,
  status
) => {
  if (status === AssessmentStatus.deleted) {
  } else if (navigateTo === navigation.STAFF_CHANGELOG) {
    elements.push(
      link(
        `/staff/${staffPerson.identifier}/clients/${client.identifier}/assessments/${assessmentId}`,
        BreadCrumbLinks.CANS_ASSESSMENT_FORM
      )
    )
  }
} // only when staff nav to changlog then show the link type asform

export const addAssessmentFormCrumbIfNeeded = (elements, navigateTo, client, assessmentId, status) => {
  if (status === AssessmentStatus.deleted) {
  } else if (selfChecker(navigateTo, selfCheckerKeyWords.ASSESSMENT_EDIT)) {
    elements.push(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
  } else if (selfChecker(navigateTo, selfCheckerKeyWords.ASSESSMENT_ADD)) {
    elements.push(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
  } else if (navigateTo === navigation.SEARCH_CHANGELOG) {
    elements.push(
      link(`/search/clients/${client.identifier}/assessments/${assessmentId}`, BreadCrumbLinks.CANS_ASSESSMENT_FORM)
    )
  } else if (crumbsGroup.assessmentForm.includes(navigateTo)) {
    elements.push(
      link(`/clients/${client.identifier}/assessments/${assessmentId}`, BreadCrumbLinks.CANS_ASSESSMENT_FORM)
    )
  }
}

export const addClientSearchCrumbIfNeeded = (elements, navigateTo) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.CLIENT_SEARCH)) {
    elements.push(BreadCrumbLinks.CLIENT_SEARCH)
  } else if (crumbsGroup.search.includes(navigateTo)) {
    elements.push(link(`/search`, BreadCrumbLinks.CLIENT_SEARCH))
  }
}

export const addChangeLogCrumbIfNeeded = (elements, navigateTo, url) => {
  if (selfChecker(navigateTo, selfCheckerKeyWords.CHANGELOG)) {
    elements.push('Change Log')
  }
}
