import { smoothScroll } from './invokeSmoothScroll'

const STEP_MS = 50

export const completeAutoScroll = (target, tuner) => {
  const stickyComponentsHeight = 125
  smoothScroll()
  // <<<<<< The whole logic is designed for calibrating and slowing down the window scroll process >>>>>>
  // target is the assessmentHeader Bottom, it is equal to the top of summary
  // tuner is postion fine tuning for best effect
  if (target) {
    let windowOffset = window.pageYOffset
    const viewPortHeight = window.innerHeight
    // here to adjust the sticky components total height according to current UI
    const finalTarget = target - stickyComponentsHeight + tuner
    // finalTarget is finally where we want to scroll to
    const distance = windowOffset - finalTarget
    // total distance need scroll up
    let times = Math.ceil(windowOffset / viewPortHeight)
    // times means how many times we need repeat the scrollTo for the whole process
    const step = distance / times
    // step can be a negative number，negative means move up

    const stepMoving = () => {
      if (times < 1) {
        clearInterval(repeat)
      } else {
        windowOffset -= step
        times -= 1
        window.scrollTo({
          left: 0,
          top: windowOffset,
          behavior: 'smooth',
        })
      }
    }

    const repeat = setInterval(stepMoving, STEP_MS)

    // just use setInterval to individually fire the scrollTo so just need a minor delay like '1'
  }
}

export const itemRatingOptionsAmount = ratingType => {
  const regularRatingOptionAmount = 4
  return ratingType === 'REGULAR' ? regularRatingOptionAmount : 2
}

export const expandingThenScroll = (event, isExpanded, amountOfChildren, disabled) => {
  const heightWithWarning = 160
  const heightWithoutWarning = 122
  const stickyComponentsHeight = disabled ? heightWithWarning : heightWithoutWarning
  smoothScroll()
  const averageExpandingTime = 45
  // Ideal time for expanding each domain or item
  const idealTotalExpandingTime = 350
  const totalExpandingTime = averageExpandingTime * amountOfChildren
  const finalExpandingTime = totalExpandingTime > idealTotalExpandingTime ? totalExpandingTime : idealTotalExpandingTime
  const targetInfo = event.target.getBoundingClientRect()
  const windowOffset = window.pageYOffset
  const tuner = 15
  const finalTarget = windowOffset + targetInfo.top - stickyComponentsHeight - tuner
  if (!isExpanded) {
    setTimeout(() => {
      window.scrollTo({ left: 0, top: finalTarget, behavior: 'smooth' })
    }, finalExpandingTime)
  }
}
