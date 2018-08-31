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
  if (error.response && error.response.data && error.response.data.issue_details) {
    postErrors(error.response.data.issue_details);
  } else {
    postError(error.message);
  }
  throw error;
}

export default ApiErrorHandler;
