/**
 * Trims the input string safely, returns empty string on null/undefined input
 * @param str {string}
 * @returns {string}
 */
export function trimSafely(str) {
  return str ? str.trim() : '';
}
