import { globalAlertService } from './GlobalAlertService';

const ApiErrorHandler = {
  handleError,
};

const postError = message => {
  globalAlertService.postError({ message });
};

function postErrors(issueDetails) {
  issueDetails.forEach(detail => {
    let message = detail.user_message;
    message += detail.incident_id ? ` [Incident id:${detail.incident_id}]` : '';
    postError(message);
  });
}

export function handleError(error) {
  const errorResponse = error.response;
  if (errorResponse && errorResponse.status === 409) {
    throw error;
  }

  if (errorResponse && errorResponse.data && errorResponse.data.issue_details) {
    postErrors(errorResponse.data.issue_details);
  } else {
    postError(error.message);
  }

  throw error;
}

export default ApiErrorHandler;
