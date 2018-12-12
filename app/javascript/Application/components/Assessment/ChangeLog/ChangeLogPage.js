import React from 'react'

import ChangeLogLoadingBoundary from './ChangeLogLoadingBoundary'
import AssessmentChangeLog from './AssessmentChangeLog'
import { clientPropTypes, changeLogPagePropType } from './ChangeLogHelper'

const ChangeLogPage = params => {
  return (
    <ChangeLogLoadingBoundary id={params.match.params.id}>
      <AssessmentChangeLog {...params} />
    </ChangeLogLoadingBoundary>
  )
}

ChangeLogPage.propTypes = {
  client: clientPropTypes.isRequired,
  match: changeLogPagePropType.isRequired,
}

export default ChangeLogPage
