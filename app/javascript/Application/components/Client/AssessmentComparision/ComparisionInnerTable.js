import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import { commonStyle, CP_TABLE_COL_WIDTHS } from './comparisionHelper'
import './style.sass'

class ComparisionInnerTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  itemRatingColsGenerator = () => {
    return this.props.counter.map((el, index) => {
      return {
        id: `item-assessment-${index}`,
        width: CP_TABLE_COL_WIDTHS.ITEM_RATING,
        accessor: item => {
          return item.item_ratings[index].value
        },
        ...commonStyle,
      }
    })
  }

  render() {
    const itemNameCol = {
      id: 'itemName',
      width: CP_TABLE_COL_WIDTHS.ITEM_NAME,
      accessor: item => {
        return item.code
      },
      ...commonStyle,
    }

    const itemRatingCols = this.itemRatingColsGenerator()

    const itemCmparisionTableTemplate = [itemNameCol, ...itemRatingCols]

    const items = this.props.items

    const TheadComponent = props => null

    return (
      <DataGrid
        key={this.props.domainCode}
        columns={itemCmparisionTableTemplate}
        data={items}
        sortable={true}
        className="client-grid"
        minRows={gridMinRows(this.props.items)}
        noDataText={'No records found'}
        TheadComponent={TheadComponent}
        showPaginationBottom={false}
      />
    )
  }
}

export default ComparisionInnerTable
