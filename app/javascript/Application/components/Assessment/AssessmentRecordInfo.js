import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from '@cwds/components'
import { isoToLocalDate } from '../../util/dateHelper'
import { getActionVerbByStatus } from './AssessmentHelper'
import AssessmentLink from './AssessmentLink'
import AssessmentRecordStatus from './AssessmentRecordStatus'
import { clientCaseReferralNumber } from '../Client/Client.helper'
import AssessmentActionsEllipsis from './AssessmentActionsEllipsis'

class AssessmentRecordInfo extends Component {
  renderAssessmentInfo = (header, assessment) => {
    const { status, person, id, metadata } = assessment
    const {
      clientName,
      actionVerb,
      formattedTimestamp,
      updatedByName,
      countyName,
      caseReferralNumber,
      serviceSourceUiId,
    } = this.processAssessmentInfo(assessment)
    const statusHeader = <AssessmentRecordStatus status={status} />
    const clientNameHeader = <div className="assessment-record-client-name">{`${clientName}`}</div>
    const recordHeader = header === 'assessment-status' ? statusHeader : clientNameHeader
    const { updateAssessmentHistoryCallback, inheritUrl } = this.props

    return (
      <Card className="card-assessment-record-info">
        <CardBody className="card-assessment-record-body">
          <AssessmentActionsEllipsis
            inheritUrl={inheritUrl}
            clientId={person.identifier}
            assessmentId={id}
            assessmentMetaData={metadata}
            date={formattedTimestamp}
            assessmentStatus={status}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
          />
          <div className={'assessment-info'}>
            {recordHeader}
            <p>
              <AssessmentLink
                assessment={assessment}
                navFrom={this.props.navFrom}
                key={id}
                linkText={'CANS'}
                userId={this.props.userId}
              />
            </p>
            <p>{`${actionVerb} on ${formattedTimestamp}`}</p>
            <p>{`by ${updatedByName}`}</p>
            <p>{`${caseReferralNumber}: ${serviceSourceUiId || ''}`}</p>
            <p>{`County: ${countyName}`}</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  processAssessmentInfo = assessment => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      service_source: serviceSource,
      service_source_ui_id: serviceSourceUiId,
      status,
      county,
      person,
    } = assessment
    const { first_name: firstName, middle_name: middleName, last_name: lastName } = person
    const suffix = person.suffix ? `, ${person.suffix}` : ''
    const clientName = `${firstName} ${middleName} ${lastName}${suffix}`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const countyName = county ? county.name : ''
    const caseReferralNumber = clientCaseReferralNumber(serviceSource).replace('Number', '#')
    const assessmentInfo = {
      clientName,
      actionVerb,
      formattedTimestamp,
      updatedByName,
      countyName,
      caseReferralNumber,
      serviceSourceUiId,
    }

    return assessmentInfo
  }

  render() {
    const { assessment, header } = this.props

    return this.renderAssessmentInfo(header, assessment)
  }
}

AssessmentRecordInfo.propTypes = {
  assessment: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  navFrom: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

AssessmentRecordInfo.defaultProps = {
  userId: null,
}

export default AssessmentRecordInfo
