import React from 'react'
import PropTypes from 'prop-types'
import { caregiverNameContainer, caregiverNameText } from './PrintAssessmentStyle'

const PrintCaregiverName = ({ name }) => {
  return (
    <div style={caregiverNameContainer}>
      <span>Caregiver name:</span>
      <span id="caregiverNameText" style={caregiverNameText}>
        {name}
      </span>
    </div>
  )
}

PrintCaregiverName.propTypes = {
  name: PropTypes.string,
}

PrintCaregiverName.defaultProps = {
  name: '',
}

export default PrintCaregiverName
