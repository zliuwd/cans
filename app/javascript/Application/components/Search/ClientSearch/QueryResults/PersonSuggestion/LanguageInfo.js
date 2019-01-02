import PropTypes from 'prop-types'
import React from 'react'

export const primaryLanguageOnly = languages => {
  return languages[0] ? languages[0] : ''
}

const LanguageInfo = ({ languages }) => {
  const lan = primaryLanguageOnly(languages.filter(Boolean))
  return lan ? (
    <div>
      <span>{lan}</span>
    </div>
  ) : null
}
LanguageInfo.defaultProps = {
  languages: [],
}
LanguageInfo.propTypes = {
  languages: PropTypes.array,
}

export default LanguageInfo
