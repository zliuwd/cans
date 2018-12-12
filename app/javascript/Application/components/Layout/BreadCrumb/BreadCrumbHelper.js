import { navigation } from '../../../util/constants'
export function formatName({ first_name: firstName, middle_name: middleName, last_name: lastName, suffix }) {
  function firstCap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  let result = `${firstCap(lastName)}, ${firstCap(firstName)}`
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
  const newElements = [...elements]
  if (elements.length > 1) {
    if (elements[0].props.children === elements[1]) {
      // check if user permission dashboard same as current route, if so delete the active breadcrumb
      newElements.splice(0, 1)
    } else if (typeof elements[1] !== 'string' && elements[0].props.children === elements[1].props.children) {
      // check 'string' for current page case, if not, then check if there were duplicate
      newElements.shift()
    }
  }
  return newElements
}

export const crumbsGroup = Object.freeze({
  staffProfile: [navigation.STAFF_LIST, navigation.STAFF_CHILD_PROFILE, navigation.STAFF_ASSESSMENT_EDIT],
  clientList: [
    navigation.CHILD_LIST,
    navigation.ASSESSMENT_ADD,
    navigation.ASSESSMENT_EDIT,
    navigation.CHILD_PROFILE,
    navigation.CHILD_PROFILE_ADD,
    navigation.CHILD_PROFILE_EDIT,
    navigation.ASSESSMENT_CHANGELOG,
  ],
  clientProfile: [
    navigation.STAFF_CHILD_PROFILE,
    navigation.CHILD_PROFILE,
    navigation.CHILD_PROFILE_EDIT,
    navigation.ASSESSMENT_ADD,
    navigation.ASSESSMENT_EDIT,
    navigation.SEARCH_ASSESSMENT_EDIT,
    navigation.SEARCH_CHILD_PROFILE,
    navigation.ASSESSMENT_CHANGELOG,
  ],
  assessmentForm: [
    navigation.ASSESSMENT_ADD,
    navigation.ASSESSMENT_EDIT,
    navigation.SEARCH_ASSESSMENT_EDIT,
    navigation.ASSESSMENT_CHANGELOG,
  ],
  search: [navigation.CLIENT_SEARCH, navigation.SEARCH_ASSESSMENT_EDIT, navigation.SEARCH_CHILD_PROFILE],
  changelog: [navigation.ASSESSMENT_CHANGELOG],
})

export const selfCheckerKeyWords = Object.freeze({
  STAFF_LIST: 'STAFF_LIST',
  STAFF_READ: 'STAFF_READ',
  CHILD_LIST: 'CHILD_LIST',
  PROFILE_OVERALL: 'PROFILE_OVERALL',
  ASSESSMENT_EDIT: 'ASSESSMENT_EDIT',
  ASSESSMENT_ADD: 'ASSESSMENT_ADD',
  CLIENT_SEARCH: 'CLIENT_SEARCH',
})
