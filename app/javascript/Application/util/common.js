export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function stringify(value) {
  return value ? '' + value : '';
}

/**
 * Check whether input parametr is empty. Analog of Lodash _.isEmpty()
 * @param {Object} Any object
 * @returns {boolean} True if object is empty
 */
export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}
