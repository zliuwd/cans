import { globalAlertService } from './GlobalAlertService'
import { createUrl } from './navigationUtil'

const ApiErrorHandler = {
  handleError,
}

const postError = message => {
  globalAlertService.postError({ message })
}

function postErrors(issueDetails) {
  issueDetails.forEach(detail => {
    let message = detail.user_message
    message += detail.incident_id ? ` [Incident id:${detail.incident_id}]` : ''
    postError(message)
  })
}

export const RESPONSE_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
}

function isResponseHandled(response) {
  const responseStatus = response && response.status

  switch (responseStatus) {
    case RESPONSE_CODES.UNAUTHORIZED:
      window.location.reload()
      break
    case RESPONSE_CODES.FORBIDDEN:
      window.location.assign(createUrl('error_page'))
      break
    case RESPONSE_CODES.CONFLICT:
      break
    default:
      const details = response.data && response.data.issue_details
      if (!details) {
        return false
      }
      postErrors(details)
  }

  return true
}

export function handleError(error) {
  const response = error.response
  if (!response || !isResponseHandled(response)) {
    postError(error.message)
  }
  throw error
}

export default ApiErrorHandler
