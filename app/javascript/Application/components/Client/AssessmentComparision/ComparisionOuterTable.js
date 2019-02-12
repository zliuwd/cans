import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import ComparisionInnerTable from './ComparisionInnerTable'
import ComparisionOuterTableHeader from './ComparisionOuterTableHeader'
import { verticalCenter, CP_TABLE_COL_WIDTHS, getTitle, expander } from './comparisionHelper'
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
        Header: <ComparisionOuterTableHeader index={index} dateInfo={this.props.data.date_info} />,
        accessor: domain => {
          const ratingTotal = domain.ratting_totals[index]
          if (!ratingTotal) {
            return '--'
          } else if (domain.code === 'TRM') {
            return `${ratingTotal}-Y`
          } else {
            return ratingTotal
          }
        },
        className: 'outer-content',
        headerClassName: 'outer-content-header',
      }
    })
  }

  renderSubComponent = props => {
    const counter = props.original.items[0].item_ratings
    return (
      <ComparisionInnerTable
        domainCode={props.original.code}
        items={props.original.items}
        counter={counter}
        i18n={this.props.i18n}
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
        const domainTitle = getTitle(this.props.i18n, domain.code)
        if (domain.code === 'TRM') {
          return 'PTACE'
        }
        if (domain.code === 'STR') {
          return `${domainTitle} ( 6 to 21 )`
        } else if (domain.code === 'EST') {
          return `${domainTitle} ( 0 to 5 )`
        }
        if (domain.code === 'CGV' && domain.caregiver_name) {
          return `Caregiver Domain-${domain.caregiver_index}-${domain.caregiver_name}`
        } else if (domain.code === 'CGV') {
          return `Caregiver Domain-${domain.caregiver_index}`
        }
        return domainTitle
      },
      style: {
        height: '5rem',
        ...verticalCenter,
      },
      className: 'outer-domain-name-content',
      headerClassName: 'outer-domain-name-header',
    }

    const domainTotalCols = this.domainTotalColsGenerator(counter)
    const domainCmparisionTableTemplate = [domainNameCol, ...domainTotalCols, expander]
    const domains = this.props.data.domains

    return (
      <DataGrid
        className={'comparision-grid'}
        columns={domainCmparisionTableTemplate}
        data={domains}
        sortable={true}
        minRows={gridMinRows(this.props.data.domains)}
        noDataText={'No records found'}
        showPaginationBottom={false}
        SubComponent={this.renderSubComponent}
      />
    )
  }
}

ComparisionOuterTable.propTypes = {
  data: PropTypes.shape({
    date_info: PropTypes.string.isRequired,
    domains: PropTypes.array.isRequired,
  }).isRequired,
  i18n: PropTypes.object,
}

ComparisionOuterTable.defaultProps = {
  i18n: {},
}

export default ComparisionOuterTable
