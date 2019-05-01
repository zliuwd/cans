export const ageRange = Object.freeze({
  UNDERSIX: 'underSix',
  ABOVESIX: 'aboveSix',
})

export const analyzeData = data => {
  return data && (data.aboveSix || data.underSix)
    ? { currentDataKey: determineDataKey(data), showSwitch: isBothUnderAndAboveSixDataValid(data) }
    : { currentDataKey: '', showSwitch: false }
}

export const determineDataKey = comparisonData => {
  if (!comparisonData) return undefined
  let key
  if (isBothUnderAndAboveSixDataValid(comparisonData)) {
    key = determineDataKeyByEventDate(comparisonData)
  } else if (isValidComparisonData(comparisonData.underSix)) {
    key = ageRange.UNDERSIX
  } else if (isValidComparisonData(comparisonData.aboveSix)) {
    key = ageRange.ABOVESIX
  }
  return key
}

const isBothUnderAndAboveSixDataValid = data => {
  return isValidComparisonData(data.underSix) && isValidComparisonData(data.aboveSix)
}

const determineDataKeyByAssessmentId = (underSixMaxDate, aboveSixMaxDate) => {
  return underSixMaxDate.assessment_id > aboveSixMaxDate.assessment_id ? ageRange.UNDERSIX : ageRange.ABOVESIX
}

const determineDataKeyByEventDate = comparisonData => {
  const { underSix, aboveSix } = comparisonData
  const underSixMaxDate = underSix.event_dates[maxDateIndex(underSix)]
  const aboveSixMaxDate = aboveSix.event_dates[maxDateIndex(aboveSix)]
  const uDate = new Date(underSixMaxDate.event_date)
  const aDate = new Date(aboveSixMaxDate.event_date)
  return aDate.getTime() > uDate.getTime()
    ? ageRange.ABOVESIX
    : uDate.getTime() === aDate.getTime()
      ? determineDataKeyByAssessmentId(underSixMaxDate, aboveSixMaxDate)
      : ageRange.UNDERSIX
}

const maxDateIndex = input => {
  let maxDate = new Date('1900-01-01')
  let index = 0
  const eventDates = input.event_dates
  for (let i = 0; i < eventDates.length; i++) {
    const eventDate = new Date(eventDates[i].event_date)
    if (eventDate.getTime() > maxDate.getTime()) {
      maxDate = eventDate
      index = i
    } else if (eventDate.getTime() === maxDate.getTime()) {
      index = eventDates[i].assessment_id > eventDates[index].assessment_id ? i : index
    }
  }
  return index
}

const isValidComparisonData = comparisonData => {
  return comparisonData && comparisonData.event_dates && comparisonData.event_dates.length > 0
}
