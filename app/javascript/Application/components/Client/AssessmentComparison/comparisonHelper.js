import ComparisonOuterTableExpander from './ComparisonOuterTableExpander'
import { getI18nByCode } from '../../common/I18nHelper'
import { domainCodes } from '../../Assessment/AssessmentSummary/DomainHelper'

export const CP_TABLE_COL_WIDTHS = Object.freeze({
  DOMAIN_NAME: 350,
  EXPANDER: 50,
  ITEM_NAME: 350,
})

export const getTitle = (i18n, code) => {
  if (i18n) {
    return getI18nByCode(i18n, code)._title_
  }
  return null
}

export const expander = {
  id: 'expander',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
  expander: true,
  Expander: ComparisonOuterTableExpander,
  className: 'outer-expander',
  headerClassName: 'text-center',
}

export const expanderPlaceHolder = {
  id: 'expander-place-holder',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
}

export const requiredDomainColumnsAmount = 5

export const blankColFiller = (targetCols, keyWords, amount) => {
  const blankColumn = { id: `${keyWords}-blank-column`, header: null, sortable: false }
  const checker = amount - targetCols.length
  if (checker > 0) [...Array(checker)].map(() => targetCols.push(blankColumn))
}

const dashes = '--'

const handleCaregiverDomainTitle = domain => {
  let caregiverDomainTitle
  if (domain.caregiver_name) {
    caregiverDomainTitle = `Caregiver Domain-${domain.caregiver_index}-${domain.caregiver_name}`
  } else {
    caregiverDomainTitle = `Caregiver Domain-${domain.caregiver_index}`
  }
  return caregiverDomainTitle
}

export const domainTitleSwitcher = (domain, domainTitle) => {
  if (domain.is_caregiver_domain) {
    return handleCaregiverDomainTitle(domain)
  }
  let result
  switch (domain.code) {
    case domainCodes.PTACE_DOMAIN:
      result = 'PTACE'
      break
    case domainCodes.STRENGTH_DOMAIN_ABOVE_SIX:
      result = `${domainTitle} ( 6 to 21 )`
      break
    case domainCodes.STRENGTH_DOMAIN_UNDER_SIX:
      result = `${domainTitle} ( 0 to 5 )`
      break
    default:
      result = domainTitle
  }
  return result
}

const domainBoolRatingGenerator = ratingTotal => {
  const hasYesRating = `${ratingTotal}-Y`
  const noYesRating = `0-Y`
  return ratingTotal > 0 ? hasYesRating : noYesRating
}

export const domainRatingSwitcher = (ratingTotal, type) => {
  if (ratingTotal === undefined) {
    return dashes
  } else if (type === 'BOOLEAN') {
    return domainBoolRatingGenerator(ratingTotal)
  } else {
    return ratingTotal
  }
}

const itemRatingGenerator = (itemRatings, index) => {
  const itemTrend = itemRatings[index].trend !== undefined ? itemRatings[index].trend : ''
  const itemSymbolGenerator = itemTrend === 'UP' ? '↑' : '' || itemTrend === 'DOWN' ? '↓' : ''
  let rating = ''
  if (itemRatings[index] && itemRatings[index].value !== undefined) {
    rating = `${itemRatings[index].value} ${itemSymbolGenerator}`
  } else {
    rating = dashes
  }
  return rating
}

const itemBoolRatingGenerator = value => {
  let boolRating
  switch (value) {
    case 0:
      boolRating = 'No'
      break
    case 1:
      boolRating = 'Yes'
      break
    default:
      boolRating = dashes
  }
  return boolRating
}

export const itemRatingSwitcher = (itemRatings, index, type) => {
  const result = itemRatingGenerator(itemRatings, index)
  if (type === 'BOOLEAN') {
    return itemBoolRatingGenerator(result)
  }
  return result
}
