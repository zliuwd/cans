import React from 'react'
import { caregiverWarning } from '../Assessment/AssessmentHelper'
import PropTypes from 'prop-types'
import PageModal from '../common/PageModal'

const RenderWarning = ({ isCaregiverWarningShown, handleWarningShow, handleCaregiverRemove, focusedCaregiverId }) => {
  return (
    <div>
      <PageModal
        isOpen={isCaregiverWarningShown}
        title={'Warning'}
        warningDescription={caregiverWarning}
        description={'This may affect some of your entries.'}
        nextStepButtonLabel={'Remove'}
        cancelButtonLabel={'Cancel'}
        onCancel={() => handleWarningShow(false)}
        onNextStep={() => {
          handleWarningShow(false)
          handleCaregiverRemove(focusedCaregiverId)
        }}
      />
    </div>
  )
}

RenderWarning.propTypes = {
  focusedCaregiverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCaregiverRemove: PropTypes.func.isRequired,
  handleWarningShow: PropTypes.func.isRequired,
  isCaregiverWarningShown: PropTypes.bool.isRequired,
}

RenderWarning.defaultProps = {
  focusedCaregiverId: null,
}

export default RenderWarning
