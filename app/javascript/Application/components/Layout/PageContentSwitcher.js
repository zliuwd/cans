import React from 'react'
import { navigation } from '../../util/constants'
import { SupervisorDashboard, CaseLoadPage, CurrentUserCaseLoadPage } from '../Staff'
import { Client } from '../Client'
import AssessmentComparision from '../Client/AssessmentComparision/AssessmentComparision'
import { AssessmentContainer, ChangeLogPage } from '../Assessment'
import { SearchContainer } from '../Search'
import { Row, Col } from 'reactstrap'

const PageContentSwitcher = ({ params, navigateTo, client, staffId }) => {
  const content = () => {
    switch (navigateTo) {
      case navigation.CHILD_LIST:
        return <CurrentUserCaseLoadPage />
      case navigation.CHILD_PROFILE:
        return client && <Client {...params} />

      case navigation.ASSESSMENT_ADD:
        return client && <AssessmentContainer {...params} />
      case navigation.ASSESSMENT_EDIT:
        return client && <AssessmentContainer {...params} />

      case navigation.ASSESSMENT_CHANGELOG:
        return client && <ChangeLogPage {...params} />

      case navigation.CLIENT_SEARCH:
        return <SearchContainer {...params} />
      case navigation.SEARCH_CHILD_PROFILE:
        return client && <Client {...params} />
      case navigation.SEARCH_ASSESSMENT_EDIT:
        return client && <AssessmentContainer {...params} />
      case navigation.SEARCH_ASSESSMENT_ADD:
        return client && <AssessmentContainer {...params} />
      case navigation.SEARCH_CHANGELOG:
        return client && <ChangeLogPage {...params} />

      case navigation.STAFF_LIST:
        return <SupervisorDashboard />
      case navigation.STAFF_READ:
        return <CaseLoadPage staffId={staffId} />
      case navigation.STAFF_CHILD_PROFILE:
        return client && <Client {...params} />
      case navigation.STAFF_ASSESSMENT_EDIT:
        return client && <AssessmentContainer {...params} />
      case navigation.STAFF_ASSESSMENT_ADD:
        return client && <AssessmentContainer {...params} />
      case navigation.STAFF_CHANGELOG:
        return client && <ChangeLogPage {...params} />

      case navigation.COMPARISION:
      console.log('aim')
        return client && <AssessmentComparision {...params} />

      default:
        return null
    }
  }
  return (
    <Row>
      <Col xs="12" role={'main'} id={'main-content'}>
        {content()}
      </Col>
    </Row>
  )
}

export default PageContentSwitcher
