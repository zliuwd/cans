import { apiGet } from '../../App.api'

class StaffService {
  static fetch(id) {
    return apiGet(`/staff/${id}`)
  }

  static clients(id) {
    return apiGet(`/staff/${id}/people`)
  }
}

export default StaffService
