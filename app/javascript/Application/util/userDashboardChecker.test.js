import { permissions, dashboards } from './constants'
import { userDashboardChecker } from './userDashboardChecker'

const supervisor = { privileges: permissions.SUBORDINATES_READ }
const caseWorker = { privileges: permissions.CLIENTS_READ }
const noneCaseWorker = { privileges: 'some-other-permission' }

describe('UserDashboardChecker', () => {
  it('will return supervisor dashboard when user is supervisor', () => {
    expect(userDashboardChecker(supervisor)).toEqual(dashboards.STAFF_LIST)
  })

  it('will return caseWorker dashboard when user is caseWorker', () => {
    expect(userDashboardChecker(caseWorker)).toEqual(dashboards.CHILD_LIST)
  })

  it('will return search dashboard when user is noneCaseWorker', () => {
    expect(userDashboardChecker(noneCaseWorker)).toEqual(dashboards.CLIENT_SEARCH)
  })
})
