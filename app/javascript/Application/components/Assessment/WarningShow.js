import React from 'react'
import PropTypes from 'prop-types'
import ConfidentialityWarning from '../common/ConfidentialityWarning'

const WarningShow = ({ isSubmitWarningShown, handleSubmitWarning, handleSubmitAssessment }) => {
  return (
    <div>
      {isSubmitWarningShown ? (
        <ConfidentialityWarning
          onCancel={() => handleSubmitWarning()}
          onNextStep={() => {
            handleSubmitWarning()
            handleSubmitAssessment()
          }}
        />
      ) : null}
    </div>
  )
}

WarningShow.propTypes = {
  handleSubmitAssessment: PropTypes.func.isRequired,
  handleSubmitWarning: PropTypes.func.isRequired,
  isSubmitWarningShown: PropTypes.bool.isRequired,
}

export default WarningShow
