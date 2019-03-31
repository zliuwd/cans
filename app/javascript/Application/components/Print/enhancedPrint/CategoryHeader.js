import React from 'react'
import PropTypes from 'prop-types'

const CategoryHeader = props => {
  return (
    <div className="cat-header-container">
      <svg height="50px" width="100%">
        <rect width="100%" height="50px" style={{ fill: '#e8e8e8' }} />
        <text fontSize="27px" fill="black">
          <tspan dy="33px" x="0" dx="10px">
            {props.title}
          </tspan>
        </text>
      </svg>
      <hr />
    </div>
  )
}

export default CategoryHeader
