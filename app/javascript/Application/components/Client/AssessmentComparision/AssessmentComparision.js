import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import { data } from './fakeComparisionData.js'
import ComparisionOuterTable from './ComparisionOuterTable'

class AssessmentComparision extends Component {
  constructor(props) {
    super(props)
    this.state = { data: data }
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
              <ComparisionOuterTable data={data} counter={counter} />
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
