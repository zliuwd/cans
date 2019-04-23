import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledInfotip, PopoverBody } from '@cwds/components'

const DataGridHeader = ({ title, tooltip, index }) => (
  <div>
    <span>{title}</span>
    {tooltip && (
      <UncontrolledInfotip id={`title-${index}`} placement="top">
        <PopoverBody>{tooltip}</PopoverBody>
      </UncontrolledInfotip>
    )}
  </div>
)

DataGridHeader.propTypes = {
  index: PropTypes.string,
  title: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
}

DataGridHeader.defaultProps = {
  tooltip: null,
  index: undefined,
}

export default DataGridHeader
