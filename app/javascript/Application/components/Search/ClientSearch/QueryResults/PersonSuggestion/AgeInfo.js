import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import ClientDob from './ClientDob'

const AgeInfo = ({ dateOfBirth }) => {
  const sanitizedDob = sanitizeHtml(dateOfBirth, { allowedTags: [] })
  const dob = moment.utc(sanitizedDob, 'YYYY-MM-DD')

  if (!dob.isValid()) {
    return false
  }

  const ageInYears = moment().diff(dob, 'years')

  return (
    <div className="highlighted date-of-birth">
      {<ClientDob dateOfBirth={dateOfBirth} sanitizedDob={sanitizedDob} dob={dob} />}
      <span>
        <strong>{` (${ageInYears} ${ageInYears > 1 || ageInYears === 0 ? 'years' : 'year'})`}</strong>
      </span>
    </div>
  )
}
AgeInfo.defaultProps = {
  dateOfBirth: '',
}
AgeInfo.propTypes = {
  dateOfBirth: PropTypes.string,
}

export default AgeInfo
