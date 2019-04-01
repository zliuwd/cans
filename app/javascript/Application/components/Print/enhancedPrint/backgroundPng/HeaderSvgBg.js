import React from 'react'
import PropTypes from 'prop-types'

const HeaderSvgBg = ({ height = '50px', color = '#f5f5f5' }) => {
  return (
    <svg height={height} width="100%">
      <rect width="100%" height={height} style={{ fill: color }} />
    </svg>
  )
}

export default HeaderSvgBg
