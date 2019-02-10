import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import { gridMinRows } from '../../../util/DataGridHelper'

class ComparisionInnerTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  itemRatingColsGenerator = () => {
    return this.props.counter.map((el, index) => {
      return {
        id: `item-assessment-${index}`,
        accessor: item => {
          return item.item_ratings[index].value
        },
      }
    })
  }

  render() {
    const itemNameCol = {
      id: 'itemName',
      accessor: item => {
        return item.code
      },
    }

    const itemRatingCols = this.itemRatingColsGenerator()

    const itemCmparisionTableTemplate = [itemNameCol, ...itemRatingCols]

    const items = this.props.items

    return (
      <DataGrid
        key={this.props.domainCode}
        columns={itemCmparisionTableTemplate}
        data={items}
        sortable={true}
        className="client-grid"
        minRows={gridMinRows(this.props.items)}
        noDataText={'No records found'}
        showPaginationBottom={false}
      />
    )
  }
}

export default ComparisionInnerTable
