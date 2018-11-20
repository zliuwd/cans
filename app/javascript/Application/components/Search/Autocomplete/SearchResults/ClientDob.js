import React from 'react'
import PropTypes from 'prop-types'

const ClientDob = ({ dateOfBirth, sanitizedDob, dob }) => {
  if (dateOfBirth === `<em>${sanitizedDob}</em>`) {
    return (
      <div>
        <span className="client-search-matched-field">{dob.format('M/D/YYYY')}</span>
      </div>
    )
  }
  if (dateOfBirth !== sanitizedDob) {
    return (
      <div>
        {dob.format('M/D/')}
        <span className="client-search-matched-field">{dob.format('YYYY')}</span>
      </div>
    )
  }
  return (
    <div>
      <span>{dob.format('M/D/YYYY')}</span>
    </div>
  )
}

ClientDob.defaultProps = {
  dateOfBirth: '',
  sanitizedDob: '',
  dob: {},
}
ClientDob.propTypes = {
  dateOfBirth: PropTypes.string,
  dob: PropTypes.object,
  sanitizedDob: PropTypes.string,
}
export default ClientDob
