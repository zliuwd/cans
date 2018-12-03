import React from 'react'
import PropTypes from 'prop-types'
import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import AssessmentChangeLog from './AssessmentChangeLog'
import { clientPropTypes } from './ChangeLogHelper'

const ChangeLogPage = params => {
  return (
    <ChangeLogLoadingBoundary id={params.match.params.id}>
      <AssessmentChangeLog {...params} />
    </ChangeLogLoadingBoundary>
  )
}

ChangeLogPage.propTypes = {
  client: clientPropTypes.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default ChangeLogPage
