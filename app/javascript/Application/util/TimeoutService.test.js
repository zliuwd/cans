import { timeoutService } from './TimeoutService';

describe('TimeoutService', () => {
  it('window reloads when timeout cookie is not present', () => {
    global.location = jest.fn();
    global.setTimeout = jest.fn();
    global.location.reload = jest.fn();
    timeoutService.run();
    expect(global.location.reload).toBeCalled();
    expect(global.setTimeout).not.toHaveBeenCalled();
  });

  it('timeout check is schedulled when timeout cookie is present', () => {
    global.location = jest.fn();
    jest.useFakeTimers();
    global.location.reload = jest.fn();
    const interval = 5000;
    const timeout = new Date().getTime() + interval;
    global.document.cookie = '_ca_cans_timeout=' + timeout;
    timeoutService.run();
    const minInterval = interval - timeout - new Date().getTime();
    expect(global.location.reload).not.toBeCalled();
    expect(global.setTimeout.mock.calls[0][1]).not.toBeLessThan(minInterval);
    expect(global.setTimeout.mock.calls[0][1]).not.toBeGreaterThan(interval);
  });
});
