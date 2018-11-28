import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType } from './DomainHelper'
import { getI18nByCode } from '../I18nHelper'
import DataGrid from '@cwds/components/lib/DataGrid'

const SummaryGrid = ({ domainFilter, domains, header, i18n, itemFilter }) => {
  const columns = [
    {
      id: 'items',
      Header: header,
      accessor: s => s,
    },
  ]

  const items = domains
    .filter(domainFilter)
    .map(domain => domain.items)
    .reduce((allItems, items) => allItems.concat(items), [])
    .filter(itemFilter)

  const codes = items.map(item => {
    const code = getI18nByCode(i18n, item.code)
    return (code && code._title_) || ''
  })

  return (
    <DataGrid
      className="-striped"
      data={codes}
      pageSize={items.length}
      columns={columns}
      minRows={0}
      NoDataComponent={() => null}
      showPagination={false}
    />
  )
}

SummaryGrid.propTypes = {
  domainFilter: PropTypes.func,
  domains: DomainsPropType,
  header: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  itemFilter: PropTypes.func,
}

SummaryGrid.defaultProps = {
  domainFilter: d => true,
  domains: [],
  itemFilter: i => true,
}

export default SummaryGrid
