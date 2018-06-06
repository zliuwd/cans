import { trimSafely } from './formatters';

describe('formatters', () => {
  describe('#trimSafely()', () => {
    it('returns original string if null', () => {
      expect(trimSafely('hello')).toEqual('hello');
    });

    it('returns empty string if null input', () => {
      expect(trimSafely(null)).toEqual('');
    });

    it('returns empty string if undefined input', () => {
      expect(trimSafely(undefined)).toEqual('');
    });

    it('returns empty string if empty string input', () => {
      expect(trimSafely('')).toEqual('');
    });
  });
});
