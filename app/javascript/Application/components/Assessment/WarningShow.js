import React from 'react'
import PropTypes from 'prop-types'
import ConfidentialityWarning from '../common/ConfidentialityWarning'

const WarningShow = ({ isSubmitWarningShown, handleSubmitWarning, handleSubmitAssessment, substanceUseItemsIds }) => (
  <div>
    {isSubmitWarningShown ? (
      <ConfidentialityWarning
        substanceUseItemsIds={substanceUseItemsIds}
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
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

export default WarningShow
