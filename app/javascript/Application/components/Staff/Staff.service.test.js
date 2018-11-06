import StaffService from './Staff.service'
import apiEndpoints from '../../App.api'

jest.mock('../../App.api')

describe('StaffService', () => {
  describe('#clients', () => {
    let apiGetSpy

    beforeEach(() => {
      apiGetSpy = jest.spyOn(apiEndpoints, 'apiGet')
    })

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
