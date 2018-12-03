export function formatName({ first_name: firstName, middle_name: middleName, last_name: lastName, suffix }) {
  function firstCap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  let result = `${firstCap(lastName)},${firstCap(firstName)}`
  if (middleName) {
    result += ` ${firstCap(middleName)}`
  }
  if (suffix) {
    result += `, ${firstCap(suffix)}`
  }
  return result
}

export function selfChecker(navigateTo, keyWords) {
  // check if we hit the current page
  return navigateTo.includes(keyWords)
}

export function removeDuplicateBreadCrumb(elements) {
  if (elements.length > 1) {
    if (elements[0].props.children === elements[1]) {
      // check if user permission dashboard same as current route, if so delete the plain text
      elements.splice(0, 1)
    } else if (typeof elements[1] !== 'string' && elements[0].props.children === elements[1].props.children) {
      // check 'string' for current page case, if not, then check if there were duplicate
      elements.shift()
    }
  }
  return elements
}
