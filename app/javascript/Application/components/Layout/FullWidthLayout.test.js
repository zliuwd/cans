import React from 'react'
import { shallow } from 'enzyme'
import FullWidthLayout from './FullWidthLayout'
import { navigation } from '../../util/constants'
import { Page, Utils } from '@cwds/components'
import CurrentUserLoadingBoundary from '../common/CurrentUserLoadingBoundary'
import { GlobalAlert } from '../common'
import UserMenu from '../Header/UserMenu'

describe('FullWidthLayout', () => {
  const render = ({ breadcrumb, children, leftButton, navigateTo = navigation.CHILD_LIST, rightButton } = {}) =>
    shallow(
      <FullWidthLayout
        breadcrumb={breadcrumb}
        leftButton={leftButton}
        navigateTo={navigateTo}
        rightButton={rightButton}
      >
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
    expect(render().type()).toBe(Utils.CaresProvider)
  })

  it('renders the breadcrumb', () => {
    const breadcrumb = <div id="my-breadcrumb" />
    const wrapper = render({ breadcrumb })
    const provider = wrapper.find(Utils.CaresProvider)
    const page = provider.find(Page)

    expect(provider.props().value.breadcrumbRenderer(page.props().breadcrumb)).toBe(breadcrumb)
  })

  describe('title', () => {
    it('is "CANS Communimetric Assessment Form" when new assessment page', () => {
      const wrapper = render({ navigateTo: navigation.ASSESSMENT_ADD })
      expect(wrapper.find(Page).props().title).toEqual('CANS Communimetric Assessment Form')
    })

    it('should send "CANS Communimetric Assessment Form" title when existent assessment page', () => {
      const wrapper = render({ navigateTo: navigation.ASSESSMENT_EDIT })
      expect(wrapper.find(Page).props().title).toEqual('CANS Communimetric Assessment Form')
    })

    it('should send default title for other pages', () => {
      const wrapper = render({ navigateTo: navigation.CLIENT_SEARCH })
      expect(wrapper.find(Page).props().title).toEqual('CANS Assessment Application')
    })
  })

  it('renders a UserMenu inside a LoadingBoundary', () => {
    const context = render().props().value
    const appBarUserMenu = context.appBarUserMenu()
    expect(appBarUserMenu.type).toBe(CurrentUserLoadingBoundary)
    expect(appBarUserMenu.props.children.type).toBe(UserMenu)
  })

  it('renders the leftButton as a cta', () => {
    const leftButton = <div id="my-button" />
    const page = render({ leftButton }).find(Page)
    const cta = page.props().cta()

    expect(cta.props.children).toContain(leftButton)
  })

  it('renders the rightButton as a cta', () => {
    const rightButton = <div id="my-button" />
    const page = render({ rightButton }).find(Page)
    const cta = page.props().cta()

    expect(cta.props.children).toContain(rightButton)
  })

  it('can render both buttons at once', () => {
    const leftButton = <div id="my-left-button" />
    const rightButton = <div id="my-right-button" />
    const page = render({ leftButton, rightButton }).find(Page)
    const cta = page.props().cta()

    expect(cta.props.children).toContain(leftButton)
    expect(cta.props.children).toContain(rightButton)
  })

  it('renders global alerts above main children', () => {
    const children = <div id="my-main" />
    const page = render({ children }).find(Page)
    const mainChildren = page.props().main.props.children

    const firstGlobalAlertIndex = mainChildren.findIndex(
      el => el && el.type === GlobalAlert && el.props.id === undefined
    )
    const secondGlobalAlertIndex = mainChildren.findIndex(
      el => el && el.type === GlobalAlert && el.props.id === 'infoMessages'
    )
    const childrenIndex = mainChildren.findIndex(el => el === children)

    expect(firstGlobalAlertIndex).not.toBe(-1)
    expect(secondGlobalAlertIndex).not.toBe(-1)
    expect(firstGlobalAlertIndex).toBeLessThan(childrenIndex)
    expect(secondGlobalAlertIndex).toBeLessThan(childrenIndex)
  })

  it('renders children as main', () => {
    const children = <div id="my-main" />
    const page = render({ children }).find(Page)
    expect(page.props().main.props.children).toContain(children)
  })
})
