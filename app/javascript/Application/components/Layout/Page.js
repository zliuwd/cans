import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import { ClientService } from '../Client'
import { StaffService } from '../Staff'
import BreadCrumbsBuilder from './BreadCrumb/BreadCrumbsBuilder'
import { navigation, dashboards } from '../../util/constants'
import UserAccountService from '../common/UserAccountService'
import { logPageAction } from '../../util/analytics'
import { PageHeader } from '../Header'
import { buildSearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import PageContentSwitcher from './PageContentSwitcher'
import Sticker from 'react-stickyfill'
import './style.sass'

const defaultHeaderButtons = {
  leftButton: null,
  rightButton: buildSearchClientsButton(),
}

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      client: undefined,
      subordinate: undefined,
      header: defaultHeaderButtons,
    }
  }

  async componentDidMount() {
    await this.fetchBoth()
    await this.fetchuser()
    this.logDashboardVisitToNewRelic()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps === this.props) return
    await this.fetchBoth()
    this.logDashboardVisitToNewRelic()
  }

  async fetchuser() {
    const user = await UserAccountService.fetchCurrent()
    this.setState({ isLoaded: true, currentUser: user })
  }

  async fetchBoth() {
    const clientPromise = this.fetchClientIfNeeded()
    const subordinatePromise = this.fetchSubordinateIfNeeded()
    Promise.all([clientPromise, subordinatePromise]).then(([client, subordinate]) =>
      this.setState({
        client,
        subordinate,
      })
    )
  }

  async fetchClientIfNeeded() {
    let client
    const { clientId } = this.props.match.params
    if (clientId) {
      client = await ClientService.fetch(clientId).catch(() => {})
    }
    return client
  }

  async fetchSubordinateIfNeeded() {
    let subordinate
    const { staffId } = this.props.match.params
    if (staffId) {
      subordinate = await StaffService.fetch(staffId).catch(() => {})
    }
    return subordinate
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

  updateHeaderButtons = (leftButton, rightButton) => {
    this.setState({ header: { leftButton, rightButton } })
  }

  updateHeaderButtonsToDefault = () => {
    this.setState({ header: defaultHeaderButtons })
  }

  render() {
    const params = {
      ...this.props,
      ...this.state,
      pageHeaderButtonsController: {
        updateHeaderButtons: this.updateHeaderButtons,
        updateHeaderButtonsToDefault: this.updateHeaderButtonsToDefault,
      },
    }
    const { isLoaded, header } = this.state
    if (!isLoaded) return null
    return (
      <Fragment>
        <PageHeader
          navigateTo={this.props.navigateTo}
          leftButton={header.leftButton}
          rightButton={header.rightButton}
        />

        <Container>
          <Sticker>
            <div className="breadcrumb-container">
              <BreadCrumbsBuilder
                navigateTo={this.props.navigateTo}
                client={this.state.client}
                url={this.props.match.url}
                assessmentId={this.props.match.params.id}
                user={this.state.currentUser}
                subordinate={this.state.subordinate}
              />
            </div>
          </Sticker>

          <PageContentSwitcher
            params={params}
            navigateTo={this.props.navigateTo}
            client={this.state.client}
            staffId={this.props.match.params.staffId}
          />
        </Container>
      </Fragment>
    )
  }
}

Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string,
      id: PropTypes.string,
      staffId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string,
  }).isRequired,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
}

export default Page
