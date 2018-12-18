import React from 'react'

import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import AssessmentChangeLog from './AssessmentChangeLog'
import { changeLogMatchPropTypes } from './ChangeLogHelper'

const ChangeLogPage = params => (
  <ChangeLogLoadingBoundary id={params.match.params.id}>
    <AssessmentChangeLog {...params} />
  </ChangeLogLoadingBoundary>
)

ChangeLogPage.propTypes = {
  match: changeLogMatchPropTypes.isRequired,
}

export default ChangeLogPage
