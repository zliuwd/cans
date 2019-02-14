import React from 'react'
import PropTypes from 'prop-types'
import ConfidentialityWarning from '../common/ConfidentialityWarning'

const WarningShow = ({ isSubmitWarningShown, handleSubmitWarning, handleSubmitAssessment }) => (
  <div>
    {isSubmitWarningShown ? (
      <ConfidentialityWarning
        onCancel={() => handleSubmitWarning(false)}
        onNextStep={() => {
          handleSubmitWarning(false)
          handleSubmitAssessment()
        }}
      />
    ) : null}
  </div>
)

WarningShow.propTypes = {
  handleSubmitAssessment: PropTypes.func.isRequired,
  handleSubmitWarning: PropTypes.func.isRequired,
  isSubmitWarningShown: PropTypes.bool.isRequired,
}

export default WarningShow
