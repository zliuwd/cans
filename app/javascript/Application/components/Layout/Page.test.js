import React from 'react'
import { shallow } from 'enzyme'
import { Row, Col } from 'reactstrap'
import { Page, SideNav } from './'
import BreadCrumbsBuilder from './BreadCrumb/BreadCrumbsBuilder'
import { childInfoJson } from '../Client/Client.helper.test'
import { ClientService } from '../Client/Client.service'
import { navigation } from '../../util/constants'
import AssessmentContainer from '../Assessment/AssessmentContainer'
import ClientAddEditForm from '../Client/ClientAddEditForm'
import Client from '../Client/Client'
import SearchContainer from '../Search/SearchContainer'
import { buildSearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import { PageHeader } from '../Header'
import { SupervisorDashboard, CaseLoadPage, CurrentUserCaseLoadPage } from '../Staff'
import * as Analytics from '../../util/analytics'
import UserAccountService from '../common/UserAccountService'

jest.mock('../../util/analytics')
jest.mock('../common/UserAccountService')

const getWrapper = (navigateTo, params = {}) =>
  shallow(<Page match={{ params }} location={{}} navigateTo={navigateTo} />)

describe('<Page />', () => {
  const analyticsSpy = jest.spyOn(Analytics, 'logPageAction')
  const accountServiceSpy = jest.spyOn(UserAccountService, 'fetchCurrent').mockReturnValue({})
  beforeEach(() => {
    analyticsSpy.mockReset()
  })

  describe('layout', () => {
    it('renders with <SideNav /> links', async () => {
      const wrapper = getWrapper(navigation.CHILD_PROFILE)
      await wrapper.instance().componentDidMount()
      const sideNav = wrapper.find(SideNav)
      expect(sideNav.length).toBe(1)
      expect(sideNav.dive().find({ text: 'County Client List' }).length).toBe(1)
      expect(sideNav.dive().find({ text: 'Client Search' }).length).toBe(1)
    })

    it('renders with <BreadCrumbsBuilder /> links', async () => {
      const wrapper = getWrapper(navigation.ASSESSMENT_ADD)
      await wrapper.instance().componentDidMount()
      const breadCrumbsBuilder = wrapper.find(BreadCrumbsBuilder)

      expect(breadCrumbsBuilder.length).toBe(1)
    })

    it('splits sidebar and main content 3:9', async () => {
      const wrapper = getWrapper(navigation.CHILD_PROFILE)
      await wrapper.instance().componentDidMount()
      const cols = wrapper.find(Row).find(Col)
      const sideCol = cols.at(0)
      const mainCol = cols.at(1)

      expect(sideCol.props().xs).toEqual('3')
      expect(sideCol.find(SideNav).exists()).toEqual(true)
      expect(mainCol.props().xs).toEqual('9')
      expect(mainCol.props().role).toEqual('main')
    })

    describe('<PageHeader />', () => {
      it('should render PageHeader', () => {
        const page = getWrapper(navigation.ASSESSMENT_ADD)
        page.instance().setState({ isLoaded: true })
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

    describe('client search page', () => {
      it('renders main content 12 columns wide', async () => {
        const wrapper = getWrapper(navigation.CLIENT_SEARCH)
        await wrapper.instance().componentDidMount()
        const cols = wrapper.find(Row).find(Col)
        const mainCol = cols.at(0)

        expect(mainCol.props().xs).toEqual('12')
        expect(mainCol.props().role).toEqual('main')
      })
    })
  })

  describe('when adding Assessment', () => {
    it('renders < AssessmentContainer on Add/>', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.ASSESSMENT_ADD, {
        clientId: '1001',
      })
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(AssessmentContainer).length).toBe(1)
    })

    it('renders Add content 12 columns wide', async () => {
      const wrapper = getWrapper(navigation.ASSESSMENT_ADD)
      await wrapper.instance().componentDidMount()
      const cols = wrapper.find(Row).find(Col)
      const mainCol = cols.at(0)

      expect(mainCol.props().xs).toEqual('12')
      expect(mainCol.props().role).toEqual('main')
    })

    it('renders < AssessmentContainer on Edit />', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.ASSESSMENT_EDIT, {
        clientId: '1001',
      })
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(AssessmentContainer).length).toBe(1)
    })

    it('renders Edit content 12 columns wide', async () => {
      const wrapper = getWrapper(navigation.ASSESSMENT_EDIT)
      await wrapper.instance().componentDidMount()
      const cols = wrapper.find(Row).find(Col)
      const mainCol = cols.at(0)

      expect(mainCol.props().xs).toEqual('12')
      expect(mainCol.props().role).toEqual('main')
    })

    it('renders < ClientAddEditForm for Edit Profile/>', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.CHILD_PROFILE_EDIT, {
        clientId: '1001',
      })
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(ClientAddEditForm).length).toBe(1)
    })

    it('renders < ClientAddEditForm for Add CANS/>', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.CHILD_PROFILE_ADD, {
        clientId: '1001',
      })
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(ClientAddEditForm).length).toBe(1)
    })

    it('renders < Client />', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.CHILD_PROFILE, { clientId: '1001' })
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(Client).length).toBe(1)
    })
  })

  describe('when Supervisor logs in', () => {
    it('renders <SupervisorDashboard /> when navigated to', async () => {
      const wrapper = shallow(<Page match={{ params: {} }} location={{}} navigateTo={navigation.STAFF_LIST} />)
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(SupervisorDashboard).exists()).toBe(true)
    })

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
    it('renders <CurrentUserCaseLoadPage /> when navigated to', async () => {
      const wrapper = shallow(<Page match={{ params: {} }} location={{}} navigateTo={navigation.CHILD_LIST} />)
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(CurrentUserCaseLoadPage).exists()).toBe(true)
    })

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

  it('renders <CaseLoadPage /> when navigated to', async () => {
    const wrapper = shallow(
      <Page match={{ params: { staffId: '101' } }} location={{}} navigateTo={navigation.STAFF_READ} />
    )
    await wrapper.instance().componentDidMount()
    expect(wrapper.find(CaseLoadPage).exists()).toBe(true)
  })

  describe('when searching for clients', () => {
    it('renders < SearchContainer />', async () => {
      jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
      const wrapper = getWrapper(navigation.CLIENT_SEARCH)
      await wrapper.instance().componentDidMount()
      expect(wrapper.find(SearchContainer).length).toBe(1)
    })

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
