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
