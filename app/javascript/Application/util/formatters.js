import { DateTime } from 'luxon';

/**
 * Trims the input string safely, returns empty string on null/undefined input
 * @param str {string}
 * @returns {string}
 */
export function trimSafely(str) {
  return str ? str.trim() : '';
}

/**
 * Returns a formatted datetime
 * @param {string} datetime ISO8601 datetime
 * @returns {string}
 */
export function toDateFormat(datetime) {
  return DateTime.fromISO(datetime).toFormat('M/d/yyyy');
}

/**
 * Adds a trailing slash to a string if there is no trailing slash.
 * Returns slash for an empty or undefined strings
 *
 * @param url
 */
export function addTrailingSlash(url) {
  if (!url) {
    return '/';
  }
  return url[url.length - 1] === '/' ? url : url + '/';
}
