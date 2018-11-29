import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../../util/constants'
import BreadCrumb from './BreadCrumb'
import { formatClientName } from '../../Client/Client.helper'
import { Link } from 'react-router-dom'

const navsWithChildYouthListCrumb = [
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.CHILD_PROFILE,
  navigation.CHILD_PROFILE_ADD,
  navigation.CHILD_PROFILE_EDIT,
]
const navsWithChildProfileCrumb = [
  navigation.CHILD_PROFILE_EDIT,
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.ASSESSMENT_CHANGELOG,
]
const navsWithClientSearchCrumb = [navigation.CLIENT_SEARCH]
const navsWithAssessmentChangeLogCrumb = [navigation.ASSESSMENT_CHANGELOG]

const addChildYouthListCrumbIfNeeded = (elements, navigateTo) => {
  if (navsWithChildYouthListCrumb.includes(navigateTo)) {
    elements.push(<Link to={'/clients'}>COUNTY CLIENT LIST</Link>)
  }
}

const addChildProfileCrumbIfNeeded = (elements, navigateTo, client) => {
  if (navsWithChildProfileCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/clients/${client.identifier}`}>{formatClientName(client).toUpperCase()}</Link>)
  }
}

const addClientSearchCrumbIfNeeded = (elements, navigateTo) => {
  if (navsWithClientSearchCrumb.includes(navigateTo)) {
    elements.push(<Link to={`/search`}>CLIENT SEARCH</Link>)
  }
}

const addChangeLogCrumbIfNeeded = (elements, navigateTo, url) => {
  if (navsWithAssessmentChangeLogCrumb.includes(navigateTo)) {
    elements.push(<Link to={url}>CANS CHANGE LOG</Link>)
  }
}

class BreadCrumbsBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  prepareNavigationElements() {
    const elements = []
    const { navigateTo, client, url } = this.props
    addChildYouthListCrumbIfNeeded(elements, navigateTo)
    if (client) {
      addChildProfileCrumbIfNeeded(elements, navigateTo, client)
      addChangeLogCrumbIfNeeded(elements, navigateTo, url)
    }
    addClientSearchCrumbIfNeeded(elements, navigateTo)

    return elements
  }

  render() {
    const navigationElements = this.prepareNavigationElements()
    return <BreadCrumb navigationElements={navigationElements} />
  }
}

BreadCrumbsBuilder.propTypes = {
  client: PropTypes.object,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  url: PropTypes.string,
}

BreadCrumbsBuilder.defaultProps = {
  client: null,
  url: '',
}

export default BreadCrumbsBuilder
