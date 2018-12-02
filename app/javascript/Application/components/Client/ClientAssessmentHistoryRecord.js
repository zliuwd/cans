import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import Typography from '@material-ui/core/Typography'
import { isoToLocalDate } from '../../util/dateHelper'
import { StatusIcon } from '../common/StatusIcon'

import './style.sass'

const getActionVerbByStatus = status => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'Saved'
    case 'COMPLETED':
      return 'Completed'
    default:
      return 'Updated'
  }
}

class ClientAssessmentHistoryRecord extends Component {
  renderAssessmentInfo = () => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      the_case: theCase,
      status,
      county,
    } = this.props.assessment
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseNumber = (theCase || {}).external_id || ''
    return (
      <Typography variant={'title'} className={'history-item-info'}>
        {`${actionVerb} on ${formattedTimestamp} by ${updatedByName}`}
        <br />
        {`Case: ${caseNumber}`}
        <br />
        {`County: ${county ? county.name : ''}`}
      </Typography>
    )
  }

  render() {
    const { id, event_date: eventDate, status, person } = this.props.assessment
    const comeFrom = this.props.comeFrom
    let url
    switch (comeFrom) {
      case 'STAFF':
        url = `/staff/${this.props.userId}/clients/${person.identifier}/assessments/${id}`
        break
      default:
        url = `/clients/${person.identifier}/assessments/${id}`
    }

    const formattedEventDate = isoToLocalDate(eventDate)
    return (
      <Container className={'history-item'}>
        <Row>
          <Col xs="12">
            <div className="float-left">
              <StatusIcon status={status} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Row>
              <Col xs="12">
                <Link to={url} className={'underlined'}>
                  {`${formattedEventDate} CANS`}
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs="12">{this.renderAssessmentInfo()}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  comeFrom: PropTypes.string,
  userId: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  comeFrom: null,
  userId: null,
}

export default ClientAssessmentHistoryRecord
