import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'
import { navigation } from '../../util/constants'

class AssessmentLink extends PureComponent {
  render() {
    const { id, event_date: eventDate, person } = this.props.assessment
    const formattedEventDate = isoToLocalDate(eventDate)
    let linkUrl
    switch (this.props.navFrom) {
      case navigation.CLIENT_SEARCH:
        linkUrl = `search/clients/${person.identifier}/assessments/${id}`
        break
      default:
        linkUrl = `/clients/${person.id}/assessments/${id}`
    }

    return (
      <Link to={linkUrl} className={'underlined'}>
        {`${formattedEventDate} CANS`}
      </Link>
    )
  }
}

AssessmentLink.propTypes = {
  assessment: PropTypes.object.isRequired,
  navFrom: PropTypes.string.isRequired,
}

export default AssessmentLink
