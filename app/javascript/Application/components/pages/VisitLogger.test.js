import React from 'react'
import { shallow } from 'enzyme'
import VisitLogger from './VisitLogger'
import * as Analytics from '../../util/analytics'
jest.mock('../../util/analytics')

describe('VisitLogger', () => {
  const analyticsSpy = jest.spyOn(Analytics, 'logPageAction')

  beforeEach(() => {
    analyticsSpy.mockReset()
  })

  it('logs page actions on mount', async () => {
    const user = { staff_id: 'RMI', county_name: 'Orange' }
    const wrapper = shallow(<VisitLogger user={user} dashboard="Paradise" />, { disableLifecycleMethods: true })
    expect(analyticsSpy).not.toHaveBeenCalled()
    await wrapper.instance().componentDidMount()
    expect(analyticsSpy).toHaveBeenCalledWith('visitDashboard', {
      staff_id: 'RMI',
      staff_county: 'Orange',
      dashboard: 'Paradise',
    })
  })

  it('does nothing if user failed to load', async () => {
    const user = undefined
    const wrapper = shallow(<VisitLogger user={user} dashboard="Paradise" />, { disableLifecycleMethods: true })
    expect(analyticsSpy).not.toHaveBeenCalled()
    await wrapper.instance().componentDidMount()
    expect(analyticsSpy).not.toHaveBeenCalled()
  })
})
