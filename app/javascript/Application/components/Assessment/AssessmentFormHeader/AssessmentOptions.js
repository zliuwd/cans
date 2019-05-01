import React from 'react'
import PropTypes from 'prop-types'
import { Row } from '@cwds/reactstrap'
import HasCaregiverQuestion from './HasCaregiverQuestion'
import CanReleaseInfoQuestion from './CanReleaseInfoQuestion'
import ConfidentialityAlert from './ConfidentialityAlert'

const AssessmentOptions = ({
  canReleaseConfidentialInfo,
  hasCaregiver,
  isDisabled,
  isUnderSix,
  onCanReleaseInfoChange,
  onHasCaregiverChange,
  onHasCaregiverNoClicked,
  substanceUseItemsIds,
}) => (
  <Row>
    <HasCaregiverQuestion
      hasCaregiver={hasCaregiver}
      disabled={isDisabled}
      onHasCaregiverChange={onHasCaregiverChange}
      onHasCaregiverNoClicked={onHasCaregiverNoClicked}
    />
    <CanReleaseInfoQuestion
      canReleaseConfidentialInfo={canReleaseConfidentialInfo}
      message={
        <ConfidentialityAlert
          canReleaseConfidentialInfo={canReleaseConfidentialInfo}
          isUnderSix={isUnderSix}
          substanceUseItemsIds={substanceUseItemsIds}
        />
      }
      isDisabled={isDisabled}
      onCanReleaseInfoChange={onCanReleaseInfoChange}
    />
  </Row>
)

AssessmentOptions.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool,
  hasCaregiver: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isUnderSix: PropTypes.bool,
  onCanReleaseInfoChange: PropTypes.func.isRequired,
  onHasCaregiverChange: PropTypes.func.isRequired,
  onHasCaregiverNoClicked: PropTypes.func.isRequired,
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

AssessmentOptions.defaultProps = {
  canReleaseConfidentialInfo: false,
  hasCaregiver: false,
  isDisabled: undefined,
  isUnderSix: undefined,
}

export default React.memo(AssessmentOptions)
