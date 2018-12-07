import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { ClientAssessmentHistoryRecord } from './'
import { AssessmentService } from '../Assessment/Assessment.service'
import { LoadingState } from '../../util/loadingHelper'
import AuthBoundary, {
  buildCreateAssessmentPermission,
} from '../common/AuthBoundary'
import AddCansLink from './AddCansLink'

import './style.sass'

class ClientAssessmentHistory extends Component {
  constructor(context) {
    super(context)
    this.state = {
      assessments: [],
      fetchStatus: LoadingState.idle,
    }
  }

  componentDidMount() {
    const { clientIdentifier } = this.props
    if (clientIdentifier) {
      return AssessmentService.search({
        client_identifier: clientIdentifier,
      }).then(data => {
        this.setState({
          assessments: data,
          fetchStatus: LoadingState.ready,
        })
      })
    }
    return null
  }

  renderAddCansLink() {
    const clientIdentifier = this.props.clientIdentifier
    return (
      <AuthBoundary
        permission={buildCreateAssessmentPermission(clientIdentifier)}
      >
        <AddCansLink clientIdentifier={clientIdentifier} />
      </AuthBoundary>
    )
  }

  renderAssessments = (assessments, fetchStatus) => {
    return fetchStatus === LoadingState.ready && assessments.length === 0 ? (
      <div id="no-data">
        No assessments currently exist for this child/youth.
      </div>
    ) : (
      assessments.map(assessment => (
        <ClientAssessmentHistoryRecord
          assessment={assessment}
          key={assessment.id}
        />
      ))
    )
  }

  render() {
    const { assessments, fetchStatus } = this.state
    return (
      <Grid item xs={12}>
        <Card className={'card'}>
          <CardHeader
            className={'card-header-cans card-header-cans-action'}
            title="Assessment History"
            action={this.renderAddCansLink()}
          />
          <div className={'content'}>
            <CardContent>
              {this.renderAssessments(assessments, fetchStatus)}
            </CardContent>
          </div>
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
