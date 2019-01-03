import React from 'react'
import PropTypes from 'prop-types'

const LegacyInfo = ({ legacyUiId }) => {
  return legacyUiId ? <div>{legacyUiId}</div> : null
}
LegacyInfo.defaultProps = {
  legacyUiId: '',
}
LegacyInfo.propTypes = {
  legacyUiId: PropTypes.string,
}

export default LegacyInfo
