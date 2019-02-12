import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'
import { commonStyle, CP_TABLE_COL_WIDTHS, getTitle, expanderPlaceHolder } from './comparisionHelper'
import './style.sass'

class ComparisionInnerTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  itemSymbolGenerator = trend => {
    let result = ''
    if (!trend) {
      return result
    }
    if (trend === 'up') {
      result = ' ↑'
    } else if (trend === 'down') {
      result = ' ↓' // there is no arrow-down icon in CWDS lib so use code for both
    }
    return result
  }

  boolRatingGenerator = value => (!value ? 'No' : 'Yes')

  itemRatingColsGenerator = () => {
    const naRating = 8
    return this.props.counter.map((el, index) => {
      return {
        id: `item-assessment-${index}`,
        style: {
          minWidth: '12rem',
        },
        accessor: item => {
          let symbol = ''
          let rating = ''
          // first level condition check undefine and setting value
          if (item.item_ratings[index] && item.item_ratings[index].value !== undefined) {
            symbol = this.itemSymbolGenerator(item.item_ratings[index].trend)
            rating = item.item_ratings[index].value
          } else {
            return '--'
          }
          // second level condition for return the value
          if (this.props.domainCode === 'TRM') {
            return this.boolRatingGenerator(rating)
          } else if (rating !== -1 && rating !== naRating) {
            return rating + symbol
          } else {
            return '--'
          }
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
        const itemTitle = getTitle(this.props.i18n, item.code)
        return itemTitle
      },
      className: 'inner-item-name-content',
    }

    const itemRatingCols = this.itemRatingColsGenerator()

    const itemCmparisionTableTemplate = [itemNameCol, ...itemRatingCols, expanderPlaceHolder]

    const items = this.props.items

    const TheadComponent = props => null

    return (
      <DataGrid
        key={this.props.domainCode}
        className={'comparision-grid'}
        columns={itemCmparisionTableTemplate}
        data={items}
        sortable={true}
        minRows={gridMinRows(this.props.items)}
        noDataText={'No records found'}
        TheadComponent={TheadComponent}
        showPaginationBottom={false}
      />
    )
  }
}

ComparisionInnerTable.propTypes = {
  counter: PropTypes.array.isRequired,
  domainCode: PropTypes.string.isRequired,
  i18n: PropTypes.object,
  items: PropTypes.array.isRequired,
}

ComparisionInnerTable.defaultProps = {
  i18n: {},
}

export default ComparisionInnerTable
