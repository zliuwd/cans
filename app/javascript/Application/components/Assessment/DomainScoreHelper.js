import { shouldItemBeRendered } from './AssessmentHelper'
export const itemFilter = (items, isAssessmentUnderSix) => {
  return items.filter(item => shouldItemBeRendered(isAssessmentUnderSix, item))
}

export function totalScoreCalculation(items) {
  let noneTouched = 0
  let result = 0
  const topRating = 3
  const noneRating = -1
  items.forEach(item => {
    let rating = item.rating
    if (rating === noneRating) {
      noneTouched++
      rating = 0
    } else if (rating > topRating) {
      rating = 0
    }
    result += rating
  })
  return noneTouched === items.length ? '-' : result
}
