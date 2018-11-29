import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ChangeLogBoundary from './ChangeLogBoundary'
import AssessmentChangeLog from './AssessmentChangeLog'
import { clientPropTypes } from './ChangeLogHelper'

const ChangeLogPage = params => {
  return (
    <Fragment>
      <ChangeLogBoundary id={params.match.params.id}>
        <AssessmentChangeLog {...params} />
      </ChangeLogBoundary>
    </Fragment>
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
