import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import ComparisionInnerTable from './ComparisionInnerTable'

class ComparisionOuterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  domainTotalColsGenerator = counter => {
    return counter.map((el, index) => {
      return {
        id: `domain-assessment-${index}`,
        Header: `${this.props.data.date_info[index].date}`,
        accessor: domain => {
          return domain.ratting_totals[index]
        },
      }
    })
  }

  render() {
    const counter = this.props.data.date_info
    const domainNameCol = {
      id: 'domainName',
      Header: 'Domain Name',
      accessor: domain => {
        return domain.code
      },
    }
    const domainTotalCols = this.domainTotalColsGenerator(counter)
    const expander = {
      id: 'expander',
      expander: true,
      width: 65,
      Expander: ({ isExpanded, domain, ...rest }) => {
        return <div>{isExpanded ? <span>&#x2227;</span> : <span>&#x2228;</span>}</div>
      },
      accessor: domain => {
        return domain.code
      },
      style: {
        cursor: 'pointer',
        fontSize: 25,
        padding: '0',
        textAlign: 'center',
        userSelect: 'none',
      },
    }

    const domainCmparisionTableTemplate = [domainNameCol, ...domainTotalCols, expander]

    const domains = this.props.data.domains
    console.log(this.state)
    return (
      <DataGrid
        columns={domainCmparisionTableTemplate}
        data={domains}
        sortable={true}
        className="client-grid"
        minRows={gridMinRows(this.props.data.domains)}
        noDataText={'No records found'}
        showPaginationBottom={false}
        SubComponent={original => {
          console.log(original)
          return (
            <ComparisionInnerTable
              domainCode={original.original.code}
              items={original.original.items}
              counter={counter}
            />
          )
        }}
      />
    )
  }
}

export default ComparisionOuterTable
