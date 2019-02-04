import React from 'react'
import { shallow } from 'enzyme'
import { Container, Col, Row } from 'reactstrap'
import Sticker from 'react-stickyfill'
import ReactWoodDuckLayout from './ReactWoodDuckLayout'
import { PageHeader } from '../Header'
import { navigation } from '../../util/constants'
import { GlobalAlert } from '../common'

describe('ReactWoodDuckLayout', () => {
  const render = ({
    breadcrumb = null,
    children = null,
    navigateTo = navigation.CHILD_LIST,
    rightButton = null,
  } = {}) =>
    shallow(
      <ReactWoodDuckLayout breadcrumb={breadcrumb} navigateTo={navigateTo} rightButton={rightButton}>
        {children}
      </ReactWoodDuckLayout>
    )

  const findBreadcrumbContainer = page => page.find(Sticker).find('.sticky.breadcrumb-container')

  const findBody = page =>
    page
      .find(Container)
      .find(Row)
      .find(Col)

  it('has a PageHeader', () => {
    const page = render()
    expect(page.find(PageHeader).exists()).toBe(true)
  })

  it('renders the rightButton in the PageHeader', () => {
    const rightButton = <div id="my-div" />
    const page = render({ rightButton })
    expect(page.find(PageHeader).props().rightButton).toBe(rightButton)
  })

  it('has a sticky breadcrumb container', () => {
    const page = render()
    const breadcrumbContainer = findBreadcrumbContainer(page)
    expect(breadcrumbContainer.exists()).toBe(true)
  })

  it('renders the breadcrumb in the breadcrumb container', () => {
    const breadcrumb = <div id="my-div" />
    const page = render({ breadcrumb })
    const breadcrumbContainer = findBreadcrumbContainer(page)
    expect(breadcrumbContainer.props().children).toContain(breadcrumb)
  })

  it('renders global alerts', () => {
    const page = render()
    const breadcrumbContainer = findBreadcrumbContainer(page)
    expect(breadcrumbContainer.find(GlobalAlert).length).toBe(2)
  })

  it('has a body', () => {
    const page = render()
    const body = findBody(page)
    expect(body.props().xs).toBe('12')
    expect(body.props().role).toBe('main')
    expect(body.props().id).toBe('main-content')
  })

  it('renders the children in the body', () => {
    const children = <div id="my-div" />
    const page = render({ children })
    const body = findBody(page)
    expect(body.props().children).toBe(children)
  })
})
