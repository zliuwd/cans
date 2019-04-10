import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from '../../../util/common'

const ConfidentialityAlert = ({ canReleaseConfidentialInfo, isUnderSix, substanceUseItemsIds }) =>
  !canReleaseConfidentialInfo && !isEmpty(isUnderSix) ? (
    <div className={'warning-text'}>
      By selecting &quot;No&quot;{' '}
      {isUnderSix
        ? 'item EC 41 (Substance Use Disorder Item)'
        : `items ${substanceUseItemsIds.aboveSix[0]} and 48 (Substance Use Disorder Items)`}{' '}
      from this CANS assessment will be redacted when printed.
    </div>
  ) : null

ConfidentialityAlert.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  isUnderSix: PropTypes.bool,
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

ConfidentialityAlert.defaultProps = {
  isUnderSix: null,
}

export default ConfidentialityAlert
