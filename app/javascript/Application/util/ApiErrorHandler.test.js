import { globalAlertService } from './GlobalAlertService';
import { handleError } from './ApiErrorHandler';

describe('ApiErrorHandler', () => {
  describe('with a single error with incident id', () => {
    const error = {
      response: {
        data: {
          issue_details: [
            {
              incident_id: 'a1',
              user_message: 'User Message',
            },
          ],
        },
      },
    };

    it('sets a error message with attached incident id', () => {
      let message;
      let isErrorThrowed = false;
      globalAlertService.subscribe(e => {
        message = e.message;
      });
      try {
        handleError(error);
      } catch (e) {
        isErrorThrowed = true;
      }

      expect(message).toEqual('User Message [Incident id:a1]');
      expect(isErrorThrowed).toEqual(true);
    });
  });

  it('Handles multiple issue details', () => {
    const error = {
      response: {
        data: {
          issue_details: [
            {
              incident_id: 'a1',
              user_message: 'User Message',
            },
            {
              incident_id: 'a1',
              user_message: 'User Message 2',
            },
          ],
        },
      },
    };

    let messages = [];
    let isErrorThrowed = false;
    globalAlertService.subscribe(e => messages.push(e.message));
    try {
      handleError(error);
    } catch (e) {
      isErrorThrowed = true;
    }
    expect(messages.length).toEqual(2);
    expect(isErrorThrowed).toEqual(true);
  });

  it('Handles undefined issue details (not api error response)', () => {
    const error = {
      message: 'Error message',
      response: {},
    };

    let messages = [];
    let isErrorThrowed = false;
    globalAlertService.subscribe(e => messages.push(e.message));
    try {
      handleError(error);
    } catch (e) {
      isErrorThrowed = true;
    }
    expect(messages.length).toEqual(1);
    expect(messages[0]).toEqual('Error message');
    expect(isErrorThrowed).toEqual(true);
  });

  it('Handles empty error', () => {
    const error = {};

    let messages = [];
    let isErrorThrowed = false;
    globalAlertService.subscribe(e => messages.push(e.message));
    try {
      handleError(error);
    } catch (e) {
      isErrorThrowed = true;
    }
    expect(messages.length).toEqual(1);
    expect(isErrorThrowed).toEqual(true);
  });
});
