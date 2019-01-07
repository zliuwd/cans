import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import { CloseableAlert, alertType } from '../common/CloseableAlert'
import { isoToLocalDate } from '../../util/dateHelper'
import NavFromProducer from '../../util/NavFromProducer'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'
import { urlTrimmer } from '../../util/urlTrimmer'

class Client extends Component {
  constructor(props) {
    super(props)
    const { isNewForm, successClientId } = (this.props.location || {}).state || {}
    if (successClientId && this.props.history) {
      this.props.history.replace({ ...this.props.location, state: {} })
    }
    this.state = {
      isNewForm,
      shouldRenderClientMessage: Boolean(successClientId),
      loadingBoundaryKey: Math.random(),
    }
  }

  renderClientData(data, label, gridSize = 3, itemId = label) {
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

  render() {
    const { client } = this.props
    const { isNewForm, shouldRenderClientMessage } = this.state

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={'card'}>
              <CardHeader className={'card-header-cans'} title="Client Information" />
              <div className={'content'}>
                <CardContent>
                  {shouldRenderClientMessage && (
                    <CloseableAlert
                      type={alertType.SUCCESS}
                      message={
                        isNewForm
                          ? 'Success! New Child/Youth record has been added.'
                          : 'Success! Child/Youth record has been updated.'
                      }
                      isCloseable
                      isAutoCloseable
                    />
                  )}

                  {client && client.identifier ? (
                    <Grid container spacing={24} id={'client-info-content'}>
                      {this.renderClientData(<b>{client.first_name}</b>, 'First Name')}
                      {this.renderClientData(<b>{client.middle_name}</b>, 'Middle Name')}
                      {this.renderClientData(<b>{client.last_name}</b>, 'Last Name')}
                      {this.renderClientData(<b>{client.suffix}</b>, 'Suffix')}
                      {this.renderClientData(isoToLocalDate(client.dob), 'Date of Birth')}
                      {this.renderClientData(this.formatCounty(client.county), 'County', 3, 'county')}
                      {this.renderClientData(client.external_id, 'Client Id', 6)}
                    </Grid>
                  ) : (
                    <span id={'no-data'}>No Child Data Found</span>
                  )}
                </CardContent>
              </div>
            </Card>
          </Grid>
          {this.renderClientAssessmentHistory(client)}
        </Grid>
      </Fragment>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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
