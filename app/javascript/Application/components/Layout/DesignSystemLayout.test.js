import React from 'react'
import { shallow } from 'enzyme'
import DesignSystemLayout from './DesignSystemLayout'
import { navigation } from '../../util/constants'
import { Page, Utils } from '@cwds/components'
import CurrentUserLoadingBoundary from '../pages/CurrentUserLoadingBoundary'
import UserMenu from '../Header/UserMenu'

describe('Design System Layout', () => {
  const render = ({ breadcrumb, children, navigateTo = navigation.CHILD_LIST, rightButton } = {}) =>
    shallow(
      <DesignSystemLayout breadcrumb={breadcrumb} navigateTo={navigateTo} rightButton={rightButton}>
        {children}
      </DesignSystemLayout>
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

  it('renders the rightButton as a cta', () => {
    const rightButton = <div id="my-button" />
    const page = render({ rightButton }).find(Page)

    expect(page.props().cta()).toBe(rightButton)
  })

  it('renders children as main', () => {
    const children = <div id="my-main" />
    const page = render({ children }).find(Page)
    expect(page.props().main()).toBe(children)
  })
})
