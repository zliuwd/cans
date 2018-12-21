import React from 'react'
import PropTypes from 'prop-types'
import { navigation } from '../../../util/constants'
import * as Pipeline from './BreadCrumbPipeline'
import BreadCrumb from './BreadCrumb'
import { removeDuplicateBreadCrumb } from './BreadCrumbHelper'

class BreadCrumbsBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  prepareNavigationElements() {
    const elements = []
    const { navigateTo, client, url, assessmentId, user, subordinate } = this.props
    Pipeline.homeCrumbHandler(user, elements)
    Pipeline.addStaffListIfNeeded(elements, navigateTo)
    if (subordinate) {
      Pipeline.addStaffProfileIfNeeded(elements, navigateTo, this.props.subordinate.staff_person)
    }

    Pipeline.addClientSearchCrumbIfNeeded(elements, navigateTo)
    Pipeline.addChildYouthListCrumbIfNeeded(elements, navigateTo)

    if (subordinate) {
      Pipeline.addStaffChildProfileCrumbIfNeeded(elements, navigateTo, client, this.props.subordinate.staff_person)
    }
    if (client) {
      Pipeline.addChildProfileCrumbIfNeeded(elements, navigateTo, client)
      Pipeline.addAssessmentFormCrumbIfNeeded(elements, navigateTo, client, assessmentId)
    }

    if (subordinate) {
      Pipeline.addStaffAssessmentFormCrumbIfNeeded(
        elements,
        navigateTo,
        client,
        this.props.subordinate.staff_person,
        assessmentId
      )
    }

    Pipeline.addChangeLogCrumbIfNeeded(elements, navigateTo, url)
    return removeDuplicateBreadCrumb(elements)
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
