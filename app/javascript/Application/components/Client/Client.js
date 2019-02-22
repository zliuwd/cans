import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import AssessmentComparision from './AssessmentComparision/AssessmentComparision'
import { isoToLocalDate } from '../../util/dateHelper'
import NavFromProducer from '../../util/NavFromProducer'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'
import { urlTrimmer } from '../../util/urlTrimmer'
import { Card, CardHeader, CardBody, CardTitle, Button } from '@cwds/components'

const SINGLE_WIDTH = 3
const DOUBLE_WIDTH = 6

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBoundaryKey: Math.random(),
      showComparision: false,
    }
  }

  contentSwitch = () => {
    this.setState({ showComparision: !this.state.showComparision })
  }

  renderClientData(data, label, gridSize = SINGLE_WIDTH, itemId = label) {
    return (
      <Grid item xs={gridSize} id={`client-data-${itemId.replace(/ /g, '_')}`}>
        <div className={'label-text'}>{label}</div>
        {data}
      </Grid>
    )
  }

  updateClientAssessmentHistory = () => {
    this.setState({ loadingBoundaryKey: Math.random() })
  }

  sensitivityTypeLabel(type) {
    if (!type) {
      return 'Unrestricted'
    }
    switch (type) {
      case 'SEALED':
        return 'Sealed'
      case 'SENSITIVE':
        return 'Sensitive'
      default:
        return type
    }
  }

  formatCounty = county => {
    if (county) {
      return county.name
    } else {
      return ''
    }
  }

  ClientAssessmentHistoryUrlTrimmer = url => {
    const urlArray = url.split('/')
    const targetIndex = urlArray.indexOf('clients')
    const linkUrl = urlTrimmer(url, targetIndex, 2)
    return linkUrl
  }

  renderClientAssessmentHistory(client) {
    return (
      <ClientAssessmentHistoryLoadingBoundary
        clientIdentifier={client.identifier ? client.identifier : ''}
        key={this.state.loadingBoundaryKey}
      >
        <ClientAssessmentHistory
          client={client}
          navFrom={NavFromProducer(this.props.navigateTo)}
          inheritUrl={this.ClientAssessmentHistoryUrlTrimmer(this.props.match.url)}
          userId={this.props.match.params.staffId}
          updateAssessmentHistoryCallback={this.updateClientAssessmentHistory}
        />
      </ClientAssessmentHistoryLoadingBoundary>
    )
  }

  renderAssessmentComparision = () => {
    return <AssessmentComparision />
  }

  render() {
    const { client } = this.props
    const { showComparision } = this.state

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card>
              <CardHeader className={'client-card-header'}>
                <CardTitle>
                  <span className={'client-card-title'}>{'Client Information'}</span>
                  <span className={'client-card-header-button-container'}>
                    <Button className={'client-card-header-button'} onClick={this.contentSwitch}>
                      {!showComparision ? 'Show Assessment Comparision' : 'Show Assessment History'}
                    </Button>
                  </span>
                </CardTitle>
              </CardHeader>
              <div className={'content'}>
                <CardBody>
                  {client && client.identifier ? (
                    <Grid container spacing={24} id={'client-info-content'}>
                      {this.renderClientData(<b>{client.first_name}</b>, 'First Name')}
                      {this.renderClientData(<b>{client.middle_name}</b>, 'Middle Name')}
                      {this.renderClientData(<b>{client.last_name}</b>, 'Last Name')}
                      {this.renderClientData(<b>{client.suffix}</b>, 'Suffix')}
                      {this.renderClientData(isoToLocalDate(client.dob), 'Date of Birth')}
                      {this.renderClientData(this.formatCounty(client.county), 'County', SINGLE_WIDTH, 'county')}
                      {this.renderClientData(client.external_id, 'Client Id', DOUBLE_WIDTH)}
                    </Grid>
                  ) : (
                    <span id={'no-data'}>No Child Data Found</span>
                  )}
                </CardBody>
              </div>
            </Card>
          </Grid>
          {this.state.showComparision ? this.renderAssessmentComparision() : this.renderClientAssessmentHistory(client)}
        </Grid>
      </Fragment>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({ staffId: PropTypes.string }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string.isRequired,
}

Client.defaultProps = {
  client: {},
}

export default Client
