import { completeAutoScroll, itemRatingOptionsAmount, expandingThenScroll } from './assessmentAutoScroll'
import * as Sscroll from './invokeSmoothScroll'
jest.useFakeTimers()

jest.mock('./invokeSmoothScroll')

describe('autoScroll', () => {
  global.scrollTo = jest.fn()
  afterEach(() => {
    global.scrollTo.mockReset()
  })

  describe('completeAutoScroll', () => {
    const target = 500
    global.pageYOffset = 3000
    global.innerHeight = 947
    jest.spyOn(Sscroll, 'smoothScroll').mockReturnValue(null)

    it('window.scrollTo will be invoked multiple times based on page content size', () => {
      const tuner = 5
      // times: Math.ceil(3000/947) = 4
      const totalMovingTimes = 4

      completeAutoScroll(target, tuner)
      jest.runAllTimers()
      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(global.scrollTo).toHaveBeenCalledTimes(totalMovingTimes)
    })
  })

  describe('expandingThenScroll', () => {
    jest.spyOn(Sscroll, 'smoothScroll').mockReturnValue(null)
    const testEvent = {
      target: {
        getBoundingClientRect: () => {
          return { top: 100 }
        },
      },
    }
    const amountOfChildren = 10
    it('window.scrollTo will be invoked when isExpanded is false', () => {
      const isExpanded = false
      expandingThenScroll(testEvent, isExpanded, amountOfChildren)
      jest.runAllTimers()
      expect(global.scrollTo).toHaveBeenCalledTimes(1)
    })

    it('window.scrollTo will not be invoked when isExpanded is true', () => {
      const isExpanded = true
      expandingThenScroll(testEvent, isExpanded, amountOfChildren)
      jest.runAllTimers()
      expect(global.scrollTo).toHaveBeenCalledTimes(0)
    })
  })
})

describe('itemRatingOptionsAmount', () => {
  it('will return 4 when rating type is regular', () => {
    const testRatingType = 'REGULAR'
    const expectResult = 4
    const actual = itemRatingOptionsAmount(testRatingType)
    expect(actual).toEqual(expectResult)
  })

  it('will return 2 when rating type is boolean', () => {
    const testRatingType = 'BOOL'
    const expectResult = 2
    const actual = itemRatingOptionsAmount(testRatingType)
    expect(actual).toEqual(expectResult)
  })
})
