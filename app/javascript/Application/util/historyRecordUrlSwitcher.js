import { navigation } from './constants'

export function historyRecordUrlSwitcher(navFrom, userId, clientId, assessmentId) {
  let url
  switch (navFrom) {
    case navigation.STAFF_CHILD_PROFILE:
      url = `/staff/${userId}/clients/${clientId}/assessments/${assessmentId}`
      break
    case navigation.SEARCH_CHILD_PROFILE:
      url = `/search/clients/${clientId}/assessments/${assessmentId}`
      break
    case navigation.CLIENT_SEARCH:
      url = `search/clients/${clientId}/assessments/${assessmentId}`
      break
    default:
      url = `/clients/${clientId}/assessments/${assessmentId}`
  }
  return url
}
