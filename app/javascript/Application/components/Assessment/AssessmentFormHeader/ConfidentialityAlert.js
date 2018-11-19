import React from 'react'
import PropTypes from 'prop-types'

const ConfidentialityAlert = ({ canReleaseInformation }) =>
  canReleaseInformation ? null : (
    <div className={'warning-text'}>
      By selecting NO, Items 7, 48, and EC 41 (Substance Use Disorder Items) from this CANS assessment will be redacted
      when printed.
    </div>
  )

ConfidentialityAlert.propTypes = {
  canReleaseInformation: PropTypes.bool.isRequired,
}

export default ConfidentialityAlert
