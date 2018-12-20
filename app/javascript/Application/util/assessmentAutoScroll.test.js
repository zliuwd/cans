import { completeAutoScroll } from './assessmentAutoScroll'
import * as Sscroll from './invokeSmoothScroll'
jest.useFakeTimers()

jest.mock('./invokeSmoothScroll')

describe('assessmentAutoScroll', () => {
  global.scrollTo = jest.fn()
  const target = 500
  global.pageYOffset = 3000
  global.innerHeight = 947
  jest.spyOn(Sscroll, 'smoothScroll').mockReturnValue(null)

  it('completeAutoScroll', () => {
    const tuner = 5
    // times: Math.ceil(3000/947) = 4
    const totalMovingTimes = 4

    completeAutoScroll(target, tuner)
    jest.runAllTimers()
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(global.scrollTo).toHaveBeenCalledTimes(totalMovingTimes)
  })
})
