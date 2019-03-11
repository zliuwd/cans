import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const StaffNameLink = ({ original, row }) => {
  return row.clients_count && row.clients_count > 0 ? (
    <Link to={`/staff/${original.staff_person.identifier}`}>{row.staffName}</Link>
  ) : (
    row.staffName
  )
}

StaffNameLink.propTypes = {
  original: PropTypes.shape({
    staff_person: PropTypes.shape({
      identifier: PropTypes.string,
    }).isRequired,
  }).isRequired,
  row: PropTypes.shape({
    staffName: PropTypes.string.isRequired,
  }).isRequired,
}

export default StaffNameLink
