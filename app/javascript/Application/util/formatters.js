/**
 * Trims the input string safely, returns empty string on null/undefined input
 * @param str {string}
 * @returns {string}
 */
export function trimSafely(str) {
  return str ? str.trim() : ''
}

/**
 * Adds a trailing slash to a string if there is no trailing slash.
 * Returns slash for an empty or undefined strings
 *
 * @param url
 */
export function addTrailingSlash(url) {
  if (!url) {
    return '/'
  }
  return url[url.length - 1] === '/' ? url : `${url}/`
}

export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return phoneNumber
  const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return phoneNumber
}

export function formatPhoneWithExtCode(phoneNumber, extCode) {
  if (!phoneNumber) return ''
  if (extCode) {
    return `${formatPhoneNumber(phoneNumber)} ext. ${extCode}`
  } else {
    return formatPhoneNumber(phoneNumber)
  }
}
