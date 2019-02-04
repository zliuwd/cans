import React from 'react'
import { shallow } from 'enzyme'
import DashboardRedirectPage from './DashboardRedirectPage'
import PermissionRedirect from '../../routes/PermissionRedirect'
import PermissionRedirectBoundary from '../../routes/PermissionRedirectBoundary'

describe('Dashboard Redirect Page', () => {
  it('loads permissions and redirects', () => {
    const page = shallow(<DashboardRedirectPage />)
    expect(page.type()).toEqual(PermissionRedirectBoundary)
    expect(page.find(PermissionRedirect).exists()).toBe(true)
  })
})
