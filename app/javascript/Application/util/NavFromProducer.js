import { navigation } from './constants'
const NavFromProducer = navigateTo => {
  let result
  if (navigateTo) {
    result = navigateTo
  } else {
    result = navigation.CHILD_PROFILE
  }
  return result
}

export default NavFromProducer
