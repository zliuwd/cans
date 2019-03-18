import { isoToLocalDate } from '../../../../util/dateHelper'
import { getI18nByCode } from '../../../common/I18nHelper'

export const graphColors = ['#7bb5ea', '#414146', '#93ed86', '#f7a564', '#808080']

const dateInfoGenerator = originalDates => {
  return originalDates.reduce((result, date) => {
    const id = date.assessment_id
    const dateKey = isoToLocalDate(date.event_date)
    const keys = [dateKey, dateKey]
    // keys[0] is startKey, keys[1] is fixedKey, write like this for passing code climate checking
    repeatChecker(result, keys, id)
    return result
  }, {})
}

const repeatChecker = (base, keys, id, counter) => {
  counter = counter || 0
  if (base[keys[0]]) {
    counter++
    keys[0] = `${keys[1]}(${counter})`
    return repeatChecker(base, keys, id, counter)
  } else {
    base[keys[0]] = id
    return base
  }
}

const idToDateText = (originalDates, id) => {
  const dateInfo = dateInfoGenerator(originalDates)
  return Object.keys(dateInfo).find(key => dateInfo[key] === id)
}

const domainRatingFiller = (target, originalDates, domain) => {
  domain.domain_ratings.forEach(rating => {
    const assessmentDate = idToDateText(originalDates, rating.assessment_id)
    const value = rating.value === undefined ? 0 : rating.value
    target[assessmentDate] = value
  })
}

const getShortTitle = (i18n, code) => {
  return i18n ? getI18nByCode(i18n, code)._short_title_ : null
}

export const datesGenerator = originalDates => {
  return !originalDates ? [] : Object.keys(dateInfoGenerator(originalDates))
}

export const domainBarsDataGenerator = (originalDates, domains, i18n) => {
  if (!originalDates || !domains) {
    return []
  }
  return domains.reduce((result, domain) => {
    const domainBars = { name: getShortTitle(i18n, domain.code) }
    domainRatingFiller(domainBars, originalDates, domain)
    result.push(domainBars)
    return result
  }, [])
}
