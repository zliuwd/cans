import React from 'react'
import PropTypes from 'prop-types'

const CategoryHeader = props => {
  return (
    <div className="cat-header-container">
      <div className="cat-header">{props.title}</div>
      <hr />
    </div>
  )
}

export default CategoryHeader
