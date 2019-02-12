import React from 'react'
import PropTypes from 'prop-types'

const ComparisionOuterTableExpander = ({ isExpanded, ...rest }) => {
  return (
    <div>
      {isExpanded ? (
        <span>
          <div className={'symbol-open'}>&#x2329;</div>
        </span>
      ) : (
        <span>
          <div className={'symbol-close'}>&#x2329;</div>
        </span>
      )}
    </div>
  )
}

ComparisionOuterTableExpander.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default ComparisionOuterTableExpander
