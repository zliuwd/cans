import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'
import { historyRecordUrlSwitcher } from '../../util/historyRecordUrlSwitcher'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'

class AssessmentLink extends PureComponent {
  shouldRenderLink(status) {
    return status !== AssessmentStatus.deleted
  }

  renderLink(url, formattedDate, linkText) {
    return (
      <Link to={url} className={'underlined'}>
        {this.renderLinkText(formattedDate, linkText)}
      </Link>
    )
  }

  renderLinkText(formattedDate, linkText) {
    return `${formattedDate}${linkText === '' ? '' : ` ${linkText}`}`
  }

  render() {
    const { linkText } = this.props
    const { id: assessmentId, event_date: eventDate, person, status } = this.props.assessment
    const formattedDate = isoToLocalDate(eventDate)
    const clientId = person.identifier
    const linkUrl = historyRecordUrlSwitcher(this.props.navFrom, this.props.userId, clientId, assessmentId)

    return this.shouldRenderLink(status)
      ? this.renderLink(linkUrl, formattedDate, linkText)
      : this.renderLinkText(formattedDate, linkText)
  }
}

AssessmentLink.propTypes = {
  assessment: PropTypes.object.isRequired,
  linkText: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  userId: PropTypes.string,
}
AssessmentLink.defaultProps = {
  userId: null,
}
export default AssessmentLink
