export function clone(object) {
  return JSON.parse(JSON.stringify(object))
}

export function stringify(value) {
  if (typeof value !== 'undefined') {
    return value === null ? '' : String(value)
  } else {
    return ''
  }
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
  )
}

// Firefox browser behaves in a different way than other browsers with input fields type change
// and prints iframe, so we are detecting if user is in Firefox with this workaround
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
export const isFirefox = typeof InstallTrigger !== 'undefined'

// Safari browser calculates the length of textarea input in a different way than other browsers,
// so we are detecting if user is in Safari with this workaround
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
/* eslint-disable no-undef */
export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (!window.safari || (typeof safari !== 'undefined' && safari.pushNotification)).toString() ===
    '[object SafariRemoteNotification]'
/* eslint-enable no-undef */

/* eslint-disable spaced-comment */
export const isIE = /*@cc_on!@*/ false || Boolean(document.documentMode)
/* eslint-enable spaced-comment */
