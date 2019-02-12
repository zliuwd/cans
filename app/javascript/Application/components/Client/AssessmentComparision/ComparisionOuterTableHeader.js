import React from 'react'
import PropTypes from 'prop-types'

const ComparisionOuterTableHeader = ({ index, dateInfo }) => {
  return (
    <div>
      <div className="outer-header-status">{dateInfo[index].status === 'IN_PROGRESS' ? 'In Progress' : null}</div>
      <div>{dateInfo[index].date}</div>
    </div>
  )
}

ComparisionOuterTableHeader.propTypes = {
  dateInfo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default ComparisionOuterTableHeader
