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

/**
 * Removes a trailing slash from a string if it exists
 * Returns an empty string for an empty input
 *
 * @param url
 */
export function removeTrailingSlash(url) {
  if (!url) {
    return ''
  }
  const lastCharIndex = url.length - 1
  return url[lastCharIndex] !== '/' ? url : url.substring(0, lastCharIndex)
}

/**
 * Removes a leading slash from a string if it exists
 * Returns an empty string for an empty input
 *
 * @param url
 */
export function removeLeadingSlash(url) {
  if (!url) {
    return ''
  }
  return url[0] === '/' ? url.substring(1, url.length) : url
}

export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return phoneNumber
  const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    const [, npa, nxx, xxxx] = match
    return `${npa}-${nxx}-${xxxx}`
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

export function formatUserName(staffPerson) {
  const firstName = trimSafely(staffPerson.first_name)
  const lastName = trimSafely(staffPerson.last_name)
  return `${firstName} ${lastName}`
}
