import moment from 'moment';
import { ISO_DATE_FORMAT, LOCAL_DATE_FORMAT } from './constants';

/**
 * Returns a formatted local datetime
 * @param {string} datetime ISO8601 datetime
 * @returns {string}
 */
export function isoToLocalDate(datetime) {
  if (datetime === null) {
    return datetime;
  }
  return moment(datetime, ISO_DATE_FORMAT).format(LOCAL_DATE_FORMAT);
}

/**
 * Transforms JS Date object to ISO formatted date staring
 * @param {Date} Javascript Date object
 * @returns {string} ISO formatted 'YYYY-MM-DD' date string
 */
export function jsDateToIso(value) {
  if (value === null) {
    return value;
  }
  return moment(value).format(ISO_DATE_FORMAT);
}

/**
 * Transforms ISO formatted date staring to JS Date object
 * @param {string} ISO formatted 'YYYY-MM-DD' date string
 * @returns {Date} Javascript Date object
 */
export function isoToJsDate(value) {
  if (value === null) {
    return value;
  }
  if (isValidIsoDate(value)) {
    return moment(value, ISO_DATE_FORMAT).toDate();
  }
  return null;
}

/**
 * Validates whether input string is a valid ISO formatted date
 * @param {string} Any string
 * @returns {boolean} True if input string is a valid ISO formatted date
 */
export function isValidIsoDate(value) {
  return moment(value, ISO_DATE_FORMAT).isValid();
}

/**
 * Returns current date as ISO formatted date
 * @returns {string} ISO formatted current date
 */
export function getCurrentIsoDate() {
  return moment().format(ISO_DATE_FORMAT);
}
