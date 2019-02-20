import React from 'react'
import BreadCrumb, { onBreadCrumbClick } from './BreadCrumb'
import { shallow } from 'enzyme'

describe('bread crumb rendering', () => {
  let breadCrumbComponent
  it('should render "Back to: Dashboard" by default', () => {
    const crumbs = shallow(<BreadCrumb navigationElements={[]} />)
    expect(crumbs.text()).toMatch('Dashboard ')
    const dashboardAnchor = crumbs.find('a')
    expect(dashboardAnchor.length).toEqual(1)
    expect(dashboardAnchor.text()).toEqual('Dashboard')
  })

  it('verify breadCrumb rendering with a single node', () => {
    const props = [
      <a key="" href="/dashboard">
        {' '}
        DASHBOARD
      </a>,
    ]
    breadCrumbComponent = shallow(<BreadCrumb navigationElements={props} />)
    expect(breadCrumbComponent.find('a').length).toEqual(2)
  })

  it('verify breadCrumb rendering with two nodes', () => {
    const props = [
      <a key="" href="/dashboard">
        {' '}
        DASHBOARD
      </a>,
      <a key="" href={'/CANS'}>
        CHILD YOUTH/LIST
      </a>,
    ]
    breadCrumbComponent = shallow(<BreadCrumb navigationElements={props} />)
    expect(breadCrumbComponent.find('a').length).toEqual(3)
  })

  it('verify on click handler is set for dashboard link', () => {
    const props = [
      <a key="" href="/dashboard">
        {' '}
        DASHBOARD
      </a>,
    ]
    breadCrumbComponent = shallow(<BreadCrumb navigationElements={props} />)
    expect(breadCrumbComponent.find('a').get(0).props.onClick).toEqual(onBreadCrumbClick)
  })
})
