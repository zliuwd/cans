import React from 'react'
import PropTypes from 'prop-types'

const EprintPageBreaker = props => {
  return (
    <h1 className="page-breaker" style={{ display: 'block', pageBreakInside: 'avoid', pageBreakBefore: 'always' }}>
      {null}
    </h1>
  )
}

export default EprintPageBreaker
