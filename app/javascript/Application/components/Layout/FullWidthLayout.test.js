import React from 'react'
import { shallow } from 'enzyme'
import FullWidthLayout from './FullWidthLayout'
import { CaresProvider, Page } from '@cwds/components'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { GlobalAlert } from '../common'
import UserMenu from '../Header/UserMenu'
import Sticker from 'react-stickyfill'

describe('FullWidthLayout', () => {
  const render = ({ breadcrumb, children, pageTitle, leftButton, rightButton } = {}) =>
    shallow(
      <FullWidthLayout breadcrumb={breadcrumb} pageTitle={pageTitle} leftButton={leftButton} rightButton={rightButton}>
        {children}
      </FullWidthLayout>
    )

  it('renders a component library Page', () => {
    expect(
      render()
        .find(Page)
        .exists()
    ).toBe(true)
  })

  it('renders its own CaresProvider', () => {
    expect(render().type()).toBe(CaresProvider)
  })

  it('renders the breadcrumb', () => {
    const breadcrumb = <div id="my-breadcrumb" />
    const wrapper = render({ breadcrumb })
    const provider = wrapper.find(CaresProvider)
    const page = provider.find(Page)

    expect(page.props().Breadcrumb).toBe(breadcrumb)
  })

  describe('title', () => {
    it('sends "CANS Assessment Application" title to Page component by default', () => {
      const wrapper = render()
      expect(wrapper.find(Page).props().title).toEqual('CANS Assessment Application')
    })

    it('sends pageTitle to Page component as title', () => {
      const wrapper = render({ pageTitle: 'Page Title' })
      expect(wrapper.find(Page).props().title).toEqual('Page Title')
    })
  })

  it('renders a UserMenu inside a LoadingBoundary', () => {
    const userMenu = render().props().UserMenu
    expect(userMenu.type).toBe(CurrentUserLoadingBoundary)
    expect(userMenu.props.children.type).toBe(UserMenu)
  })

  it('renders the leftButton as a PageActions', () => {
    const leftButton = <div id="my-button" />
    const page = render({ leftButton }).find(Page)
    const pageActions = page.props().PageActions()

    expect(pageActions.props.children).toContain(leftButton)
  })

  it('renders the rightButton as a PageActions', () => {
    const rightButton = <div id="my-button" />
    const page = render({ rightButton }).find(Page)
    const pageActions = page.props().PageActions()

    expect(pageActions.props.children).toContain(rightButton)
  })

  it('can render both buttons at once', () => {
    const leftButton = <div id="my-left-button" />
    const rightButton = <div id="my-right-button" />
    const page = render({ leftButton, rightButton }).find(Page)
    const pageActions = page.props().PageActions()

    expect(pageActions.props.children).toContain(leftButton)
    expect(pageActions.props.children).toContain(rightButton)
  })

  it('renders global alerts above main children', () => {
    const children = <div id="my-main" />
    const page = render({ children }).find(Page)
    const mainChildren = page.props().main.props.children

    const pageAlertsIndex = mainChildren.findIndex(el => el && el.type === Sticker)
    const pageAlerts = mainChildren[pageAlertsIndex].props.children
    const childrenIndex = mainChildren.findIndex(el => el === children)

    expect(pageAlerts.props.children[0].type).toBe(GlobalAlert)
    expect(pageAlerts.props.children[1].type).toBe(GlobalAlert)
    expect(pageAlerts.props.children[1].props.id).toBe('infoMessages')
    expect(pageAlertsIndex).toBeLessThan(childrenIndex)
  })

  it('renders children as main', () => {
    const children = <div id="my-main" />
    const page = render({ children }).find(Page)
    expect(page.props().main.props.children).toContain(children)
  })
})
