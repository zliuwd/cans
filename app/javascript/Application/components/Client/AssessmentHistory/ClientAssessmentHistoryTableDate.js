import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ClientAssessmentHistoryTableDate = ({ original }) => {
  const { updated_timestamp: updatedTimestamp, created_timestamp: createdTimestamp } = original
  const timestamp = updatedTimestamp || createdTimestamp
  const formattedTimestamp = moment(timestamp)
    .utcOffset(0)
    .format('MM/DD/YYYY')

  return timestamp ? <div>{formattedTimestamp}</div> : null
}

ClientAssessmentHistoryTableDate.propTypes = {
  original: PropTypes.shape({
    updated_timestamp: PropTypes.string,
    created_timestamp: PropTypes.string,
  }).isRequired,
}

export default ClientAssessmentHistoryTableDate
