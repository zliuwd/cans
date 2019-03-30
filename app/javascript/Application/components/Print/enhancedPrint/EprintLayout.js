import React from 'react'
import PropTypes from 'prop-types'

const EprintLayout = props => {
  return (
    <table className="print-container">
      <thead className="print-header">
        <tr>
          <th className="header-content">
            <div className="top-cover" />
            {props.header}
          </th>
        </tr>
      </thead>
      <tfoot className="print-footer">
        <tr>
          <th>
            <p />
            <div className="bottom-cover">{props.footer}</div>
          </th>
        </tr>
      </tfoot>

      <tbody>
        <tr>
          <th>
            <div className="content">{props.children}</div>
          </th>
        </tr>
      </tbody>
    </table>
  )
}

export default EprintLayout
