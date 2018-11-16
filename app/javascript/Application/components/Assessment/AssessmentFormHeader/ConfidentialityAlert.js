import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@cwds/components'

const ConfidentialityAlert = ({ canReleaseInformation }) =>
  canReleaseInformation ? null : (
    <Alert color={'warning'}>
      By selecting NO, Items 7, 48, and EC 41 (Substance Use Disorder Items) from this CANS assessment will be redacted
      when printed.
    </Alert>
  )

ConfidentialityAlert.propTypes = {
  canReleaseInformation: PropTypes.bool.isRequired,
}

export default ConfidentialityAlert
