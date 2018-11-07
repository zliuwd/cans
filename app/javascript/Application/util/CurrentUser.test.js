import CurrentUser from './CurrentUser'
import UserAccountService from '../components/common/UserAccountService'

jest.mock('../components/common/UserAccountService')

describe('CurrentUser', () => {
  const fetchCurrentSpy = jest.spyOn(UserAccountService, 'fetchCurrent')

  beforeEach(() => {
    fetchCurrentSpy.mockReset()
  })

  describe('#isSupervisor()', () => {
    it('returns true when current user is a supervisor', async () => {
      fetchCurrentSpy.mockReturnValue(Promise.resolve({ roles: ['SomeRole', 'Supervisor'] }))
      expect(await CurrentUser.isSupervisor()).toBeTruthy()
    })

    it('returns false when current user is not a supervisor', async () => {
      fetchCurrentSpy.mockReturnValue(Promise.resolve({ roles: ['SomeRole'] }))
      expect(await CurrentUser.isSupervisor()).toBeFalsy()
    })

    it('returns false when roles list is undefined', async () => {
      fetchCurrentSpy.mockReturnValue(Promise.resolve({}))
      expect(await CurrentUser.isSupervisor()).toBeFalsy()
    })
  })
})
