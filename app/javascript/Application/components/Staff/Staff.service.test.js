import StaffService from './Staff.service'
import apiEndpoints from '../../App.api'

jest.mock('../../App.api')

describe('StaffService', () => {
  const apiGetSpy = jest.spyOn(apiEndpoints, 'apiGet')

  beforeEach(() => {
    apiGetSpy.mockReset()
  })

  describe('#fetch', () => {
    it('returns Staff data by id', async () => {
      const staffId = '0X5'
      const mockStaffData = { id: staffId, name: 'test user' }
      apiGetSpy.mockReturnValue(mockStaffData)
      const staffData = await StaffService.fetch(staffId)
      expect(staffData).toBe(mockStaffData)
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      expect(apiGetSpy).toHaveBeenCalledWith(`/staff/${staffId}`)
    })
  })

  describe('#clients', () => {
    it('returns client data for social worker 0X5', async () => {
      const id = '0X5'
      const mockClientData = { id: 15000, name: 'test client' }
      apiGetSpy.mockReturnValue(mockClientData)
      const clientData = await StaffService.clients(id)
      expect(clientData).toBe(mockClientData)
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      expect(apiGetSpy).toHaveBeenCalledWith(`/staff/${id}/people`)
    })
  })
})
