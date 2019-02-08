import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import './style.sass'

const DataGridHeader = ({ title, tooltip }) => (
  <div>
    <span>{title}</span>
    {tooltip && (
      <Tooltip title={tooltip} placement="top" classes={{ tooltip: 'tooltip_' }}>
        <i className="fa fa-info-circle data-grid-header-help-icon" />
      </Tooltip>
    )}
  </div>
)

DataGridHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
}

DataGridHeader.defaultProps = {
  tooltip: null,
}

export default DataGridHeader
