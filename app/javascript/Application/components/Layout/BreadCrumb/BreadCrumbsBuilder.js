import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../../util/constants'
import * as Pipeline from './BreadCrumbPipeline'
import BreadCrumb from './BreadCrumb'
import { removeDuplicateBreadCrumb, selfCheckerKeyWords } from './BreadCrumbHelper'

class BreadCrumbsBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getAssessmentStatusWhenNavToChangeLog = url => {
    const changelogIndex = -2
    const urlArray = url.split('/')
    const [page, status] = urlArray.slice(changelogIndex)
    return page === selfCheckerKeyWords.CHANGELOG.toLowerCase() ? status : null
  }

  prepareNavigationElements() {
    const elements = []
    const { navigateTo, client, url, assessmentId, user, subordinate } = this.props
    const status = this.getAssessmentStatusWhenNavToChangeLog(url)
    Pipeline.homeCrumbHandler(user, elements)
    Pipeline.addStaffListIfNeeded(elements, navigateTo)
    if (subordinate) {
      Pipeline.addStaffProfileIfNeeded(elements, navigateTo, this.props.subordinate.staff_person)
    }

    Pipeline.addClientSearchCrumbIfNeeded(elements, navigateTo)
    Pipeline.addChildYouthListCrumbIfNeeded(elements, navigateTo)

    if (subordinate && client) {
      Pipeline.addStaffChildProfileCrumbIfNeeded(elements, navigateTo, client, this.props.subordinate.staff_person)
    }
    if (client) {
      Pipeline.addChildProfileCrumbIfNeeded(elements, navigateTo, client)
      Pipeline.addAssessmentFormCrumbIfNeeded(elements, navigateTo, client, assessmentId, status)
    }

    if (subordinate) {
      Pipeline.addStaffAssessmentFormCrumbIfNeeded(
        elements,
        navigateTo,
        client,
        this.props.subordinate.staff_person,
        assessmentId,
        status
      )
    }

    Pipeline.addChangeLogCrumbIfNeeded(elements, navigateTo, url)
    return removeDuplicateBreadCrumb(elements)
  }

  render() {
    if (!this.props.user) {
      return null
    }
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
  user: PropTypes.object,
}

BreadCrumbsBuilder.defaultProps = {
  assessmentId: '',
  client: null,
  subordinate: null,
  url: '',
  user: null,
}

export default BreadCrumbsBuilder
