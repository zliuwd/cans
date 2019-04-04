import React from 'react'
import PropTypes from 'prop-types'
import { Row } from '@cwds/reactstrap'
import HasCaregiverQuestion from './HasCaregiverQuestion'
import CanReleaseInfoQuestion from './CanReleaseInfoQuestion'
import ConfidentialityAlert from './ConfidentialityAlert'

const AssessmentOptions = ({
  assessment,
  isDisabled,
  isUnderSix,
  onCanReleaseInfoChange,
  onHasCaregiverChange,
  onHasCaregiverNoClicked,
  substanceUseItemsIds,
}) => {
  const hasCaregiver = Boolean(assessment.has_caregiver)
  const canReleaseConfidentialInfo = Boolean(assessment.can_release_confidential_info)
  return (
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
}

AssessmentOptions.propTypes = {
  assessment: PropTypes.object.isRequired,
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
  isDisabled: undefined,
  isUnderSix: undefined,
}

export default AssessmentOptions
