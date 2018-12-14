import React, { Component } from 'react'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import UserAccountService from '../../common/UserAccountService'
import { LoadingState } from '../../../util/loadingHelper'
import ClientSocialWorkerCard from '../../Client/ClientSocialWorkerCard'

const initialState = {
  staffId: null,
  dataStatus: LoadingState.waiting,
}

class CurrentUserCaseLoadPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
  }

  async componentDidMount() {
    this.fetchUserInfo()
  }

  fetchUserInfo = async () => {
    const user = await UserAccountService.fetchCurrent()
    this.setState({
      dataStatus: LoadingState.ready,
      staffId: user.staff_id,
    })
  }

  render = () => {
    return this.state.dataStatus === LoadingState.ready ? (
      <ClientsLoadingBoundary staffId={this.state.staffId}>
        <ClientSocialWorkerCard />
      </ClientsLoadingBoundary>
    ) : null
  }
}

export default CurrentUserCaseLoadPage
