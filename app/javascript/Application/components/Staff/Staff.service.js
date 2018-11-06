import { apiGet } from '../../App.api'

class StaffService {
  static clients(id) {
    return apiGet(`/staff/${id}/people`)
  }
}

export default StaffService
