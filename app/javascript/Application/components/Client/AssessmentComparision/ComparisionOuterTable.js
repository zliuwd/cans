import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'

class ComparisionOuterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  domainTotalColsGenerator = domainCmparisionTableTemplate => {
    const counter = this.props.data.date_info
    counter.forEach((el, index) => {
      domainCmparisionTableTemplate.push({
        id: `assessment-${index}`,
        Header: `${this.props.data.date_info[index].date}`,
        accessor: domain => {
          return domain.ratting_totals[index]
        },
      })
    })
  }

  render() {
    const counter = this.props.counter
    const domainNameCol = {
      id: 'domainName',
      Header: 'Domain Name',
      accessor: domain => {
        return domain.code
      },
    }
    const domainCmparisionTableTemplate = [domainNameCol]

    this.domainTotalColsGenerator(domainCmparisionTableTemplate)
    console.log(domainCmparisionTableTemplate)
    // const domainCmparisionTableTemplate = [
    //   {
    //     id: 'domainName',
    //     Header: 'Domain Name',
    //     accessor: d => d.code,
    //   },
    // ]

    const domains = this.props.data.domains
    console.log(this.props)
    return (
      <DataGrid
        columns={domainCmparisionTableTemplate}
        data={domains}
        sortable={true}
        className="client-grid"
        minRows={gridMinRows(this.props.data.domains)}
        noDataText={'No records found'}
        showPaginationBottom={false}
      />
    )
  }
}

export default ComparisionOuterTable
