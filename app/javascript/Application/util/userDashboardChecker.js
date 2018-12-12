import { permissions, dashboards } from './constants'

export const userDashboardChecker = user => {
  let dashboard

  const userPermissionChk = permission => {
    return user && user.privileges && user.privileges.includes(permission)
  }

  if (userPermissionChk(permissions.SUBORDINATES_READ)) {
    dashboard = dashboards.STAFF_LIST
  } else if (userPermissionChk(permissions.CLIENTS_READ)) {
    dashboard = dashboards.CHILD_LIST
  } else {
    dashboard = dashboards.CLIENT_SEARCH
  }
  return dashboard
}
