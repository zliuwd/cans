import React from 'react'
import PropTypes from 'prop-types'

const PrintPageBreaker = props => {
  const pusher = props.isIE ? '0rem' : '5rem'
  return (
    <h1
      className="page-breaker"
      style={{ display: 'block', pageBreakInside: 'avoid', pageBreakBefore: 'always', marginBottom: pusher }}
    >
      {null}
    </h1>
  )
}

PrintPageBreaker.propTypes = {
  isIE: PropTypes.bool.isRequired,
}

export default PrintPageBreaker
