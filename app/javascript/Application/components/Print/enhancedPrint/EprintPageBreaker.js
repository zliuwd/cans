import React from 'react'
import PropTypes from 'prop-types'

const EprintPageBreaker = props => {
  return <p style={{ pageBreakInside: 'avoid', pageBreakAfter: 'always' }} />
}

export default EprintPageBreaker
