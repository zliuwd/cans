import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { Row } from 'reactstrap'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import { AssessmentService } from '../../Assessment/Assessment.service'
import { LoadingState } from '../../../util/loadingHelper'
import AuthBoundary from '../../common/AuthBoundary'
import { buildCreateAssessmentPermission } from '../../common/AuthHelper'
import AddCansLink from '../AddCansLink'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'

class ClientAssessmentHistory extends Component {
  constructor(context) {
    super(context)
    this.state = {
      assessments: [],
      fetchStatus: LoadingState.idle,
    }
  }

  async componentDidMount() {
    const { clientIdentifier } = this.props
    if (clientIdentifier) {
      const assessments = await AssessmentService.search({
        client_identifier: clientIdentifier,
      })
      const sortAssessments = this.sortAssessmentsByDate(assessments, 'desc')
      this.setState({
        assessments: sortAssessments,
        fetchStatus: LoadingState.ready,
      })
    }
  }

  renderAddCansLink() {
    const { clientIdentifier } = this.props
    return (
      <AuthBoundary permission={buildCreateAssessmentPermission(clientIdentifier)}>
        <AddCansLink clientIdentifier={clientIdentifier} />
      </AuthBoundary>
    )
  }

  renderAssessments = (assessments, fetchStatus) => {
    const startPos = 0
    const endPos = 3

    return fetchStatus === LoadingState.ready && assessments.length === 0 ? (
      <div id="no-data">No assessments currently exist for this child/youth.</div>
    ) : (
      assessments
        .slice(startPos, endPos)
        .map(assessment => <ClientAssessmentHistoryRecord assessment={assessment} key={assessment.id} />)
    )
  }

  sortAssessmentsByDate(assessments, direction = 'asc') {
    const newAssessmentList = assessments.map(assessment => {
      const timestamp = moment(assessment.created_timestamp)
      return { ...assessment, timestamp }
    })
    newAssessmentList.sort((left, right) => {
      return direction === 'asc' ? left.timestamp.diff(right.timestamp) : right.timestamp.diff(left.timestamp)
    })
    return newAssessmentList
  }

  renderAssessmentsTable(assessments) {
    return <ClientAssessmentHistoryTable assessments={assessments} />
  }

  render() {
    const { assessments, fetchStatus } = this.state

    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
            <CardTitle>
              <span>Assessment History</span>
              {this.renderAddCansLink()}
            </CardTitle>
          </CardHeader>
          <CardBody className={'card-body-client-assessment-history'}>
            <Row>{this.renderAssessments(assessments, fetchStatus)}</Row>
            {this.renderAssessmentsTable(assessments)}
          </CardBody>
        </Card>
      </Grid>
    )
  }
}

ClientAssessmentHistory.propTypes = {
  clientIdentifier: PropTypes.string,
}

ClientAssessmentHistory.defaultProps = {
  clientIdentifier: null,
}

export default ClientAssessmentHistory
