import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ChangeLogDate = ({ original }) => {
  const formattedChangedAt = moment(original.changed_at)
    .utcOffset(0)
    .format('MM/DD/YYYY h:mm:ss A')

  return original.changed_at ? <div>{formattedChangedAt}</div> : null
}

ChangeLogDate.propTypes = {
  original: PropTypes.shape({
    changed_at: PropTypes.string,
  }).isRequired,
}

export default ChangeLogDate
