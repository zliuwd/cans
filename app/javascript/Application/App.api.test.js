import appApi from './App.api';

describe('ApiService', () => {
  it('has a timeout of 15000 seconds', () => {
    expect(appApi.defaults.timeout).toBe(15000);
  });

  it('has a baseUrl of /api/', () => {
    expect(appApi.defaults.baseURL).toBe('/api');
  });
});