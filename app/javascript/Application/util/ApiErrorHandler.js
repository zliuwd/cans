import { globalAlertService } from './GlobalAlertService'
import { StatusCode } from './constants'

export const forbiddenMessage = "You don't have appropriate permissions to view this record"

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

function isResponseHandled(response) {
  const responseStatus = response && response.status

  switch (responseStatus) {
    case StatusCode.UNAUTHORIZED:
      window.location.reload()
      break
    case StatusCode.FORBIDDEN:
      postError(forbiddenMessage)
      break
    case StatusCode.CONFLICT:
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
