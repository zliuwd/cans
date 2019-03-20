import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { CardBody } from '@cwds/components'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
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
    const { assessments } = this.props
    const sortedAssessmentsByEventAndCreatedDate = sortAssessments(assessments)

    return (
      <CardBody className={'card-body-client-assessment-history'}>
        <Row>{this.renderAssessments(sortedAssessmentsByEventAndCreatedDate)}</Row>
        {this.renderAssessmentsTable(sortedAssessmentsByEventAndCreatedDate)}
      </CardBody>
    )
  }
}

ClientAssessmentHistory.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
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
