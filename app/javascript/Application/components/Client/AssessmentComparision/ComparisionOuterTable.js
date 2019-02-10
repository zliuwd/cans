import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import ComparisionInnerTable from './ComparisionInnerTable'
import { commonStyle, verticalCenter, CP_TABLE_COL_WIDTHS } from './comparisionHelper'
import './style.sass'

class ComparisionOuterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  domainTotalColsGenerator = counter => {
    return counter.map((el, index) => {
      return {
        id: `domain-assessment-${index}`,
        width: CP_TABLE_COL_WIDTHS.DOMAIN_RATING_TOTAL,
        style: {
          height: '5rem',
          ...verticalCenter,
        },
        Header: `${this.props.data.date_info[index].date}`,
        accessor: domain => {
          return domain.ratting_totals[index]
        },
        className: 'outer-content',
        headerClassName: 'outer-header',
      }
    })
  }

  renderSubComponent = (original, counter) => {
    return (
      <ComparisionInnerTable
        domainCode={original.original.code}
        items={original.original.items}
        counter={this.props.data.date_info}
      />
    )
  }

  render() {
    const counter = this.props.data.date_info
    const domainNameCol = {
      id: 'domainName',
      width: CP_TABLE_COL_WIDTHS.DOMAIN_NAME,
      Header: 'Domain Name',
      accessor: domain => {
        return domain.code
      },
      style: {
        height: '5rem',
        ...verticalCenter,
      },
      className: 'outer-content',
      headerClassName: 'outer-header',
    }
    const domainTotalCols = this.domainTotalColsGenerator(counter)
    const expander = {
      id: 'expander',
      width: CP_TABLE_COL_WIDTHS.EXPANDER,
      expander: true,
      Expander: ({ isExpanded, domain, ...rest }) => {
        return <div>{isExpanded ? <span>&#x2227;</span> : <span>&#x2228;</span>}</div>
      },
      style: {
        cursor: 'pointer',
        fontSize: 25,
        padding: '0',
        textAlign: 'center',
        userSelect: 'none',
        height: '5rem',
        ...verticalCenter,
      },
      ...commonStyle,
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
        SubComponent={this.renderSubComponent}
      />
    )
  }
}

export default ComparisionOuterTable
