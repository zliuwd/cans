import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Row } from 'reactstrap'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import { isAuthorized } from '../../common/AuthHelper'
import AddCansLink from '../AddCansLink'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { sortAssessments } from '../../Assessment/'
import { LoadingState } from '../../../util/loadingHelper'

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
            assessment={assessment}
            key={assessment.id}
            navFrom={this.props.navFrom}
            inheritUrl={this.props.inheritUrl}
            userId={this.props.userId}
            updateAssessmentHistoryCallback={updateAssessmentHistoryCallback}
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

    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
            <CardTitle>
              <span>Assessment History</span>
              <AddCansLink clientIdentifier={client.identifier} disabled={!isAuthorized(client, 'createAssessment')} />
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
