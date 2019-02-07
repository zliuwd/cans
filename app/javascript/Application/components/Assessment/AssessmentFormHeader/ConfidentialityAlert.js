import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from '../../../util/common'

const ConfidentialityAlert = ({ canReleaseInformation, isUnderSix }) =>
  !canReleaseInformation && !isEmpty(isUnderSix) ? (
    <div className={'warning-text'}>
      By selecting &quot;NO&quot;{' '}
      {isUnderSix ? 'item EC 41 (Substance Use Disorder Item)' : 'items 7 and 48 (Substance Use Disorder Items)'} from
      this CANS assessment will be redacted when printed.
    </div>
  ) : null

ConfidentialityAlert.propTypes = {
  canReleaseInformation: PropTypes.bool.isRequired,
  isUnderSix: PropTypes.bool,
}

ConfidentialityAlert.defaultProps = {
  isUnderSix: null,
}

export default ConfidentialityAlert
