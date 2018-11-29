import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'

class AssessmentLink extends PureComponent {
  render() {
    const { id, event_date: eventDate, person } = this.props.assessment
    console.log(person)
    const formattedEventDate = isoToLocalDate(eventDate)
    const linkUrl = this.props.location
      ? `${this.props.location}/clients/${person.identifier}/assessments/${id}`
      : `/clients/${person.id}/assessments/${id}`

    return (
      <Link to={linkUrl} className={'underlined'}>
        {`${formattedEventDate} CANS`}
      </Link>
    )
  }
}

AssessmentLink.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default AssessmentLink
