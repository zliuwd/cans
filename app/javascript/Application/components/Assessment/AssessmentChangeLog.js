import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from '@cwds/components/lib/Cards'
import CardTitle from '@cwds/components/lib/Cards/CardTitle'
import DataGrid from '@cwds/components/lib/DataGrid'
import moment from 'moment'

const columnConfig = [
  {
    Header: 'Date / Time Changed',
    accessor: 'formatted_changed_at',
  },
  {
    Header: 'Change Authored By',
    accessor: 'user_id',
  },
  {
    Header: 'Change Made',
    accessor: 'assessment_change_type',
  },
]

class AssessmentChangeLog extends Component {
  // Guard against promise resolution after unmount
  _mounted = false

  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          id: 60001,
          user_id: 'Jane Doe',
          changed_at: '2018-10-29T13:22:15.231Z',
          formatted_changed_at: moment('2018-10-29T13:22:15.231Z').format(
            'MM/DD/YYYY h:mm:ss a'
          ),
          change_type: 'MOD',
          assessment_change_type: 'SAVED',
        },
        {
          id: 60000,
          user_id: 'Jane Doe',
          changed_at: '2018-10-29T13:20:01.466Z',
          formatted_changed_at: moment('2018-10-29T13:20:01.466Z').format(
            'MM/DD/YYYY h:mm:ss a'
          ),
          change_type: 'MOD',
          assessment_change_type: 'SAVED',
        },
        {
          id: 57500,
          user_id: 'Jane Doe',
          changed_at: '2018-10-26T15:40:20.859Z',
          formatted_changed_at: moment('2018-10-26T15:40:20.859Z').format(
            'MM/DD/YYYY h:mm:ss a'
          ),
          change_type: 'MOD',
          assessment_change_type: 'SAVED',
        },
        {
          id: 55001,
          user_id: 'Jane Doe',
          changed_at: '2018-10-26T15:29:57.004Z',
          formatted_changed_at: moment('2018-10-26T15:29:57.004Z').format(
            'MM/DD/YYYY h:mm:ss a'
          ),
          change_type: 'MOD',
          assessment_change_type: 'SAVED',
        },
        {
          id: 55000,
          user_id: 'John Doe',
          changed_at: '2018-10-26T15:29:46.751Z',
          formatted_changed_at: moment('2018-10-26T15:29:46.751Z').format(
            'MM/DD/YYYY h:mm:ss a'
          ),
          change_type: 'ADD',
          assessment_change_type: 'CREATED',
        },
      ],
    }
  }

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  render() {
    const { data } = this.state

    return (
      <Card className="change-log-wrapper">
        <CardHeader>
          <CardTitle>{`Change Log of CANS Assessments`}</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <DataGrid
            data={data}
            showPagination={false}
            defaultPageSize={data.length}
            columns={columnConfig}
            className="assessment-change-log"
          />
        </CardBody>
      </Card>
    )
  }
}

export default AssessmentChangeLog
