import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

const SummaryHeader = ({ title, tooltip }) => (
  <div>
    <span>{title}</span>
    <Tooltip title={tooltip} placement="top" classes={{ tooltip: 'assessment-tooltip' }}>
      <i className="fa fa-info-circle assessment-summary-help-icon" />
    </Tooltip>
  </div>
)

SummaryHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
}

export default SummaryHeader
