import UserAccountService from '../components/common/UserAccountService'

async function isSupervisor() {
  const currentUser = await UserAccountService.fetchCurrent()
  return (currentUser.roles || []).includes('Supervisor')
}

export const CurrentUser = {
  isSupervisor,
}

export default CurrentUser
