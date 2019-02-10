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

    // outer table, data from domians

    // inner table without header, data from items
    // const itemNameCol = {
    //   id: 'itemName',
    //   accessor: item => {
    //     return item.code
    //   },
    // }
    //
    // const itemRatingColsGenerator = () => {
    //   counter.map((el, index) => {
    //     return {
    //       id: `${el.item_id}-${index}`,
    //       accessor: item => {
    //         return item.item_ratings[index].value
    //       },
    //       Cell: comparisionItemRatingsTemp,
    //     }
    //   })
    // }
    //
    // const itemCmparisionTableTemplate = [itemNameCol, ...itemRatingColsGenerator()]

    return (
      <Fragment>
        <Grid item xs={12}>
          <Card className="card-cans-client-list">
            <CardHeader>
              <CardTitle className={'card-title-fix'}>Assessment Comparison Table</CardTitle>
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
