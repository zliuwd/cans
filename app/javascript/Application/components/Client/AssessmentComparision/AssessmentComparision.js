import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import { I18nService } from '../../Assessment'
import { fiveAssessmentWithCaregiverChange, fourAssessmentCrossingAge } from './fakeComparisionData.js'
import ComparisionOuterTable from './ComparisionOuterTable'

class AssessmentComparision extends Component {
  constructor(props) {
    super(props)
    this.state = { data: fourAssessmentCrossingAge }
  }

  componentDidMount() {
    this.fetchI18n(1)
  }

  async fetchI18n(instrumentId) {
    try {
      const i18n = await I18nService.fetchByInstrumentId(instrumentId)
      this.onFetchI18nSuccess(i18n)
    } catch (e) {
      this.setState({ i18n: {} })
    }
  }

  async onFetchI18nSuccess(i18n) {
    await this.setState({
      i18n: i18n,
    })
  }

  render() {
    const data = this.state.data
    const counter = new Array(this.state.data.date_info.length)
    return (
      <Fragment>
        <Grid item xs={12}>
          <Card className="card-cans-client-list">
            <CardHeader>
              <CardTitle className={'card-title-fix'}>Assessment Comparision Table</CardTitle>
            </CardHeader>
            <CardBody>
              <ComparisionOuterTable data={data} counter={counter} i18n={this.state.i18n} />
            </CardBody>
          </Card>
        </Grid>
      </Fragment>
    )
  }
}

AssessmentComparision.propTypes = {}

AssessmentComparision.defaultProps = {}

export default AssessmentComparision
