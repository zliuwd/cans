import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@cwds/components'
import {
  ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY,
  ASSESSMENT_HISTORY_PAGE_SIZE_KEY,
  CLIENT_LIST_PAGE_SIZE_KEY,
  STAFF_LIST_PAGE_SIZE_KEY,
  getIntItem,
  setItem,
} from '../../util/sessionStorageUtil'
import { PAGE_SIZES } from '../../util/DataGridHelper'

class SessionDataGrid extends React.Component {
  state = {
    pageSize: getIntItem(this.props.pageSizeSessionKey) || PAGE_SIZES[0],
  }

  handleOnPageSizeChange = pageSize => {
    setItem(this.props.pageSizeSessionKey, pageSize)
    this.setState({ pageSize })
  }

  render() {
    return (
      <DataGrid {...this.props} defaultPageSize={this.state.pageSize} onPageSizeChange={this.handleOnPageSizeChange} />
    )
  }
}

SessionDataGrid.propTypes = {
  pageSizeSessionKey: PropTypes.oneOf([
    ASSESSMENT_CHANGELOG_PAGE_SIZE_KEY,
    ASSESSMENT_HISTORY_PAGE_SIZE_KEY,
    CLIENT_LIST_PAGE_SIZE_KEY,
    STAFF_LIST_PAGE_SIZE_KEY,
  ]).isRequired,
}

export default SessionDataGrid
