import React from 'react'
import { shallow } from 'enzyme'
import CurrentUserCaseLoadPage from './CurrentUserCaseLoadPage'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'
import UserAccountService from '../../common/UserAccountService'
import { LoadingState } from '../../../util/loadingHelper'

jest.mock('../../common/UserAccountService')
jest.mock('../../../util/ApiErrorHandler')

describe('<CurrentUserCaseLoadPage />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<CurrentUserCaseLoadPage />, { disableLifecycleMethods: true })
  })

  it('initial State has waiting LoadingState and no staffId', () => {
    expect(wrapper.instance().state.dataStatus).toBe(LoadingState.waiting)
    expect(wrapper.instance().state.staffId).toEqual(null)
  })

  it('will change loadingState to ready when Component mounted with correct fetching', async () => {
    const userAccountFetchSpy = jest.spyOn(UserAccountService, 'fetchCurrent')
    userAccountFetchSpy.mockReturnValue({ staff_id: '555' })
    await wrapper.instance().componentDidMount()
    expect(wrapper.instance().state).toEqual({ dataStatus: LoadingState.ready, staffId: '555' })
  })

  it('will render ClientList within ClientsLoadingBoundary when ready', async () => {
    wrapper.setState({ dataStatus: LoadingState.ready, staffId: 'ACE' })
    expect(
      wrapper
        .find(ClientsLoadingBoundary)
        .find(ClientListCard)
        .exists()
    ).toBe(true)
    expect(wrapper.find(ClientsLoadingBoundary).props().staffId).toBe('ACE')
  })
})
