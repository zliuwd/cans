import React from 'react'
import PropTypes from 'prop-types'
import { navigation, BreadCrumbLinks } from '../../../util/constants'
import BreadCrumb from './BreadCrumb'
import { formatName } from './BreadCrumbHelper'
import { Link } from 'react-router-dom'

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
  navigation.CHILD_PROFILE,
  navigation.CHILD_PROFILE_EDIT,
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.SEARCH_ASSESSMENT_EDIT,
  navigation.ASSESSMENT_CHANGELOG,
]
const navWithAssessmentFromCrumb = [
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.SEARCH_ASSESSMENT_EDIT,
  navigation.ASSESSMENT_CHANGELOG,
]

const navsWithClientSearchCrumb = [navigation.CLIENT_SEARCH, navigation.SEARCH_ASSESSMENT_EDIT]
const navsWithAssessmentChangeLogCrumb = [navigation.ASSESSMENT_CHANGELOG]

const addChildYouthListCrumbIfNeeded = (elements, navigateTo) => {
  if (navsWithChildYouthListCrumb.includes(navigateTo)) {
    elements.push(<Link to={'/clients'}>{BreadCrumbLinks.CLIENT_LIST}</Link>)
  }
}

const addChildProfileCrumbIfNeeded = (elements, navigateTo, client) => {
  if (navsWithChildProfileCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/clients/${client.identifier}`}>{formatName(client)}</Link>)
  }
}

const addAssessmentFromCrumbIfNeeded = (elements, navigateTo, client, assessmentId) => {
  if (navigateTo === navigation.ASSESSMENT_EDIT || navigation.SEARCH_ASSESSMENT_EDIT) {
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
  if (navsWithClientSearchCrumb.includes(navigateTo)) {
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
    const { navigateTo, client, url, assessmentId } = this.props
    addClientSearchCrumbIfNeeded(elements, navigateTo)
    addChildYouthListCrumbIfNeeded(elements, navigateTo)
    if (client) {
      addChildProfileCrumbIfNeeded(elements, navigateTo, client)
      addAssessmentFromCrumbIfNeeded(elements, navigateTo, client, assessmentId)
      addChangeLogCrumbIfNeeded(elements, navigateTo, url)
    }

    return elements
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
  url: PropTypes.string,
}

BreadCrumbsBuilder.defaultProps = {
  assessmentId: '',
  client: null,
  url: '',
}

export default BreadCrumbsBuilder
