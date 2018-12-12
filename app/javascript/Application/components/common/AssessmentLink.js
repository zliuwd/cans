import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'

class AssessmentLink extends PureComponent {
  render() {
    const { linkText } = this.props
    const { id, event_date: eventDate, person } = this.props.assessment
    const formattedEventDate = isoToLocalDate(eventDate)

    return (
      <Link to={`/clients/${person.identifier}/assessments/${id}`} className={'underlined'}>
        {`${formattedEventDate}${linkText}`}
      </Link>
    )
  }
}

AssessmentLink.propTypes = {
  assessment: PropTypes.object.isRequired,
  linkText: PropTypes.string.isRequired,
}

export default AssessmentLink
