import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from '@cwds/components'
import AssessmentLink from '../common/AssessmentLink'
import { isoToLocalDate } from '../../util/dateHelper'
import { getActionVerbByStatus } from '../Assessment/AssessmentHelper'
import Ellipsis from '../common/Ellipsis'

class AssessmentRecordInfo extends Component {
  renderAssessmentInfo = assessment => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      the_case: theCase,
      status,
      county,
      person,
    } = assessment
    const clientName = `${person.first_name} ${person.middle_name} ${person.last_name} ${
      person.suffix === '' ? '' : `, ${person.suffix}`
    }`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseNumber = (theCase || {}).external_id || ''
    const countyName = county ? county.name : ''
    return (
      <Card>
        <CardBody>
          <Ellipsis id={assessment.id} clientId={assessment.person.identifier} />
          <div>
            <p className="assessment-client-name no-margin">{`Client name: ${clientName}`}</p>
            <p className="no-margin">
              <AssessmentLink assessment={this.props.assessment} navFrom={this.props.navFrom} />
            </p>
            <p className="no-margin mid-gray">{`${actionVerb} on ${formattedTimestamp} by`}</p>
            <p className="no-margin mid-gray">{updatedByName}</p>
            <p className="no-margin mid-gray">{`Case: ${caseNumber}`}</p>
            <p className="no-margin mid-gray">{`County: ${countyName}`}</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  render() {
    return this.renderAssessmentInfo(this.props.assessment)
  }
}

AssessmentRecordInfo.propTypes = {
  assessment: PropTypes.object.isRequired,
  navFrom: PropTypes.string.isRequired,
}

export default AssessmentRecordInfo
