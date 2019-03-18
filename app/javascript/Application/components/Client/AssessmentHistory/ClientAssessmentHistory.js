import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Row } from 'reactstrap'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import { isAuthorized } from '../../common/AuthHelper'
import AddCansButton from '../AddCansButton'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { sortAssessments, hasOneCompletedForReassessment } from '../../Assessment/'
import { LoadingState } from '../../../util/loadingHelper'
import RecordsModeSwitchButton from '../RecordsModeSwitchButton'
import { recordsMode } from '../Client.helper'

class ClientAssessmentHistory extends PureComponent {
  renderAssessments = assessments => {
    const assessmentsToDisplay = 3
    const { updateAssessmentHistoryCallback, loadingState } = this.props
    const noDataText =
      loadingState === LoadingState.ready
        ? 'No assessments currently exist for this child/youth.'
        : 'Loading assessments...'

    return assessments.length === 0 ? (
      <div id="no-data">{noDataText}</div>
    ) : (
      assessments
        .slice(0, assessmentsToDisplay)
        .map(assessment => (
          <ClientAssessmentHistoryRecord
            key={assessment.id}
            assessment={assessment}
            inheritUrl={this.props.inheritUrl}
            navFrom={this.props.navFrom}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
            userId={this.props.userId}
          />
        ))
    )
  }

  renderAssessmentsTable(assessments) {
    const { updateAssessmentHistoryCallback } = this.props

    return (
      <ClientAssessmentHistoryTable
        assessments={assessments}
        navFrom={this.props.navFrom}
        inheritUrl={this.props.inheritUrl}
        userId={this.props.userId}
        updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
      />
    )
  }

  render() {
    const { assessments, client } = this.props
    const sortedAssessmentsByEventAndCreatedDate = sortAssessments(assessments)
    const hasLastCompletedAssessment = hasOneCompletedForReassessment(assessments, client.service_source_id)
    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
            <CardTitle>
              <span>Assessment History</span>
              <RecordsModeSwitchButton
                switchButtonName={recordsMode.COMPARISON}
                recordsModeSwitch={this.props.recordsModeSwitch}
                assessments={assessments}
              />
              <AddCansButton
                clientIdentifier={client.identifier}
                disabled={!isAuthorized(client, 'createAssessment')}
                isReassessment={hasLastCompletedAssessment}
              />
            </CardTitle>
          </CardHeader>
          <CardBody className={'card-body-client-assessment-history'}>
            <Row>{this.renderAssessments(sortedAssessmentsByEventAndCreatedDate)}</Row>
            {this.renderAssessmentsTable(sortedAssessmentsByEventAndCreatedDate)}
          </CardBody>
        </Card>
      </Grid>
    )
  }
}

ClientAssessmentHistory.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
  client: PropTypes.object.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  loadingState: PropTypes.string,
  navFrom: PropTypes.string,
  recordsModeSwitch: PropTypes.func.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentHistory.defaultProps = {
  assessments: [],
  navFrom: null,
  userId: null,
  loadingState: '',
}

export default ClientAssessmentHistory
