import React from 'react'
import { shallow } from 'enzyme'
import { Page } from './'
import BreadCrumbsBuilder from './BreadCrumb/BreadCrumbsBuilder'
import { ClientService } from '../Client/Client.service'
import { navigation } from '../../util/constants'
import { buildSearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import { PageHeader } from '../Header'
import * as Analytics from '../../util/analytics'
import UserAccountService from '../common/UserAccountService'
import StaffService from '../Staff/Staff.service'
import PageContentSwitcher from './PageContentSwitcher'

jest.mock('../../util/analytics')
jest.mock('../common/UserAccountService')

const getWrapper = (navigateTo, params = {}) =>
  shallow(<Page match={{ params }} location={{}} navigateTo={navigateTo} />)

describe('methods test', () => {
  let wrapper
  const fakeClient = { client: '202' }
  const fakeStaff = { staffId: '101' }

  beforeEach(() => {
    jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(fakeClient))
    jest.spyOn(StaffService, 'fetch').mockReturnValue(Promise.resolve(fakeStaff))
    wrapper = shallow(
      <Page
        match={{ params: { staffId: '0X5', clientId: 'AdE0PWu0X5' } }}
        client={{ clientId: '1001' }}
        staffId="101"
        location={{}}
        navigateTo={navigation.CHILD_LIST}
      />
    )
  })

  it('will fetch client when have clientId', async () => {
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().client).toEqual(fakeClient)
  })

  it('will fetch Subordinate when have staffId', async () => {
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().subordinate).toEqual(fakeStaff)
  })

  it('will invoke fetch client,fetch Subordinate, and NewRelic when update', async () => {
    wrapper.instance().fetchClientIfNeeded = jest.fn()
    wrapper.instance().fetchSubordinateIfNeeded = jest.fn()
    wrapper.instance().logDashboardVisitToNewRelic = jest.fn()
    await wrapper.instance().componentDidUpdate()
    wrapper.update()
    expect(wrapper.instance().fetchClientIfNeeded).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().fetchSubordinateIfNeeded).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().logDashboardVisitToNewRelic).toHaveBeenCalledTimes(1)
  })
})

describe('<Page />', () => {
  const analyticsSpy = jest.spyOn(Analytics, 'logPageAction')
  const accountServiceSpy = jest.spyOn(UserAccountService, 'fetchCurrent').mockReturnValue({})
  beforeEach(() => {
    analyticsSpy.mockReset()
  })

  describe('layout', () => {
    it('renders with <BreadCrumbsBuilder /> links', async () => {
      const wrapper = getWrapper(navigation.ASSESSMENT_ADD)
      await wrapper.instance().componentDidMount()
      const breadCrumbsBuilder = wrapper.find(BreadCrumbsBuilder)

      expect(breadCrumbsBuilder.length).toBe(1)
    })

    it('renders PageContentSwitcher', async () => {
      const wrapper = getWrapper(navigation.CHILD_PROFILE)
      await wrapper.instance().componentDidMount()
      const content = wrapper.find(PageContentSwitcher)

      expect(content.length).toEqual(1)
    })

    describe('<PageHeader />', () => {
      it('should render PageHeader', () => {
        const page = getWrapper(navigation.ASSESSMENT_ADD)
        const user = {
          first_name: 'Anna',
          last_name: 'Smith',
          county_name: 'Ventura',
          privileges: ['CWS Case Management System'],
          staff_id: '0X5',
        }
        page.instance().setState({ isLoaded: true, currentUser: user })
        const pageHeaderProps = page.find(PageHeader).props()
        expect(pageHeaderProps.leftButton).toBe(null)
        expect(pageHeaderProps.rightButton).toEqual(buildSearchClientsButton())
        expect(pageHeaderProps.navigateTo).toEqual(navigation.ASSESSMENT_ADD)
      })

      it('should have default header buttons initially', () => {
        const page = getWrapper(navigation.ASSESSMENT_ADD)
        const header = page.state().header
        expect(header.leftButton).toBe(null)
        expect(header.rightButton).toEqual(buildSearchClientsButton())
      })

      describe('#updateHeaderButtons()', () => {
        it('should update header buttons', () => {
          const page = getWrapper(navigation.ASSESSMENT_ADD)
          const leftButton = <div className={'button-left'} />
          const rightButton = <div className={'button-right'} />
          page.instance().updateHeaderButtons(leftButton, rightButton)
          const header = page.state().header
          expect(header.leftButton).toBe(leftButton)
          expect(header.rightButton).toBe(rightButton)
        })
      })

      describe('#updateHeaderButtonsToDefault()', () => {
        it('should update header buttons to default values', () => {
          const page = getWrapper(navigation.ASSESSMENT_ADD)
          const leftButton = <div className={'button-left'} />
          const rightButton = <div className={'button-right'} />
          page.instance().updateHeaderButtons(leftButton, rightButton)
          page.instance().updateHeaderButtonsToDefault(leftButton, rightButton)
          const header = page.state().header
          expect(header.leftButton).toBe(null)
          expect(header.rightButton).toBe(buildSearchClientsButton())
        })
      })
    })
  })

  describe('when Supervisor logs in', () => {
    it('logs Supervisor dashboard visit to New Relic', async () => {
      const wrapper = shallow(<Page match={{ params: {} }} location={{}} navigateTo={navigation.STAFF_LIST} />)
      await wrapper.instance().componentDidMount()
      expect(analyticsSpy).toHaveBeenCalledWith('visitDashboard', {
        staff_id: accountServiceSpy.staff_id,
        staff_county: accountServiceSpy.county_name,
        dashboard: 'STAFF_LIST',
      })
    })
  })

  describe('when case worker logs in', () => {
    it('logs CaseWorker dashboard visit to New Relic', async () => {
      const wrapper = shallow(<Page match={{ params: {} }} location={{}} navigateTo={navigation.CHILD_LIST} />)
      await wrapper.instance().componentDidMount()
      expect(analyticsSpy).toHaveBeenCalledWith('visitDashboard', {
        staff_id: accountServiceSpy.staff_id,
        staff_county: accountServiceSpy.county_name,
        dashboard: 'CHILD_LIST',
      })
    })
  })

  describe('when searching for clients', () => {
    it('logs Search dashboard visit to New Relic', async () => {
      const wrapper = getWrapper(navigation.CLIENT_SEARCH)
      await wrapper.instance().componentDidMount()
      expect(analyticsSpy).toHaveBeenCalledWith('visitDashboard', {
        staff_id: accountServiceSpy.staff_id,
        staff_county: accountServiceSpy.county_name,
        dashboard: 'CLIENT_SEARCH',
      })
    })
  })
})
