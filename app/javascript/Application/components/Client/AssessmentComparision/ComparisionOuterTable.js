import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'

class ComparisionOuterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  domainTotalColsGenerator = () => {
    const counter = this.props.data.date_info
    return counter.map((el, index) => {
      return {
        id: `assessment-${index}`,
        Header: `${this.props.data.date_info[index].date}`,
        accessor: domain => {
          return domain.ratting_totals[index]
        },
      }
    })
  }

  render() {
    const domainNameCol = {
      id: 'domainName',
      Header: 'Domain Name',
      accessor: domain => {
        return domain.code
      },
    }
    const domainTotalCols = this.domainTotalColsGenerator()
    const expander = {
      expander: true,
      width: 65,
      Expander: ({ isExpanded, ...rest }) => <div>{isExpanded ? <span>&#x2227;</span> : <span>&#x2228;</span>}</div>,
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

    return (
      <DataGrid
        columns={domainCmparisionTableTemplate}
        data={domains}
        sortable={true}
        className="client-grid"
        minRows={gridMinRows(this.props.data.domains)}
        noDataText={'No records found'}
        showPaginationBottom={false}
        SubComponent={() => <div style={{ padding: '10px' }}>Hello</div>}
      />
    )
  }
}

export default ComparisionOuterTable
