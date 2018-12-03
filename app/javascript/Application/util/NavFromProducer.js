import { navigation } from './constants'
const NavFromProducer = navigateTo => {
  let result
  switch (navigateTo) {
    case navigation.STAFF_CHILD_PROFILE:
      result = navigation.STAFF_CHILD_PROFILE
      break
    case navigation.CLIENT_SEARCH:
      result = navigation.CLIENT_SEARCH
      break
    case navigation.SEARCH_CHILD_PROFILE:
      result = navigation.SEARCH_CHILD_PROFILE
      break
    default:
      result = navigation.CHILD_PROFILE
  }
  return result
}

export default NavFromProducer
