import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../util/dateHelper'
import NavFromProducer from '../../util/NavFromProducer'
import { urlTrimmer } from '../../util/urlTrimmer'
import ClientAssessmentStatistics from './ClientAssessmentStatistics'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import PrintClient from '../Print/printClient/PrintClient'

const SINGLE_WIDTH = 3
const DOUBLE_WIDTH = 6

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBoundaryKey: Math.random(),
      isComparisonShown: false,
      printNow: false,
    }
  }

  togglePrintNow = () => {
    this.setState(prewState => ({ printNow: !prewState.printNow }))
  }

  onPrintClick = () => {
    !this.state.printNow && this.togglePrintNow()
  }

  onPrintClose = () => {
    this.state.printNow && this.togglePrintNow()
  }

  recordsModeSwitch = () => {
    this.setState({ isComparisonShown: !this.state.isComparisonShown })
  }

  onPrintDataChange = printData => {
    const newState = {}
    if (printData.assessments) {
      newState.assessmentsHistory = printData
    } else if (printData.currentDataKey || (printData.data && printData.i18n)) {
      const prevComparisonData = this.state.comparisonData
      newState.comparisonData = prevComparisonData ? { ...prevComparisonData, ...printData } : { ...printData }
    }
    if (!this.state.printButton) {
      newState.printButton = <PrintButton isEnabled={Boolean(printData)} onPrintClick={this.onPrintClick} />
      this.props.headerController.setPrintButton(newState.printButton)
    }
    this.setState({ ...newState })
  }

  printData = () => (this.state.isComparisonShown ? this.state.comparisonData : this.state.assessmentsHistory)

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

  renderGrid = client => {
    return (
      <Grid container spacing={24} id={'client-info-content'}>
        {this.renderClientData(<b>{client.first_name}</b>, 'First Name')}
        {this.renderClientData(<b>{client.middle_name}</b>, 'Middle Name')}
        {this.renderClientData(<b>{client.last_name}</b>, 'Last Name')}
        {this.renderClientData(<b>{client.suffix}</b>, 'Suffix')}
        {this.renderClientData(isoToLocalDate(client.dob), 'Date of Birth')}
        {this.renderClientData(this.formatCounty(client.county), 'County', SINGLE_WIDTH, 'county')}
        {this.renderClientData(client.external_id, 'Client Id', DOUBLE_WIDTH)}
      </Grid>
    )
  }

  render() {
    const { client } = this.props
    const clientIdentifier = client.identifier ? client.identifier : ''
    const assessmentStatisticsProps = {
      clientIdentifier,
      loadingBoundaryKey: this.state.loadingBoundaryKey,
      isComparisonShown: this.state.isComparisonShown,
      client,
      navFrom: NavFromProducer(this.props.navigateTo),
      inheritUrl: this.ClientAssessmentHistoryUrlTrimmer(this.props.match.url),
      userId: this.props.match.params.staffId,
      updateAssessmentHistoryCallback: this.updateClientAssessmentHistory,
      recordsModeSwitch: this.recordsModeSwitch,
      dataChangeCallback: this.onPrintDataChange,
    }

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={'card'}>
              <CardHeader className={'card-header-cans'} title="Client Information" />
              <div className={'content'}>
                <CardContent>
                  {client && client.identifier ? (
                    this.renderGrid(client)
                  ) : (
                    <span id={'no-data'}>No Child Data Found</span>
                  )}
                </CardContent>
              </div>
            </Card>
          </Grid>
          <ClientAssessmentHistoryLoadingBoundary
            clientIdentifier={clientIdentifier}
            key={this.state.loadingBoundaryKey}
            dataFetchCallback={this.onPrintDataChange}
          >
            <ClientAssessmentStatistics {...assessmentStatisticsProps} />
          </ClientAssessmentHistoryLoadingBoundary>
        </Grid>
        {this.state.printNow ? (
          <PrintClient client={client} printData={this.printData()} onClose={this.onPrintClose} />
        ) : null}
      </Fragment>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object,
  headerController: PropTypes.shape({ setPrintButton: PropTypes.func.isRequired }),
  match: PropTypes.shape({
    params: PropTypes.shape({ staffId: PropTypes.string }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string.isRequired,
}

Client.defaultProps = {
  client: {},
  headerController: undefined,
}

export default Client
