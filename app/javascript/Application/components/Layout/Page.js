import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { SideNav } from './'
import { Client, ClientAddEditForm, ClientService } from '../Client'
import BreadCrumbsBuilder from './BreadCrumbsBuilder'
import { navigation, dashboards } from '../../util/constants'
import { AssessmentContainer } from '../Assessment'
import { SearchContainer } from '../Search'
import { SupervisorDashboard, CaseLoadPage, CurrentUserCaseLoadPage } from '../Staff'
import Sticker from 'react-stickyfill'
import UserAccountService from '../common/UserAccountService'
import { logPageAction } from '../../util/analytics'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      client: undefined,
    }
  }

  async componentDidMount() {
    const client = await this.fetchClientIfNeeded()
    const currentUser = await UserAccountService.fetchCurrent()
    await this.setState({ client, isLoaded: true, currentUser: currentUser })
    this.logDashboardVisitToNewRelic()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps === this.props) return
    const client = await this.fetchClientIfNeeded()
    await this.setState({ client })
    this.logDashboardVisitToNewRelic()
  }

  async fetchClientIfNeeded() {
    let client
    const { clientId } = this.props.match.params
    if (clientId) {
      client = await ClientService.fetch(clientId).catch(() => {})
    }
    return client
  }

  logDashboardVisitToNewRelic = () => {
    if (Object.values(dashboards).includes(this.props.navigateTo)) {
      logPageAction('visitDashboard', {
        staff_id: this.state.currentUser.staff_id,
        staff_county: this.state.currentUser.county_name,
        dashboard: this.props.navigateTo,
      })
    }
  }

  renderContent() {
    const params = {
      ...this.props,
      ...this.state,
    }
    switch (this.props.navigateTo) {
      case navigation.CHILD_LIST:
        return <CurrentUserCaseLoadPage />
      case navigation.CHILD_PROFILE:
        return this.state.client && <Client {...params} />
      case navigation.CHILD_PROFILE_ADD:
        return <ClientAddEditForm isNewForm={true} {...params} />
      case navigation.CHILD_PROFILE_EDIT:
        return this.state.client && <ClientAddEditForm isNewForm={false} {...params} />
      case navigation.ASSESSMENT_ADD:
        return this.state.client && <AssessmentContainer isNewForm={true} {...params} />
      case navigation.ASSESSMENT_EDIT:
        return this.state.client && <AssessmentContainer isNewForm={false} {...params} />
      case navigation.CLIENT_SEARCH:
        return <SearchContainer />
      case navigation.STAFF_LIST:
        return <SupervisorDashboard />
      case navigation.STAFF_READ:
        return <CaseLoadPage staffId={this.props.match.params.staffId} />
      default:
        return null
    }
  }

  renderWithSidebar(content) {
    return (
      <Row>
        <Col xs="3">
          <Sticker>
            <SideNav />
          </Sticker>
        </Col>
        <Col xs="9" role={'main'} id={'main-content'}>
          <Row>
            <Col xs="12">{content}</Col>
          </Row>
        </Col>
      </Row>
    )
  }

  renderWithoutSidebar(content) {
    return (
      <Row>
        <Col xs="12" role={'main'} id={'main-content'}>
          <Row>
            <Col xs="12">{content}</Col>
          </Row>
        </Col>
      </Row>
    )
  }

  renderRow() {
    switch (this.props.navigateTo) {
      case navigation.CLIENT_SEARCH:
        return this.renderWithoutSidebar(this.renderContent())
      default:
        return this.renderWithSidebar(this.renderContent())
    }
  }

  render() {
    if (!this.state.isLoaded) return null

    return (
      <Container>
        <BreadCrumbsBuilder navigateTo={this.props.navigateTo} client={this.state.client} />
        {this.renderRow()}
      </Container>
    )
  }
}

Page.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string,
      staffId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
}

Page.defaultProps = {
  history: {},
}

export default Page
