import React from 'react'
import PropTypes from 'prop-types'
import { DomainsPropType, itemsValue } from './DomainHelper'
import { getI18nByCode } from '../../common/I18nHelper'
import { DataGrid } from '@cwds/components'

const SummaryGrid = ({ domainFilter, domains, header, i18n, itemFilter }) => {
  const columns = [
    {
      id: 'items',
      Header: header,
      accessor: s => s,
    },
  ]

  const items = itemsValue(domains, domainFilter, itemFilter)

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
  header: PropTypes.node.isRequired,
  i18n: PropTypes.object.isRequired,
  itemFilter: PropTypes.func,
}

SummaryGrid.defaultProps = {
  domainFilter: d => true,
  domains: [],
  itemFilter: i => true,
}

export default SummaryGrid
