import React from 'react'
import PropTypes from 'prop-types'
import { navigation, BreadCrumbLinks, permissions } from '../../../util/constants'
import UserPermissionChecker from '../../../util/UserPermissionChecker'
import BreadCrumb from './BreadCrumb'
import { formatName, selfChecker, removeDuplicateBreadCrumb } from './BreadCrumbHelper'
import { Link } from 'react-router-dom'

const navsWithStaffProfileCrumb = [navigation.STAFF_CHILD_PROFILE]

const navsWithChildYouthListCrumb = [
  navigation.CHILD_LIST,
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.CHILD_PROFILE,
  navigation.CHILD_PROFILE_ADD,
  navigation.CHILD_PROFILE_EDIT,
  navigation.ASSESSMENT_CHANGELOG,
]
const navsWithChildProfileCrumb = [
  navigation.STAFF_CHILD_PROFILE,
  navigation.CHILD_PROFILE,
  navigation.CHILD_PROFILE_EDIT,
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.SEARCH_ASSESSMENT_EDIT,
  navigation.SEARCH_CHILD_PROFILE,
  navigation.ASSESSMENT_CHANGELOG,
]
const navWithAssessmentFromCrumb = [
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.SEARCH_ASSESSMENT_EDIT,
  navigation.ASSESSMENT_CHANGELOG,
]

const navsWithClientSearchCrumb = [
  navigation.CLIENT_SEARCH,
  navigation.SEARCH_ASSESSMENT_EDIT,
  navigation.SEARCH_CHILD_PROFILE,
]
const navsWithAssessmentChangeLogCrumb = [navigation.ASSESSMENT_CHANGELOG]

const homeCrumbHandler = (user, elements) => {
  let url
  let linkText
  if (UserPermissionChecker(user, permissions.SUBORDINATES_READ) === true) {
    url = '/staff'
    linkText = BreadCrumbLinks.STAFF_LIST
  } else if (UserPermissionChecker(user, permissions.CLIENTS_READ)) {
    url = '/clients'
    linkText = BreadCrumbLinks.CLIENT_LIST
  } else {
    url = '/search'
    linkText = BreadCrumbLinks.CLIENT_SEARCH
  }
  elements.push(<Link to={url}>{linkText}</Link>)
}

const addStaffProfileIfNeeded = (elements, navigateTo, staffPerson) => {
  if (selfChecker(navigateTo, 'STAFF_READ')) {
    elements.push(formatName(staffPerson))
  }
  if (navsWithStaffProfileCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/staff/${staffPerson.identifier}`}>{formatName(staffPerson)}</Link>)
  }
}

const addChildYouthListCrumbIfNeeded = (elements, navigateTo) => {
  if (selfChecker(navigateTo, 'CHILD_LIST')) {
    elements.push(BreadCrumbLinks.CLIENT_LIST)
  } else if (navsWithChildYouthListCrumb.includes(navigateTo)) {
    elements.push(<Link to={'/clients'}>{BreadCrumbLinks.CLIENT_LIST}</Link>)
  }
}

const addChildProfileCrumbIfNeeded = (elements, navigateTo, client) => {
  if (selfChecker(navigateTo, 'PROFILE_OVERALL')) {
    elements.push(formatName(client))
  } else if (navigateTo === navigation.SEARCH_ASSESSMENT_EDIT) {
    elements.push(<Link to={`/search/clients/${client.identifier}`}>{formatName(client)}</Link>)
  } else if (navsWithChildProfileCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/clients/${client.identifier}`}>{formatName(client)}</Link>)
  }
}

const addAssessmentFromCrumbIfNeeded = (elements, navigateTo, client, assessmentId) => {
  if (selfChecker(navigateTo, 'ASSESSMENT_EDIT')) {
    elements.push(BreadCrumbLinks.CANS_ASSESSMENT_FORM)
  } else if (navWithAssessmentFromCrumb.includes(navigateTo)) {
    elements.push(
      <Link to={`/clients/${client.identifier}/assessments/${assessmentId}`}>
        {BreadCrumbLinks.CANS_ASSESSMENT_FORM}
      </Link>
    )
  }
}

const addClientSearchCrumbIfNeeded = (elements, navigateTo) => {
  if (selfChecker(navigateTo, 'CLIENT_SEARCH')) {
    elements.push(BreadCrumbLinks.CLIENT_SEARCH)
  } else if (navsWithClientSearchCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/search`}>{BreadCrumbLinks.CLIENT_SEARCH}</Link>)
  }
}

const addChangeLogCrumbIfNeeded = (elements, navigateTo, url) => {
  if (navigateTo === navigation.ASSESSMENT_CHANGELOG) {
    elements.push(<Link to={'#'}>CHANGE LOG</Link>)
  } else if (navsWithAssessmentChangeLogCrumb.includes(navigateTo)) {
    elements.push(<Link to={`${url}/changelog`}>CHANGE LOG</Link>)
  }
}

class BreadCrumbsBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  prepareNavigationElements() {
    const elements = []
    const { navigateTo, client, url, assessmentId, user, subordinate } = this.props
    homeCrumbHandler(user, elements)
    console.log(subordinate)
    if (subordinate) {
      addStaffProfileIfNeeded(elements, navigateTo, this.props.subordinate.staff_person)
    }

    addClientSearchCrumbIfNeeded(elements, navigateTo)
    addChildYouthListCrumbIfNeeded(elements, navigateTo)
    if (client) {
      addChildProfileCrumbIfNeeded(elements, navigateTo, client)
      addAssessmentFromCrumbIfNeeded(elements, navigateTo, client, assessmentId)
      addChangeLogCrumbIfNeeded(elements, navigateTo, url)
    }
    return removeDuplicateBreadCrumb(elements)
    // return elements
  }

  render() {
    const navigationElements = this.prepareNavigationElements()
    return <BreadCrumb navigationElements={navigationElements} />
  }
}

BreadCrumbsBuilder.propTypes = {
  assessmentId: PropTypes.string,
  client: PropTypes.object,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  subordinate: PropTypes.object,
  url: PropTypes.string,
  user: PropTypes.object.isRequired,
}

BreadCrumbsBuilder.defaultProps = {
  assessmentId: '',
  client: null,
  subordinate: null,
  url: '',
}

export default BreadCrumbsBuilder
