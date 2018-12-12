import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'
import { historyRecordUrlSwitcher } from '../../util/historyRecordUrlSwitcher'

class AssessmentLink extends PureComponent {
  render() {
    const { id, event_date: eventDate, person } = this.props.assessment
    const formattedEventDate = isoToLocalDate(eventDate)
    const clientId = person.identifier
    const assessmentId = id
    const linkUrl = historyRecordUrlSwitcher(this.props.navFrom, null, clientId, assessmentId)

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
