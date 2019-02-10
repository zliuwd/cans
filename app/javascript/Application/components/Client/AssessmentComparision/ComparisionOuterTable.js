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
        style: {
          minWidth: '12rem',
          height: '5rem',
          ...verticalCenter,
        },
        Header: `${this.props.data.date_info[index].date}`,
        accessor: domain => {
          if (domain.code === 'TRM') {
            return `${domain.ratting_totals[index]}-Y`
          } else {
            return domain.ratting_totals[index]
          }
        },
        className: 'outer-content',
        headerClassName: 'outer-content-header',
      }
    })
  }

  renderSubComponent = (original, counter) => {
    return (
      <ComparisionInnerTable
        domainCode={original.original.code}
        items={original.original.items}
        counter={original.original.items[0].item_ratings}
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
        if (domain.code === 'CGV' && domain.caregiver_name) {
          return `${domain.code}-${domain.caregiver_name}`
        }
        return domain.code
      },
      style: {
        height: '5rem',
        ...verticalCenter,
      },
      className: 'outer-domain-name-content',
      headerClassName: 'outer-domain-name-header',
    }
    const domainTotalCols = this.domainTotalColsGenerator(counter)
    const expander = {
      id: 'expander',
      width: CP_TABLE_COL_WIDTHS.EXPANDER,
      expander: true,
      Expander: ({ isExpanded, domain, ...rest }) => {
        return (
          <div>
            {isExpanded ? (
              <span>
                <div className={'symbol-open'}>&#x2329;</div>
              </span>
            ) : (
              <span>
                <div className={'symbol-close'}>&#x2329;</div>
              </span>
            )}
          </div>
        )
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
