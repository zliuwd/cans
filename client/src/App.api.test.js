const ApiService = require('./App.api').default;

describe('ApiService', () => {
  it('has a timeout of 15000 seconds', () => {
    expect(ApiService.defaults.timeout).toBe(15000);
  });

  it('has a baseUrl of /api/', () => {
    expect(ApiService.defaults.baseURL).toBe('/api');
  });
});
