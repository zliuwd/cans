import React from 'react'
import PropTypes from 'prop-types'

const PrintImagePreLoader = ({ imageArray }) => {
  if (imageArray.length < 1) {
    return null
  }
  return imageArray.map(imgName => {
    return <img style={{ display: 'none' }} key={imgName} src={imgName} alt="preLoader" />
  })
}

export default PrintImagePreLoader
// this component will guarantee that the image will be fully loaded into memory before print review show
// this component must be used in the component which generating print node
// precondition will making sure this node could be successfully rendered
