import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import {
  CP_TABLE_COL_WIDTHS,
  getTitle,
  expanderPlaceHolder,
  blankColFiller,
  requiredDomainColumnsAmount,
  itemRatingSwitcher,
} from './comparisonHelper'
import './style.sass'

class ComparisonInnerTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  itemRatingColsGenerator = () => {
    return this.props.assessmentDates.map((el, index) => {
      return {
        id: `item-assessment-${index}`,
        accessor: item => {
          const itemRatings = item.item_ratings
          const type = item.item_ratings[index].type
          return itemRatingSwitcher(itemRatings, index, type)
        },
        className: 'inner-item-rating',
        headerClassName: 'text-center',
      }
    })
  }

  render() {
    const itemNameCol = {
      id: 'itemName',
      width: CP_TABLE_COL_WIDTHS.ITEM_NAME,
      accessor: item => getTitle(this.props.i18n, item.code),
      className: 'inner-item-name-content',
    }

    const itemRatingCols = this.itemRatingColsGenerator()
    blankColFiller(itemRatingCols, 'item', requiredDomainColumnsAmount)
    const itemComparisonTableTemplate = [itemNameCol, ...itemRatingCols, expanderPlaceHolder]
    const { items, domainCode } = this.props
    const TheadComponent = () => null

    return (
      <DataGrid
        key={domainCode}
        columns={itemComparisonTableTemplate}
        data={items}
        sortable={false}
        minRows={gridMinRows(items)}
        noDataText={'No records found'}
        TheadComponent={TheadComponent}
        defaultPageSize={50}
        showPaginationBottom={false}
      />
    )
  }
}

ComparisonInnerTable.propTypes = {
  assessmentDates: PropTypes.array.isRequired,
  domainCode: PropTypes.string.isRequired,
  i18n: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      item_ratings: PropTypes.array.isRequired,
    })
  ).isRequired,
}

ComparisonInnerTable.defaultProps = {
  i18n: {},
}

export default ComparisonInnerTable
