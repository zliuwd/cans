import React from 'react'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../../../util/dateHelper'

const ComparisonOuterTableHeader = ({ date, status }) => {
  return (
    <div>
      <div className="outer-header-status">{status === 'IN_PROGRESS' ? 'In Progress' : null}</div>
      <div className="outer-header-text">{isoToLocalDate(date)}</div>
    </div>
  )
}

ComparisonOuterTableHeader.propTypes = {
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default ComparisonOuterTableHeader
