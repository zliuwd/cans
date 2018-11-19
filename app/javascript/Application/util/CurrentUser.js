import UserAccountService from '../components/common/UserAccountService'
import { permissions } from './constants'
async function isSupervisor() {
  const currentUser = await UserAccountService.fetchCurrent()
  return (currentUser.privileges || []).includes(permissions.SUBORDINATES_READ)
}

export const CurrentUser = {
  isSupervisor,
}

export default CurrentUser
