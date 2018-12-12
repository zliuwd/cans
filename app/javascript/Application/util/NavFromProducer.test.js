import { navigation } from './constants'
import NavFromProducer from './NavFromProducer'

describe('NavFromProducer', () => {
  it('will return navigation.CHILD_PROFILE if navigateTo was not provided', () => {
    expect(NavFromProducer(undefined)).toEqual(navigation.CHILD_PROFILE)
  })

  it('will return navigateTo if navigateTo was provided', () => {
    const navigateTo = navigation.STAFF_LIST
    expect(NavFromProducer(navigateTo)).toEqual(navigation.STAFF_LIST)
  })
})
